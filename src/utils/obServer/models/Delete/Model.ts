import Models from "../EventEmitter ";
import prisma from "@/src/utils/db";
Models.on("ModelsDeleted", async (payload) => {
  try {
    const { ModelId } = payload;

    await prisma.cars_Models.delete({
      where: { id: ModelId },
    });
  } catch (error) {
    throw error;
  }
});
