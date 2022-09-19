import { Router } from "express";
import { validarToken } from "../utils/tokenMiddlewers";
import validateSchema from "../utils/validateSchema";
import validaProva from "../schemas/testSchemas";
import * as testController from "../controllers/testController";

const testRouter = Router()

testRouter.post("/test", validarToken, validateSchema(validaProva), testController.criaProva)
testRouter.get("/test/discipline", validarToken, testController.listaProvasDisciplinas)
testRouter.get("/test/teacher", validarToken, testController.listaProvasProfessores)


export default testRouter