import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const treasuryId = parseInt(id, 10);
  try {
    await prisma.user.delete({
      where: { id: treasuryId },
    });

    return NextResponse.json(
      { message: "user deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting treasury:", error);
    return NextResponse.json(
      { message: "500 Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const treasuryId = parseInt(id, 10);
  const body = await req.json();
  try {
    const updateData: any = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.role !== undefined) updateData.role = body.role;

    const updatedTreasury = await prisma.user.update({
      where: { id: treasuryId },
      data: updateData,
    });

    return NextResponse.json({ data: updatedTreasury }, { status: 200 });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
