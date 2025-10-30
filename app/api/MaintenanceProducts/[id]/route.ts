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
