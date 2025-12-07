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
      role: "ReaderAndwrater",
      permissions: {
        create: allPermissions.map((item) => ({
          permission: item,
        })),
      },
    },
  });
  const Brand = [
    {
      cate_name: "Audi",
      addedById: 1,
      note: "test note",
      Brand_logo: "Audi.png",
    },
    {
      cate_name: "Volkswagen",
      addedById: 1,
      note: "test note",
      Brand_logo: "Volkswagen.png",
    },
    {
      cate_name: "Seat",
      addedById: 1,
      note: "test note",
      Brand_logo: "Seat.png",
    },
    {
      cate_name: "Skoda",
      addedById: 1,
      note: "test note",
      Brand_logo: "Skoda.png",
    },
  ];

  for (const item of Brand) {
    await prisma.cars_brand.create({
      data: item,
    });
  }
}
Main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
