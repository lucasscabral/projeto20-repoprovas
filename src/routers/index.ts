import { Router } from "express";
import authRouters from "./authRouter";

const router = Router()

router.use(authRouters)

export default router