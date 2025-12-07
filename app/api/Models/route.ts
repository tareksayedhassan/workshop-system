export const dynamic = "force-dynamic";

import Models from "@/src/utils/obServer/models/EventEmitter ";
import { CreatemodelVaildate } from "@/src/utils/Vaildation/Models/CreatemodelVaildate";
import { NextRequest, NextResponse } from "next/server";
import "@/src/utils/obServer/models/Create/CreateModel";
import "@/src/utils/obServer/models/Create/notifaction";
import "@/src/utils/obServer/models/Create/maintenanceTable";
import prisma from "@/src/utils/db";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const BrandId = parseInt(searchParams.get("brandId") || "0");

    const models = await prisma.cars_Models.findMany({
      where: {
        carId: BrandId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ data: models }, { status: 200 });
  } catch (error) {}
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { modelName, engineCC, carId, userId } = body;

    await CreatemodelVaildate({ modelName, engineCC, carId, userId });

    Models.emit("ModelsRun", {
      modelName,
      engineCC,
      carId,
      userId,
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
