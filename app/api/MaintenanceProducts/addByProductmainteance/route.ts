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

    console.log(price);
    const calc = Quantity * (price || 0);
    const Tax = calc * 0.14;
    await prisma.maintenanceProducts.create({
      data: {
        Quantity: Quantity,
        user: { connect: { id: userId } },
        Car: { connect: { id: carId } },
        Products: { connect: { id: ProductId } },
        tax: Tax,
        Modele: { connect: { id: ModeleId } },
        Maintenance: { connect: { id: MaintenanceTableIds } },
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
