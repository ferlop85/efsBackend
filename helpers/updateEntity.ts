import { Types } from "mongoose"
import ClientModel from "../models/client"
import ProductModel from "../models/product"
import SaleModel from "../models/sale"

const updateEntity = async ({
  id,
  entity,
  update,
}: {
  id: Types.ObjectId | string
  entity: string
  update: { [key: string]: any }
}) => {
  switch (entity) {
    case "client":
      await ClientModel.findByIdAndUpdate(id, update)
    case "product":
      await ProductModel.findByIdAndUpdate(id, update)
    case "sale":
      await SaleModel.findByIdAndUpdate(id, update)
    default:
      break
  }
}

export default updateEntity
