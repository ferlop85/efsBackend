import express from "express"
import { attach, getAll, remove } from "../controllers/attachments"
import { parseOneFile } from "../helpers/multer"
import { validateUser } from "../middlewares/auth"

const router = express.Router()

router.use(validateUser())
router.get("/:entity/:id", getAll)
router.post("/:entity/:id", parseOneFile, attach)
router.delete("/:id", remove)

export default router
