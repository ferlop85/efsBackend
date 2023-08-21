import { Schema, model } from "mongoose"

export const userBasicInfo = {
  firstname: String,
  lastname: String,
  email: String,
  image_url: String,
}

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  login_code: { type: String, required: true, length: 6 },
  image_url: String,
  roles: {
    type: {
      admin: Boolean,
      seller: Boolean,
    },
    required: true,
  },
})

export const UserModel = model("User", userSchema, "users")
