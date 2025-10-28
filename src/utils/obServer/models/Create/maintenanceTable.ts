import Models from "../EventEmitter ";
import prisma from "@/src/utils/db";
Models.on("ModelCreated", async (payload) => {
  try {
    const { ModelId } = payload;
    for (let i = 1; i <= 12; i++) {
      await prisma.maintenanceTable.create({
        data: {
          name: ` k.m ${i}0,000`,
          modelId: ModelId,
        },
      });
    }
  } catch (error) {
    throw error;
  }
});
