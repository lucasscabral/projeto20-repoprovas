import { Request, Response } from "express";
import * as testService from "../services/testService"

export async function criaProva(req: Request, res: Response) {
    const prova = req.body

    // try {
    await testService.buscaCategoria(prova.categoryId)
    await testService.buscaDisciplina(prova.disciplineId)
    await testService.buscaProfessor(prova.teacherId)

    const professorDisciplina = await testService.buscaProfessorDisciplina(prova.teacherId, prova.disciplineId)
    delete prova.teacherId
    delete prova.disciplineId

    const corpoProva = {
        ...prova, teacherDisciplineId: professorDisciplina.id
    }
    await testService.criaProva(corpoProva)

    res.sendStatus(201)
    // } catch (error) {
    //     console.log(error)
    //     res.sendStatus(500)
    // }

}


export async function listaProvasDisciplinas(_: Request, res: Response) {

    const provasPorDisciplinas = await testService.provasPorDisciplinas()
    console.log(provasPorDisciplinas)

    res.send(provasPorDisciplinas)
}