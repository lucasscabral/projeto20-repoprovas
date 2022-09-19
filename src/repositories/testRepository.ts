import prisma from "../database/prismaClient";
import { ITestData } from "../types/test";


export async function buscaCategoriaId(categoriaId: number) {
    return await prisma.categories.findUnique({ where: { id: categoriaId } })
}

export async function buscaDisciplinaId(disciplineId: number) {
    return await prisma.disciplines.findUnique({ where: { id: disciplineId } })
}

export async function buscaProfessorId(professorId: number) {
    return await prisma.teachers.findUnique({ where: { id: professorId } })
}

export async function buscaProfessorDisciplinaId(professorId: number, disciplinaId: number) {
    return await prisma.teachersDisciplines.findMany({
        where: {
            teacherId: professorId,
            disciplineId: disciplinaId
        }
    })
}

export async function criaProva(corpoProva: ITestData) {
    return await prisma.tests.create({ data: corpoProva })
}

export async function buscaProvasPorDisciplinas() {
    return prisma.terms.findMany({
        select: {
            number: true,
            Disciplines: {
                select: {
                    name: true,
                    TeachersDisciplines: {
                        select: {
                            id: false,
                            disciplineId: false,
                            teacherId: false,
                            teacher: {},
                            Tests: {

                                select: {
                                    category: {
                                        select: {
                                            name: true,
                                            Tests: {
                                                select: {
                                                    id: true,
                                                    name: true,
                                                    pdfUrl: true,
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}


export async function buscaProvasPorProfessores() {
    return prisma.teachers.findMany({
        select: {
            name: true,
            TeachersDisciplines: {
                select: {
                    Tests: {
                        select: {
                            category: {
                                select: {
                                    name: true,
                                    Tests: {
                                        select: {
                                            id: true,
                                            name: true,
                                            pdfUrl: true,
                                            teacherDiscipline: {
                                                select: {
                                                    disciplines: {
                                                        select: {
                                                            name: true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}
