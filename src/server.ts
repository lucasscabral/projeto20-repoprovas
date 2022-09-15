import app from "./app"
import dotenv from "dotenv"
dotenv.config()

const PORT: number = Number(process.env.PORT)

app.listen(PORT, () => console.log(`Servidor Rodando na porta: ${PORT}`))