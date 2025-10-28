import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const maintenanceTableId = Number(id);

    if (!maintenanceTableId) {
      throw new Error("maintenanceTable Id is missing");
    }

    await prisma.maintenanceTable.update({
      where: { id: maintenanceTableId },
      data: { productId: null },
    });

    return NextResponse.json(
      { message: "Product removed from maintenance record successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
