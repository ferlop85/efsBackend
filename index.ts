import "dotenv/config"
import "express-async-errors"
import os from "os"
import express from "express"
import routes from "./routes/index"
import connectDB from "./db/connect"
import cors from "cors"
import cookieParser from "cookie-parser"
import { handleErrors } from "./middlewares/errors"

const app = express()
connectDB()
app.use(cookieParser())
app.use(express.json())

// Para MULTER
app.use(express.urlencoded({ extended: true }))

// Configuración de CORS, que solo nuestro frontend pueda acceder a la API!
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Obligatorio que no sea "*" cuando usamos "credentials: true"
    methods: ["POST", "PUT", "DELETE", "GET", "OPTIONS"],
    credentials: true,
  })
)

// Ruta para comprobar que el servidor está activo
app.use("/health-check", (_, res) => {
  res.status(200).send(os.hostname())
})

// Gestión de requests
app.use("/api", routes)

// Gestión de errores
app.use(handleErrors)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("App escuchando en el puerto:", PORT)
})
