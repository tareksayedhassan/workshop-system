import prisma from "@/src/utils/db";
type Items = {
  productCode: string;
  name: string;
  price: any;
};
export async function CreateproductSetupVaildate(payload: Items) {
  const { productCode, name, price } = payload;

  try {
    if (!productCode) {
      throw new Error("Product Code Is Missing");
    }
    if (!name) {
      throw new Error("Product Name Is Missing");
    }
    if (Object.keys(price).length === 0) {
      throw new Error("Price can't be less than 0");
    }
  } catch (error) {
    throw error;
  }
}
