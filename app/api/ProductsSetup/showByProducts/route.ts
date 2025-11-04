import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const Status = searchParams.get("Status") || "";
    const Model = searchParams.get("model") || "";
    const BrandId = searchParams.get("BrandId") || "";
    const searchQuery = searchParams.get("searchQuery") || "";
    let filters: any = {};

    if (searchQuery.trim() !== "") {
      const query = searchQuery.trim().replace(/\s+/g, " ");
      filters.OR = [
        { name: { contains: query } },
        { productCode: { contains: query } },
      ];
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
          where: {
            BrandId: Number(BrandId),
          },
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
