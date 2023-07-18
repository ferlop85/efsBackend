import { UserModel } from "../models/user"
import { User } from "../schemas/auth"

export const createUser = async (user: User) => {
  return await UserModel.create(user)
}
