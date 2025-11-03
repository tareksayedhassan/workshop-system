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

    const getmaintenanceTable = await prisma.maintenanceProducts.findMany({
      where: {
        id: maintenanceTableId,
      },
      include: {
        Products: true,
      },
    });
    return NextResponse.json({ data: getmaintenanceTable }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const maintenanceProductId = Number(id);
    if (!maintenanceProductId) {
      throw new Error("maintenanceProduct Id Is Missing");
    }

    await prisma.maintenanceProducts.delete({
      where: {
        id: maintenanceProductId,
      },
      include: {
        Products: true,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const maintenanceProductId = Number(id);
    const body = await req.json();

    const { Quantity } = body;
    if (!maintenanceProductId) {
      throw new Error("Please make sure to select a model");
    }
    await prisma.maintenanceProducts.update({
      where: {
        id: maintenanceProductId,
      },
      data: {
        Quantity: Quantity,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
