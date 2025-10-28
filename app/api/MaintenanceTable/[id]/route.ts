import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const maintenanceTableId = Number(id);
    if (!maintenanceTableId) {
      throw new Error("maintenanceTable Id Is Missing");
    }
    const getmaintenanceTable = await prisma.maintenanceTable.findUnique({
      where: {
        id: maintenanceTableId,
      },
    });
    return NextResponse.json({ data: getmaintenanceTable }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const maintenanceTableId = Number(id);
    const body = await req.json();
    const { productId } = body;

    if (!maintenanceTableId) {
      throw new Error("maintenanceTable Id Is Missing");
    }

    await prisma.maintenanceTable.update({
      where: {
        id: maintenanceTableId,
      },
      data: {
        productId: productId,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
