interface Items {
  modelName: string;
  engineCC: string;
  carId: number;
  userId: number;
}
export async function CreatemodelVaildate(payload: Items) {
  try {
    const { modelName, engineCC, carId, userId } = payload;

    if (!modelName) {
      throw new Error("Model Name Is Missing");
    }
    if (!engineCC) {
      throw new Error("Engine CC Is Missing");
    }
    if (!carId) {
      throw new Error("Car Id Is Missing");
    }
    if (!userId) {
      throw new Error("User Id Is Missing");
    }
  } catch (error) {
    throw error;
  }
}
