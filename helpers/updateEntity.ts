import { ClientSession, Types } from "mongoose"
import ClientModel from "../models/client"
import ProductModel from "../models/product"
import SaleModel from "../models/sale"
import { MyError } from "../schemas/errors"

interface Params {
  id: Types.ObjectId | string
  entity: string
  update: { [key: string]: any }
  session: ClientSession
}

const updateEntity = async ({ id, entity, update, session }: Params) => {
  const finalSession = { session }

  switch (entity) {
    case "client":
      await ClientModel.findByIdAndUpdate(id, update, finalSession)
    case "product":
      await ProductModel.findByIdAndUpdate(id, update, finalSession)
    case "sale":
      await SaleModel.findByIdAndUpdate(id, update, finalSession)
    default:
      break
  }
  // throw new MyError("Las transacciones funcionan 😊", 404)
}

export default updateEntity
