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
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const searchQuery = searchParams.get("search") || "";
    let filters: any = {};

    if (searchQuery.trim() !== "") {
      const searchNumber = parseInt(searchQuery, 10);
      const date = new Date(searchQuery);
      const isValidDate = !isNaN(date.getTime());
      const BrandId = parseInt(searchParams.get("id") || "0", 10);
      console.log(BrandId);
      if (!isNaN(searchNumber)) {
        filters = {
          OR: [
            { id: searchNumber },
            ...(isValidDate
              ? [
                  {
                    createdAt: {
                      gte: date,
                      lt: new Date(date.setDate(date.getDate() + 1)),
                    },
                  },
                ]
              : []),
          ],
        };
      } else if (isValidDate) {
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        filters = {
          createdAt: {
            gte: date,
            lt: nextDay,
          },
        };
      } else if (searchQuery.trim() !== "") {
        filters = {
          OR: [
            { name: { contains: searchQuery } },
            { productCode: { contains: searchQuery } },
            { Status: { contains: searchQuery } },
          ],
        };
      }
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
    console.log(body);
    await CreateproductSetupVaildate({
      productCode,
      name,
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
