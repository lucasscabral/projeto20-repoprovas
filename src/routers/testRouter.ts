import { Router } from "express";
import { validarToken } from "../utils/tokenMiddlewers";
import validateSchema from "../utils/validateSchema";
import validaProva from "../schemas/testSchemas";
import { criaProva } from "../controllers/testController";

const testRouter = Router()

testRouter.post("/test", validarToken, validateSchema(validaProva), criaProva)


export default testRouter