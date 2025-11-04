import MaintenanceTable from "@/src/utils/obServer/MaintenanceTable/EventEmitter ";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
import { CreateMaintenanceProductsVaildate } from "@/src/utils/Vaildation/Maintenanceproducts/CreateMaintenanceProductsVaildate";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = Number(searchParams.get("BrandId"));
    const MaintenanceTabelId = Number(searchParams.get("MaintenanceTabelId"));
    console.log("from maintaince product", brandId);
    const fetchmaintenanceProducts = await prisma.maintenanceProducts.findMany({
      where: {
        MaintenanceTableId: MaintenanceTabelId,
      },
      include: {
        Products: { include: { price: { where: { BrandId: brandId } } } },
      },
    });
    return NextResponse.json(
      { data: fetchmaintenanceProducts },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { carId, userId, Products, MaintenanceTableId, ModeleId } = body;
    console.log(body);
    await CreateMaintenanceProductsVaildate({
      carId,
      userId,
      Products,
      MaintenanceTableId,
      ModeleId,
    });

    for (const product of Products) {
      const calc = product.Quantity * product.price;
      const Tax = calc * 0.14;
      await prisma.maintenanceProducts.create({
        data: {
          Quantity: product.Quantity,
          carId,
          userId,
          ProductId: product.ProductId,
          tax: Tax,
          MaintenanceTableId,
          ModeleId: ModeleId,
        },
      });
    }
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
