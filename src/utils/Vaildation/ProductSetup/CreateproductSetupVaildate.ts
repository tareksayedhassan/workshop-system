import prisma from "@/src/utils/db";
type Items = {
  productCode: string;
  name: string;

  cateId: string;
};
export async function CreateproductSetupVaildate(payload: Items) {
  const { cateId } = payload;

  try {
    if (!cateId) {
      throw new Error("Category Is Missing");
    }

    const fetchCategory = await prisma.cars_brand.findUnique({
      where: {
        id: Number(cateId),
      },
    });

    if (!fetchCategory) {
      throw new Error("Category Not Found");
    }
  } catch (error) {
    throw error;
  }
}
