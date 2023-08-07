import multer from "multer"
const storageType = multer.memoryStorage()

export const parseOneFile = multer({ storage: storageType }).single("image")
