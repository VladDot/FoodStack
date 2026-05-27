import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);

const prismaClientSingleton = () => {
    return new PrismaClient({ adapter });
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma =
    global.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") global.prismaGlobal = prisma;
