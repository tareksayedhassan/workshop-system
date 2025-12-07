import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
export async function GET(req: NextRequest) {
  try {
    const getNoitafactions = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!getNoitafactions) throw new Error("Noitfaction Not Found");
    return NextResponse.json({ getNoitafactions }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
