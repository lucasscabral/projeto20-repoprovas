import { Request, Response } from "express";
import * as autenticacaoService from "../services/authService";
import { ILogin } from "../utils/interfaceUtils";


export async function cadastrar(req: Request, res: Response) {
    const body = req.body;

    await autenticacaoService.verificaEmailCadastro(body.email)
    const senhaEcriptografada = await autenticacaoService.ecriptografarSenha(body.password)
    delete body.password
    delete body.confirmPassword

    const data = {
        ...body, password: senhaEcriptografada
    }

    await autenticacaoService.criarUsuario(data)
    res.sendStatus(201)
}

export async function logar(req: Request, res: Response) {
    const { email, password } = req.body;

    const emailUsuario: ILogin = await autenticacaoService.verificaEmailLogin(email)
    await autenticacaoService.verificaSenha(password, emailUsuario.password)
    const corpo = { id: emailUsuario.id, email }
    const token = await autenticacaoService.geraToken(corpo)

    res.status(200).send({ token })
}
