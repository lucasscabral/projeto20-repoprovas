import { Router } from "express";
import * as autenticacaoController from "../controllers/authController"
import { validaCadastro, validaLogin } from "../schemas/authSchemas";
import validateSchema from "../utils/validateSchema";

const autenticacaoRouters = Router()

autenticacaoRouters.post("/signup", validateSchema(validaCadastro), autenticacaoController.cadastrar)
autenticacaoRouters.post("/signin", validateSchema(validaLogin), autenticacaoController.logar)

export default autenticacaoRouters