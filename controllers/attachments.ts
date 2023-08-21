import { deleteBlob, updateBlob } from "../helpers/azureBlob"
import updateEntity from "../helpers/updateEntity"
import AttachmentModel from "../models/attachment"
import { MyRequest, MyResponse } from "../schemas/auth"
import { EntitiesNames } from "../schemas/global"
import genExecutorInfo from "../helpers/genExecutorInfo"
import startMongooseSession from "../helpers/startMongooseSession"

export const getAll = async (req: MyRequest, res: MyResponse) => {
  const { entity_id } = req.params
  const attachments = await AttachmentModel.find({
    entity_id,
    deleted: false,
  })

  res.status(200).json({ ok: true, data: attachments })
}

export const attach = async (
  req: MyRequest<any, { entity: EntitiesNames; id: string }>,
  res: MyResponse
) => {
  const { entity, id } = req.params

  const session = await startMongooseSession(req)

  if (req.file) {
    const fileExt = req.file.originalname.split(".").pop()
    const newAttachment = new AttachmentModel({
      description: req.body.description,
      file_name: req.file.originalname,
      file_ext: fileExt,
      entity,
      entity_id: id,
      file_size: req.file.size,
      creator: req.user?.sub,
      creatorInfo: genExecutorInfo(req),
    })
    const { blobUrl } = await updateBlob({
      buffer: req.file.buffer,
      fileName: `${newAttachment._id}.${fileExt}`,
      folderName: "attachments",
    })
    newAttachment.url = blobUrl
    await newAttachment.save({ session })

    const update = { $push: { attachments: blobUrl } }

    await updateEntity({ id, entity, update, session })
  }

  session.commitTransaction()

  res.status(201).json({ ok: true, message: "Archivo subido con éxito" })
}

export const remove = async (
  req: MyRequest<any, { id: string }>,
  res: MyResponse
) => {
  const { id } = req.params

  const session = await startMongooseSession(req)

  const attachment = await AttachmentModel.findById(id)
  if (attachment) {
    await deleteBlob({
      fileName: `${id}.${attachment.file_ext}`,
      folderName: "attachments",
    })

    const deletedAttachment = await AttachmentModel.findByIdAndUpdate(id, {
      deleted: true,
      deleterInfo: genExecutorInfo(req),
    })
    const update = { $pull: { attachments: attachment.url } }

    if (!!deletedAttachment) {
      await updateEntity({
        id: deletedAttachment.entity_id,
        entity: deletedAttachment.entity,
        update,
        session,
      })
    }
  }

  session.commitTransaction()

  res.status(200).json({
    ok: true,
    message: "Archivo eliminado con éxito",
  })
}
