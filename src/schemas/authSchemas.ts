import Joi from "joi";

const validaCadastro = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.ref("password")
})

const validaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

export { validaCadastro, validaLogin }