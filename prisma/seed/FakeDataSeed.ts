import bcrypt from "bcrypt";
import prisma from "../../src/utils/db";
export async function Main() {
  const HashedPassword = await bcrypt.hash("123123", 10);
  await prisma.user.create({
    data: {
      name: "tarek sayed hassan",
      email: "beta1@gmail.com",
      password: HashedPassword,
      role: "writerAndReader",
    },
  });
}
Main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
