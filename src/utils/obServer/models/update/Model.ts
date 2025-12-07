import Models from "../EventEmitter ";
import prisma from "@/src/utils/db";
Models.on("ModelUpdated", async (payload) => {
  try {
    const { ModelId, modelName, engineCC, carId, userId } = payload;

    await prisma.cars_Models.update({
      where: { id: ModelId },
      data: {
        modelName,
        engineCC,
        carId,
        userId,
      },
    });
  } catch (error) {
    throw error;
  }
});
