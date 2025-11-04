import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import prisma from "@/src/utils/db";

interface ExcelRow {
  "اسم الصنف"?: string;
  "كود الصنف"?: string;
  أودي?: string | number;
  فولكس?: string | number;
  سكودا?: string | number;
  سيات?: string | number;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "❌ No file uploaded" },
        { status: 400 }
      );
    }

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      return NextResponse.json(
        { error: "❌ Invalid file type" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // تحويل الشيت لـ JSON مع تحديد headers لتجنب __EMPTY
    const data = XLSX.utils.sheet_to_json<ExcelRow>(sheet, {
      header: ["اسم الصنف", "كود الصنف", "أودي", "فولكس", "سكودا", "سيات"],
      range: 1, // الصف الأول فيه العناوين
      defval: "", // يمنع undefined
    });

    const createdProducts = [];

    // الماب بتاع الماركات
    const brandMap: Record<string, number> = {
      أودي: 1,
      فولكس: 2,
      سكودا: 4,
      سيات: 3,
    };

    for (const row of data) {
      console.log(row);

      const name = row["اسم الصنف"]?.toString().trim() || "غير معروف";
      const productCode = row["كود الصنف"]?.toString().trim() || "";

      if (!productCode) {
        console.log("⚠️ Skipping row, no productCode:", row);
        continue; // تجاهل الصف لو مفيش كود صنف
      }

      let product = await prisma.product.findFirst({
        where: { name, productCode },
      });

      if (!product) {
        product = await prisma.product.create({
          data: {
            name,
            productCode,
            Model: "0",
            Status: "all",
          },
        });
        createdProducts.push(product);
      } else {
        console.log(
          `⚠️ Product with code ${productCode} already exists, skipping creation`
        );
      }

      // إضافة الأسعار لكل ماركة
      const pricesToCreate: {
        price: number;
        BrandId: number;
        productId: number;
      }[] = [];

      for (const [brandName, brandId] of Object.entries(brandMap)) {
        const key = brandName as keyof ExcelRow;
        const amount = row[key];
        if (!amount) continue;

        const parsed = parseFloat(amount.toString());
        if (isNaN(parsed)) continue;

        pricesToCreate.push({
          price: parsed,
          BrandId: brandId,
          productId: product.id,
        });
      }

      if (pricesToCreate.length > 0) {
        await prisma.productPrice.createMany({
          data: pricesToCreate,
          skipDuplicates: true, // يمنع تكرار السعر لنفس المنتج والماركة
        });
      }
    }

    return NextResponse.json({
      message: "✅ File processed successfully",
      insertedProducts: createdProducts.length,
    });
  } catch (error: any) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: "Failed to process file", details: error.message },
      { status: 500 }
    );
  }
}
