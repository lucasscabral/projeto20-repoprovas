import { Router } from "express";
import authRouters from "./authRouter";
import testRouter from "./testRouter";


const router = Router()

router.use(authRouters)
router.use(testRouter)

export default router