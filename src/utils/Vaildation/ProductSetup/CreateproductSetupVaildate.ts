import prisma from "@/src/utils/db";
type Items = {
  productCode: string;
  name: string;
};
export async function CreateproductSetupVaildate(payload: Items) {
  const { productCode, name } = payload;

  try {
    if (!productCode) {
      throw new Error("Product Code Is Missing");
    }
    if (!name) {
      throw new Error("Product Name Is Missing");
    }
  } catch (error) {
    throw error;
  }
}
