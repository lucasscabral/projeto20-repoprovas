import supertest from "supertest";
import prisma from "../src/database/prismaClient";
import app from "../src/app";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`;
})







afterAll(async () => {
    await prisma.$disconnect()
})