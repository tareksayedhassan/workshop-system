// prisma.config.ts
import "dotenv/config";
import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  experimental: {
    externalTables: true,
    studio: true,
  },

  schema: path.join("prisma", "schema.prisma"),

  migrations: {
    path: path.join("prisma", "migrations"),
    seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed/FakeDataSeed.ts',
  },

  tables: {
    external: [],
  },

  typedSql: {
    path: path.join("prisma", "queries"),
  },
} satisfies PrismaConfig;
