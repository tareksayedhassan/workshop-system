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

// export async function POST(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const maintenanceTableId = Number(id);
//     const body = await req.json();
//     const { productId } = body;

//     if (!maintenanceTableId) {
//       throw new Error("maintenanceTable Id Is Missing");
//     }

//     await prisma.maintenanceTable.update({
//       where: {
//         id: maintenanceTableId,
//       },
//       data: {
//         productId: productId,
//       },
//     });
//     return NextResponse.json({ message: "Success" }, { status: 200 });
//   } catch (error: any) {
//     console.log(error);
//     return NextResponse.json({ message: error.message }, { status: 400 });
//   }
// }
