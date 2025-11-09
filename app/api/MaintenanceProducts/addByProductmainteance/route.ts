import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      ModeleId,
      userId,
      carId,
      MaintenanceTableIds,
      ProductId,
      Quantity,
      price,
    } = body;
    await Promise.all(
      MaintenanceTableIds.map(async (id: number) => {
        const calc = Quantity * (price || 0);
        const tax = calc * 0.14;

        await prisma.maintenanceTable.update({
          where: { id },
          data: {
            MaintenanceProducts: {
              create: {
                ModeleId,
                userId,
                carId,
                ProductId,
                Quantity,
                tax,
              },
            },
          },
        });
      })
    );

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
