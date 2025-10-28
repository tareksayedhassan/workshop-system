import Models from "../EventEmitter ";
import prisma from "@/src/utils/db";
Models.on("ModelsRun", async (payload) => {
  try {
    const { modelName, engineCC, carId, userId } = payload;
    const modelId = await prisma.cars_Models.create({
      data: {
        modelName,
        engineCC: Number(engineCC),
        carId,
        userId,
      },
    });
    Models.emit("ModelCreated", { ModelId: modelId.id });
  } catch (error) {
    throw error;
  }
});
