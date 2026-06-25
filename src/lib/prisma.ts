import { PrismaClient } from "../../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";

let prismaInstance: PrismaClient | null = null;

function getConnectionString() {
  return process.env.DATABASE_URL ?? "file:./dev.db";
}

export function getPrisma() {
  if (!prismaInstance) {
    const adapter = new PrismaBetterSqlite3({ url: getConnectionString() });
    prismaInstance = new PrismaClient({ adapter });
  }

  return prismaInstance;
}
