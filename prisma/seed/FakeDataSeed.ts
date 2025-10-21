import bcrypt from "bcrypt";
import prisma from "../../src/utils/db";
import { Permissions } from "@prisma/client";
export async function Main() {
  const HashedPassword = await bcrypt.hash("123123", 10);
  const allPermissions = [
    Permissions.CREATE,
    Permissions.READ,
    Permissions.UPDATE,
    Permissions.DELETE,
  ];

  await prisma.user.create({
    data: {
      name: "tarek sayed hassan",
      email: "beta1@gmail.com",
      password: HashedPassword,
      permissions: {
        create: allPermissions.map((item) => ({
          permission: item,
        })),
      },
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
