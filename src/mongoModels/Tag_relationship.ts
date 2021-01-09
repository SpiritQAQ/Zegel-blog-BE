import { Schema, model, Document } from 'mongoose'
import { ITagDocument } from './Tag'
import { IArticleDocument } from './Article'

export interface ITagRelationshipDocument extends Document {
  articleId: IArticleDocument['_id'],
  tagId: ITagDocument['_id'],
  tagName: ITagDocument['name']
}

const ITagRelationshipDocument = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
    },
    articleId: {
      type: Schema.Types.ObjectId,
    },
    tagId: {
      type: Schema.Types.ObjectId,
    },
    tagName: {
      type: String
    }
  }
)

const TagRelationship = model<ITagRelationshipDocument>('TagRelationship', ITagRelationshipDocument)

export default TagRelationship
