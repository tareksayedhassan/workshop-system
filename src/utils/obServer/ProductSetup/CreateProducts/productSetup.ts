import ProductSetup from "../EventEmitter ";
import prisma from "@/src/utils/db";
ProductSetup.on("ProductCreated", async (payload) => {
  const { productCode, name, price, Status, userId, Model } = payload;

  try {
    const res = await prisma.product.create({
      data: {
        productCode,
        name,
        Status,
        addedById: userId,
        Model,
        price: {
          create: Object.entries(price).map(([brandId, p]) => ({
            price: Number(p),
            Brands: {
              connect: { id: Number(brandId) },
            },
          })),
        },
      },
    });

    ProductSetup.emit("ProductRun", { res, userId });
  } catch (error) {
    console.error(error);
    throw error;
  }
});
