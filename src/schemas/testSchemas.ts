import Joi from "joi";

const validaProva = Joi.object({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().integer().min(1).required(),
    disciplineId: Joi.number().integer().min(1).required(),
    teacherId: Joi.number().integer().min(1).required()
})

export default validaProva