import Joi from "joi";

const validaCadastro = Joi.object({
    email: Joi.string().pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i).required(),
    password: Joi.string().min(10).required(),
    confirmPassword: Joi.ref("password")
})

const validaLogin = Joi.object({
    email: Joi.string().pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i).required(),
    password: Joi.string().min(10).required()
})

export { validaCadastro, validaLogin }