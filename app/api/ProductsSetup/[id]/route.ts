export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = Number(id);
    const body = await req.json();
    const { productName, productCode, Status } = body;
    if (!productId) {
      return Response.json(
        { message: "Please make sure to select a product" },
        { status: 400 }
      );
    }
    console.log(Status);
    await prisma.product.update({
      where: { id: productId },
      data: {
        name: productName,
        productCode: productCode,
        Status: Status,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = Number(id);
    if (!productId) {
      return Response.json(
        { message: "Please make sure to select a product" },
        { status: 400 }
      );
    }
    await prisma.product.delete({
      where: { id: productId },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
