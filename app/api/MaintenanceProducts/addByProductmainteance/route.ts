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
    console.log(MaintenanceTableIds);
    for (const i of MaintenanceTableIds) {
      const calc = Quantity * price;
      const Tax = calc * 0.14;
      await prisma.maintenanceProducts.create({
        data: {
          Quantity: Quantity,
          carId,
          userId,
          ProductId: ProductId,
          tax: Tax,
          MaintenanceTableId: Number(i),
          ModeleId: ModeleId,
        },
      });
    }
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
