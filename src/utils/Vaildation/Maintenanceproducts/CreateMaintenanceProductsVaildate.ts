interface Items {
  carId: number;
  userId: number;
  Products: {
    Quantity: number;
    ProductId: number;
    price: number;
  }[];
  MaintenanceTableId: number;
  ModeleId: number;
}
export async function CreateMaintenanceProductsVaildate(payload: Items) {
  try {
    const { carId, userId, Products, MaintenanceTableId, ModeleId } = payload;

    if (!carId) {
      throw new Error("Please select a car before proceeding");
    }
    if (!userId) {
      throw new Error("User ID is missing, please make sure you are logged in");
    }
    if (!Products) {
      throw new Error("No products added yet, please add some");
    }
    if (!MaintenanceTableId) {
      throw new Error("Maintenance table ID is missing, please try again");
    }
    if (!ModeleId) {
      throw new Error("Please select a model for the car");
    }
  } catch (error) {
    throw error;
  }
}
