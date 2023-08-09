import express from "express"
import authRoutes from "./auth"
import salesRoutes from "./sales"
import productsRoutes from "./products"
import clientsRoutes from "./clients"
import attachmentsRoutes from "./attachments"
import commentsRoutes from "./comments"
const router = express.Router()

router.use("/auth", authRoutes)
router.use("/sales", salesRoutes)
router.use("/products", productsRoutes)
router.use("/clients", clientsRoutes)
router.use("/attachments", attachmentsRoutes)
router.use("/comments", commentsRoutes)

export default router
