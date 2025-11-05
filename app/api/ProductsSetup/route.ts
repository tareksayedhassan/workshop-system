export const dynamic = "force-dynamic";

import ProductSetup from "@/src/utils/obServer/ProductSetup/EventEmitter ";
import { CreateproductSetupVaildate } from "@/src/utils/Vaildation/ProductSetup/CreateproductSetupVaildate";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
import "@/src/utils/obServer/ProductSetup/CreateProducts/productSetup";
import "@/src/utils/obServer/ProductSetup/CreateProducts/ProductTransaction";
import "@/src/utils/obServer/ProductSetup/CreateProducts/Notifaction";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "15");
    const Status = searchParams.get("Status") || "";
    const Model = searchParams.get("model") || "";
    const searchQuery = searchParams.get("searchQuery") || "";
    console.log(searchQuery);
    let filters: any = {};

    if (searchQuery.trim() !== "") {
      const words = searchQuery.trim().split(/\s+/);

      // خليه يدور على كل كلمة في الاسم أو الكود
      filters.AND = words.map((word) => ({
        OR: [{ name: { contains: word } }, { productCode: { contains: word } }],
      }));
    }

    if (Status) {
      filters.Status = Status;
    }

    if (Model) {
      filters.Model = Model;
    }
    const total = await prisma.product.count({ where: filters });

    const getproductSetup = await prisma.product.findMany({
      where: filters,
      include: {
        price: {
          include: {
            Brands: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ data: getproductSetup, total }, { status: 200 });
  } catch (error) {}
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productCode, name, price, Status, userId, Model } = body;
    await CreateproductSetupVaildate({
      productCode,
      name,
      price,
    });
    ProductSetup.emit("ProductCreated", {
      productCode,
      name,
      price,
      Status,
      userId,
      Model,
    });

    return NextResponse.json({ message: "Product Created" }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
