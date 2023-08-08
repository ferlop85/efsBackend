import { deleteBlob, updateBlob } from "../helpers/azureBlob"
import AttachmentModel from "../models/attachment"
import ClientModel from "../models/client"
import ProductModel from "../models/product"
import SaleModel from "../models/sale"
import { MyRequest, MyResponse } from "../schemas/auth"
import { EntitiesNames } from "../schemas/global"

export const getAll = async (req: MyRequest, res: MyResponse) => {
  const { entity, id } = req.params
  const attachments = await AttachmentModel.find({ entity, entity_id: id })

  res.status(200).json({ ok: true, data: attachments })
}

export const attach = async (
  req: MyRequest<any, { entity: EntitiesNames; id: string }>,
  res: MyResponse
) => {
  console.log({ body: req.user, file: req.file, files: req.files })
  const { entity, id } = req.params
  if (req.file) {
    const fileExt = req.file.originalname.split(".").pop()
    const newAttachment = new AttachmentModel({
      description: req.body.description,
      file_name: req.file.originalname,
      file_ext: fileExt,
      entity,
      entity_id: id,
      creator: req.user?.sub,
      file_size: req.file.size,
    })
    const blobName = await updateBlob({
      buffer: req.file.buffer,
      fileName: `${newAttachment._id}.${fileExt}`,
      folderName: "attachments",
    })
    newAttachment.url = `${process.env.AZURE_BLOB_URL}/efs/${blobName}`
    const createdAttachment = await newAttachment.save()

    const update = { $push: { attachments: createdAttachment.url } }

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

  res.status(201).json({ ok: true, message: "Archivo subido con éxito" })
}

export const remove = async (
  req: MyRequest<any, { id: string }>,
  res: MyResponse
) => {
  const { id } = req.params
  const attachment = await AttachmentModel.findById(id)
  if (attachment) {
    await deleteBlob({
      fileName: `${id}.${attachment.file_ext}`,
      folderName: "attachments",
    })

    await AttachmentModel.findByIdAndRemove(id)
  }
  res.status(200).json({
    ok: true,
    message: "Archivo eliminado con éxito",
  })
}
