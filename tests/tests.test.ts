import supertest from "supertest";
import prisma from "../src/database/prismaClient";
import app from "../src/app";
import { faker } from "@faker-js/faker";
import { cadastroFactory, dadosProva, loginFactory } from "./factorys/testsFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`;
})

describe("Testa Criação de Prova", () => {
    it("Deve retornar 201 para sucesso na criação da prova", async () => {
        const dadosCadastro = await cadastroFactory()

        await supertest(app).post("/signup").send(dadosCadastro)

        const dadoslogin = await loginFactory()

        const login = await supertest(app).post("/signin").send(dadoslogin)
        const token = login.body.token

        const prova = await dadosProva()

        const resultado = await supertest(app).post("/test").send(prova).set({ Authorization: `Bearer ${token}` })

        expect(resultado.status).toBe(201)
    })


    it("Deve retornar 404 para erro na criação da prova, caso não exista token ", async () => {
        const dadosCadastro = await cadastroFactory()

        await supertest(app).post("/signup").send(dadosCadastro)

        const dadoslogin = await loginFactory()

        await supertest(app).post("/signin").send(dadoslogin)
        const token = ""

        const prova = await dadosProva()

        const resultado = await supertest(app).post("/test").set({ Authorization: `Bearer ${token}` }).send(prova)

        expect(resultado.status).toBe(401)
    })

    it("Deve retornar 404 para erro na criação da prova, caso não exista a disciplina,o professor ou a categoria ", async () => {
        const dadosCadastro = await cadastroFactory()

        await supertest(app).post("/signup").send(dadosCadastro)

        const dadoslogin = await loginFactory()

        const login = await supertest(app).post("/signin").send(dadoslogin)
        const token = login.body.token

        const prova = {
            name: "Nome da Prova",
            pdfUrl: "http://link.com",
            categoryId: 999999999999,
            disciplineId: 9999999999999,
            teacherId: 9999999999999
        }

        const resultado = await supertest(app).post("/test").set({ Authorization: `Bearer ${token}` }).send(prova)

        expect(resultado.status).toBe(404)
    })
})

describe("Testa Busca de provas por disciplinas", () => {
    it("Deve retornar 200 e um array de objetos para sucesso na buscas das provas por disciplinas", async () => {
        const dadosCadastro = await cadastroFactory()

        await supertest(app).post("/signup").send(dadosCadastro)

        const dadoslogin = await loginFactory()

        const login = await supertest(app).post("/signin").send(dadoslogin)
        const token = login.body.token

        const provasPorDisciplinas = await supertest(app).get("/test/discipline").set({ Authorization: `Bearer ${token}` }).send()

        expect(provasPorDisciplinas.status).toBe(200)
        expect(provasPorDisciplinas.body).toBeInstanceOf(Array)
    })
})


describe("Testa Busca de provas por Professores", () => {
    it("Deve retornar 200 e um array de objetos para sucesso na buscas das provas por Professores", async () => {
        const dadosCadastro = await cadastroFactory()

        await supertest(app).post("/signup").send(dadosCadastro)

        const dadoslogin = await loginFactory()

        const login = await supertest(app).post("/signin").send(dadoslogin)
        const token = login.body.token

        const provasPorProfessores = await supertest(app).get("/test/teacher").set({ Authorization: `Bearer ${token}` }).send()

        expect(provasPorProfessores.status).toBe(200)
        expect(provasPorProfessores.body).toBeInstanceOf(Array)
    })
})



afterAll(async () => {
    await prisma.$disconnect()
})