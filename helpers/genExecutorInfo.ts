import { MyRequest, User } from "../schemas/auth"

const genExecutorInfo = (req: MyRequest) => {
  const user = req.user as User
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    image_url: user.image_url,
  }
}

export default genExecutorInfo
