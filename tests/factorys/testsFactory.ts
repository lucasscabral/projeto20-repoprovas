import { faker } from "@faker-js/faker"


export async function dadosProva() {
    return {
        name: faker.name.fullName(),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        disciplineId: 4,
        teacherId: 2
    }
}


export async function loginFactory() {
    return {
        email: "email@gmail.com",
        password: "minhasenha123",
    }
}

export async function cadastroFactory() {
    return {
        email: "email@gmail.com",
        password: "minhasenha123",
        confirmPassword: "minhasenha123"
    }
}