import CommentModel from "../models/comment"
import { MyRequest, MyResponse } from "../schemas/auth"
import { EntitiesNames } from "../schemas/global"
import updateEntity from "../helpers/updateEntity"
import genExecutorInfo from "../helpers/genExecutorInfo"

export const getAll = async (req: MyRequest, res: MyResponse) => {
  const { entity_id } = req.params
  const comments = await CommentModel.find({ entity_id, deleted: false })

  res.status(200).json({ ok: true, data: comments })
}

export const create = async (
  req: MyRequest<any, { entity: EntitiesNames; id: string }>,
  res: MyResponse
) => {
  const { entity, id } = req.params

  await CommentModel.create({
    text: req.body.text,
    creator: req.user?.sub,
    entity,
    entity_id: id,
    creatorInfo: genExecutorInfo(req),
  })

  const update = { $inc: { comments: 1 } }

  await updateEntity({ id, entity, update })

  res.status(201).json({ ok: true, message: "Comentario creado con éxito" })
}

export const remove = async (
  req: MyRequest<any, { id: string }>,
  res: MyResponse
) => {
  const { id } = req.params

  const deletedComment = await CommentModel.findByIdAndUpdate(id, {
    deleted: true,
    deleterInfo: genExecutorInfo(req),
  })

  const update = { $inc: { comments: -1 } }
  if (!!deletedComment) {
    await updateEntity({
      id: deletedComment.entity_id,
      entity: deletedComment.entity,
      update,
    })
  }

  res.status(200).json({
    ok: true,
    message: "Comentario eliminado con éxito",
  })
}
