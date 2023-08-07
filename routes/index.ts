import express from "express"
import authRoutes from "./auth"
import salesRoutes from "./sales"
import productsRoutes from "./products"
import clientsRoutes from "./clients"
import attachmentsRoutes from "./attachments"
const router = express.Router()

router.use("/auth", authRoutes)
router.use("/sales", salesRoutes)
router.use("/products", productsRoutes)
router.use("/clients", clientsRoutes)
router.use("/attachments", attachmentsRoutes)

export default router
