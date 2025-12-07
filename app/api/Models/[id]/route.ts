export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
import Models from "@/src/utils/obServer/models/EventEmitter ";

import "@/src/utils/obServer/models/update/Model";
import "@/src/utils/obServer/models/update/notifaction";
import "@/src/utils/obServer/models/Delete/Model";
import "@/src/utils/obServer/models/Delete/notifaction";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ModelId = Number(id);
    if (!ModelId) {
      throw new Error("Model Id Is Missing");
    }
    const getModel = await prisma.cars_Models.findUnique({
      where: {
        id: ModelId,
      },
    });
    return NextResponse.json({ data: getModel }, { status: 200 });
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
    const ModelId = Number(id);
    const body = await req.json();
    const { userId } = body;
    Models.emit("ModelsDeleted", { ModelId, userId });
    return NextResponse.json({ message: "Success" }, { status: 200 });
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
    const ModelId = Number(id);
    const body = await req.json();

    const { modelName, engineCC, carId, userId } = body;
    if (!ModelId) {
      throw new Error("Please make sure to select a model");
    }
    Models.emit("ModelUpdated", {
      ModelId,
      modelName,
      engineCC,
      carId,
      userId,
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
