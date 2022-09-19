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