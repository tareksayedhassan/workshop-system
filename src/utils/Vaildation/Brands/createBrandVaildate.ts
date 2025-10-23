import prisma from "@/src/utils/db";
type Items = {
  addedById: number;
  name: string;
};
export async function createBrandVaildate(payload: Items) {
  const { name, addedById } = payload;

  try {
    if (!name) {
      throw new Error("Category Name Is Missing");
    }

    if (!addedById) {
      throw new Error("User Id Is Missing");
    }
    const fetchUser = await prisma.user.findUnique({
      where: {
        id: Number(addedById),
      },
    });

    if (!fetchUser) {
      throw new Error("User Not Found");
    }
  } catch (error) {
    throw error;
  }
}
