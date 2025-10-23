import ProductSetup from "../EventEmitter ";
import prisma from "@/src/utils/db";

ProductSetup.on("ProductRun", async (payload) => {
  const { res, userId } = payload;

  try {
    await prisma.productTransaction.create({
      data: {
        proId: res.id,
        userId: userId,
      },
    });
  } catch (error) {
    throw error;
  }
});
