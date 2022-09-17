import { ITestData } from "../types/test";
import * as testRepository from "../repositories/testRepository"

export async function buscaCategoria(categoriaId: number) {
    const categoria = await testRepository.buscaCategoriaId(categoriaId)
    if (!categoria) {
        throw { code: "NotFound", message: "Essa categoria não existe" }
    }
}

export async function buscaDisciplina(disciplinaId: number) {
    const disciplina = await testRepository.buscaDisciplinaId(disciplinaId)
    if (!disciplina) {
        throw { code: "NotFound", message: "Essa disciplina não existe" }
    }
}

export async function buscaProfessor(professorId: number) {
    const professor = await testRepository.buscaProfessorId(professorId)
    if (!professor) {
        throw { code: "NotFound", message: "Esse professor não existe" }
    }
}

export async function buscaProfessorDisciplina(professorId: number, disciplinaId: number) {
    const professorDisciplina = await testRepository.buscaProfessorDisciplinaId(professorId, disciplinaId)
    if (professorDisciplina.length === 0) {
        throw { code: "NotFound", message: "Esse professor não é dessa disciplina" }
    }

    return professorDisciplina[0]
}

export async function criaProva(corpoProva: ITestData) {
    return await testRepository.criaProva(corpoProva)
}

export async function provasPorDisciplinas() {
    return await testRepository.buscaProvasPorDisciplinas()
}