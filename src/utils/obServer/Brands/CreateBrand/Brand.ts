import Brand from "../EventEmitter ";
import prisma from "@/src/utils/db";

Brand.on("BrandCreated", async (payload) => {
  const { cate_name, note, addedById, FileName } = payload;

  try {
    await prisma.cars_brand.create({
      data: {
        cate_name: cate_name,

        Brand_logo: FileName ? FileName : null,
        note: note,
        addedById: Number(addedById),
      },
    });
  } catch (error) {
    throw error;
  }
});
