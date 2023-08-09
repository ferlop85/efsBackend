import { Schema, model } from "mongoose"
import { userBasicInfo } from "./user"

export const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    entity: { type: String, required: true },
    entity_id: { type: Schema.Types.ObjectId, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    creatorInfo: userBasicInfo,
    deleted: { type: Boolean, default: false },
    deleterInfo: userBasicInfo,
  },
  { timestamps: true }
)
const CommentModel = model("Comment", commentSchema, "comments")
export default CommentModel
