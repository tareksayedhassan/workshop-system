export const dynamic = "force-dynamic";

import prisma from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    const body = await req.json();
    const { price } = body;
    console.log(price, id);
    if (!productId) {
      return Response.json(
        { message: "Please make sure to select a product" },
        { status: 400 }
      );
    }
    await prisma.productPrice.update({
      where: { id: productId },
      data: {
        price: Number(price),
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const BrandId = Number(id);

    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("search")?.trim() || "";
    let filter: any = { BrandId: BrandId };

    if (searchQuery !== "") {
      filter = {
        BrandId: BrandId,
        OR: [
          {
            Product: {
              name: {
                contains: searchQuery,
              },
            },
          },
          {
            Product: {
              productCode: searchQuery,
            },
          },
        ],
      };
    }

    const getProducts = await prisma.productPrice.findMany({
      where: filter,
      include: {
        Product: true,
      },
    });

    return NextResponse.json({ data: getProducts }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
