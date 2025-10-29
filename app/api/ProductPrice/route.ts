import prisma from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const getProducts = await prisma.productPrice.findMany({
      where: {},
    });
    return NextResponse.json({ data: getProducts }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
