import express from "express"
import { getAll, create, remove } from "../controllers/comments"
import { validateUser } from "../middlewares/auth"

const router = express.Router()

router.use(validateUser())
router.get("/:entity_id", getAll)
router.post("/:entity/:id", create)
router.delete("/:id", remove)

export default router
