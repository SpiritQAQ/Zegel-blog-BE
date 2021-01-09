import { Schema, model, Document } from 'mongoose'
/**
 * @params
 *  title： 标题
 *  body： 正文
 *  status： 0 草稿 1 已发布 2 已删除
 *  views： 浏览量
 *  category： 文章分类id
 *  abstract： 文章摘要
 *
 */

export interface IArticleDocument extends Document {
  title: string,
  body: string,
  createAt?: Date,
  updateAt?: Date,
  status?: number,
  views?: number,
  // category: ICategoryDocument['_id'],
  abstract?: string
}
const articleDataSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
    },
    title: {
      type: String,
      trim: true,
      required: [true, '文章标题不能为空'],
      maxlength: [70, '文章标题最长为70个字符']
    },
    body: {
      type: String,
      required: [true, '文章内容不能为空'],
    },
    createAt: Date,
    updateAt: Date,
    status: {
      type: Number,
      default: 1,
      min: 0,
      max: 2,
      required: [true, '文章类型没有选择']
    },
    views: Number,
    // category: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'categorys',
    // },
    abstract: String
  },
  {
    timestamps: true
  }
)

const Article = model<IArticleDocument>('Article', articleDataSchema)

export default Article