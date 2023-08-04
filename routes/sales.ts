import express from "express"
import {
  getAll,
  create,
  getById,
  getByClient,
  getSummary,
} from "../controllers/sales"
import { validateUser } from "../middlewares/auth"
import { validateRequest } from "../middlewares/validateRequest"
import { CreationSchema, GetByIdSchema } from "../schemas/sales"

const router = express.Router()

router.use(validateUser())

router.get("/", getAll)
router.get("/summary", getSummary)
router.get("/:id", validateRequest(GetByIdSchema), getById)
router.get("/client/:id", validateRequest(GetByIdSchema), getByClient)
router.post("/", validateRequest(CreationSchema), create)

export default router
