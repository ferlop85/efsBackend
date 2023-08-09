import mongoose from "mongoose"
import { MyRequest } from "../schemas/auth"

const startMongooseSession = async (req: MyRequest) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  req.session = session

  return session
}

export default startMongooseSession
