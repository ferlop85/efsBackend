import mongoose from "mongoose"
import { resetDB } from "../helpers/resetDB"
import { createUser } from "../helpers/createUser"

async function connectDB() {
  if (!process.env.MONGODB_URL) {
    throw new Error("Falta la variable de entorno MONGODB_URL")
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Conexión exitosa con Mongo DB")
    // await resetDB()
    // await createUser({
    //   firstname: "Martín",
    //   lastname: "Gesualdo",
    //   email: "ignaciogesualdo@gmail.com",
    //   login_code: "123456",
    //   image_url: "https://www.google.com",
    //   roles: { admin: true, seller: true },
    // })
  } catch (error) {
    console.log("Hubo un error al conectarnos a la BBDD", error)
  }
}

export default connectDB
