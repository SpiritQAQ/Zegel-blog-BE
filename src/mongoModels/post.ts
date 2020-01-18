import { Schema, model, Document } from "mongoose";
import { IUserDocument } from "./User";

export interface IPostDocument extends Document {
  body: string,
  createAt: Date,
  user: IUserDocument['_id']
}
const postSchema = new Schema({
  body: String,
  createAt: Date,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
})

const Post = model<IPostDocument>('Post', postSchema)

export default Post