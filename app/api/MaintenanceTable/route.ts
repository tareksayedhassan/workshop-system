export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
export async function GET(req: NextRequest) {
  try {
    const fetchMaintenanceTable = await prisma.maintenanceTable.findMany({
      include: {
        MaintenanceProducts: true,
      },
    });
    return NextResponse.json({ data: fetchMaintenanceTable }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { modelId, name } = body;

//     await prisma.maintenanceTable.create({
//       data: {
//         name: name,
//         modelId: modelId,
//         userId
//       },
//     });
//     return NextResponse.json({ message: "Success" }, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 400 });
//   }
// }
