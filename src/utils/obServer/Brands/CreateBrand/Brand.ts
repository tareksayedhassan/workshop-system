import Brand from "../EventEmitter ";
import prisma from "@/src/utils/db";

Brand.on("BrandCreated", async (payload) => {
  const { name, models, Brand_logo, note, addedById, FileName } = payload;

  try {
    const res = await prisma.cars_brand.create({
      data: {
        cate_name: name,
        models: models,
        Brand_logo: FileName ? FileName : null,
        note: note,
        addedById: addedById,
      },
    });
  } catch (error) {
    throw error;
  }
});
