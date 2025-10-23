import ProductSetup from "../EventEmitter ";
import prisma from "@/src/utils/db";
ProductSetup.on("ProductCreated", async (payload) => {
  const {
    productCode,
    name,
    price_scoda,
    price_odie,
    price_flox,
    price_syeat,
    Status,
    cateId,
    userId,
  } = payload;

  try {
    const res = await prisma.product.create({
      data: {
        productCode,
        name,
        price_scoda,
        price_odie,
        price_flox,
        price_syeat,
        Status,
        cateId,
        addedById: userId,
      },
    });

    ProductSetup.emit("ProductRun", { res, userId });
  } catch (error) {
    throw error;
  }
});
