import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import prisma from "@/src/utils/db";

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
    const data = XLSX.utils.sheet_to_json(sheet, {
      header: ["اسم الصنف", "كود الصنف", "أودي", "فولكس", "سكودا", "سيات"],
      range: 1, // الصف الأول فيه العناوين
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

      const name = row["اسم الصنف"]?.toString().trim();
      const productCode = row["كود الصنف"]?.toString().trim();

      if (!productCode) {
        console.log("⚠️ Skipping row, no productCode:", row);
        continue; // تجاهل الصف لو مفيش productCode
      }

      let product = await prisma.product.findFirst({
        where: {
          name: name,
          productCode: productCode,
        },
      });

      if (!product) {
        // إنشاء المنتج لو مش موجود
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
      const pricesToCreate = Object.entries(brandMap)
        .map(([brandName, brandId]) => {
          const amount = row[brandName];
          if (!amount) return null;
          return {
            price: parseFloat(amount),
            BrandId: brandId,
            productId: product!.id,
          };
        })
        .filter(Boolean);

      if (pricesToCreate.length > 0) {
        await prisma.productPrice.createMany({
          data: pricesToCreate as any,
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
