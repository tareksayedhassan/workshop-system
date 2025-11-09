import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const modelId = Number(id);
    const { searchParams } = new URL(req.url);
    const brandId = Number(searchParams.get("BrandId"));
    if (!modelId) {
      throw new Error("maintenanceTable Id Is Missing");
    }
    const getmaintenanceTable = await prisma.maintenanceTable.findMany({
      where: {
        modelId: modelId,
      },
      include: {
        MaintenanceProducts: {
          include: {
            Products: {
              include: {
                price: { where: { BrandId: brandId } },
              },
            },
          },
        },
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
    const delteTabel = await prisma.maintenanceTable.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ data: delteTabel }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
