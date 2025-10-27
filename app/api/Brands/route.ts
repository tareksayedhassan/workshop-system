import Brand from "@/src/utils/obServer/Brands/EventEmitter ";
import { createBrandVaildate } from "@/src/utils/Vaildation/Brands/createBrandVaildate";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import prisma from "@/src/utils/db";
import "@/src/utils/obServer/Brands/CreateBrand/Brand";
import "@/src/utils/obServer/Brands/CreateBrand/Notifaction";

export async function GET(req: NextRequest) {
  try {
    const getBrands = await prisma.cars_brand.findMany();
    return NextResponse.json({ data: getBrands }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("cate_name") as string;
  const models = formData.get("models");
  const note = formData.get("note") as number | null;
  const addedById = formData.get("addedById");
  const file = formData.get("Brand_logo") as File | null;
  console.log({ name, models, note, addedById, file });
  let FileName = "";
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const uniqueName = `${Date.now()}-${file.name}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    await fs.writeFile(path.join(uploadDir, uniqueName), buffer);

    FileName = uniqueName;
  }
  try {
    await createBrandVaildate({
      addedById: Number(addedById),
      name,
    });
    Brand.emit("BrandCreated", {
      cate_name: name,
      models,
      FileName,
      note,
      addedById,
    });

    return NextResponse.json({ message: "Brand Created" }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
