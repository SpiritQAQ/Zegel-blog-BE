import { Schema, model, Document } from 'mongoose'

export interface ITagDocument extends Document {
  name: string,
  // status?: number,
}

const tagSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      trim: true,
      required: [true, '标签名不能为空'],
      maxlength: [30, '标签最长为30个字符']
    },
  }
)

const Tag = model<ITagDocument>('Tag', tagSchema)

export default Tag
