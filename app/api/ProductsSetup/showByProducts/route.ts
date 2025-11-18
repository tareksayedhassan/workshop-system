import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const Status = searchParams.get("Status") || "";
    const BrandId = searchParams.get("BrandId") || "";
    const searchQuery = searchParams.get("searchQuery") || "";
    console.log("BrandId", BrandId);
    let filters: any = {};

    if (searchQuery.trim() !== "") {
      filters.OR = [
        {
          productCode: {
            search: searchQuery,
          },
        },
        {
          name: {
            contains: searchQuery,
          },
        },
      ];
    }

    if (Status) {
      filters.Status = Status;
    }

    const total = await prisma.product.count({ where: filters });

    const getproductSetup = await prisma.product.findMany({
      where: filters,
      ...(searchQuery.trim() === ""
        ? { skip: (page - 1) * pageSize, take: pageSize }
        : {}),

      include: {
        price: {
          where: {
            BrandId: Number(BrandId),
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { productCode: "asc" },
    });

    return NextResponse.json({ data: getproductSetup, total }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
