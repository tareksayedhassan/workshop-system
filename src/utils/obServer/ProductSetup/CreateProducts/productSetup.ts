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
    userId,
    Model,
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
        addedById: userId,
        Model,
      },
    });

    ProductSetup.emit("ProductRun", { res, userId });
  } catch (error) {
    throw error;
  }
});
