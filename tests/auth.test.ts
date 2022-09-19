import supertest from "supertest";
import prisma from "../src/database/prismaClient";
import app from "../src/app";
import { cadastroFactory, loginFactory } from "./factorys/authFactory"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`;
})

describe("Testa Cadastro", () => {
    it("Deve Retornar 201 para sucesso no cadastro", async () => {
        const dadosUsuario = await cadastroFactory()

        const resultado = await supertest(app).post("/signup").send(dadosUsuario)

        expect(resultado.status).toBe(201)
    })
    it("Deve Retornar 422 para erro no cadastro", async () => {
        const dadosUsuario = {
            email: "meuemail@gmail.com",
            password: "minhasenha123",
            confirmPassword: "senhadiferente123"
        }

        const resultado = await supertest(app).post("/signup").send(dadosUsuario)

        expect(resultado.status).toBe(422)
    })
})


describe("Testa Login", () => {
    it("Deve Retornar 200 para sucesso no login", async () => {
        const dadosCadastro = await cadastroFactory()
        await supertest(app).post("/signup").send(dadosCadastro)

        const dadoslogin = await loginFactory()

        const login = await supertest(app).post("/signin").send(dadoslogin)

        expect(login.status).toBe(200)
    })

    it("Deve Retornar 401 para erro no login", async () => {
        const dadosCadastro = await cadastroFactory()
        await supertest(app).post("/signup").send(dadosCadastro)

        const dadoslogin = {
            email: "meuemail@gmail.com",
            password: "senhadiferentedesseemial"
        }

        const login = await supertest(app).post("/signin").send(dadoslogin)

        expect(login.status).toBe(401)
    })

})

afterAll(async () => {
    await prisma.$disconnect()
})