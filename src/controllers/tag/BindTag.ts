import { Request, Response, NextFunction } from 'express'
import TagRelationship, { ITagRelationshipDocument } from '../../mongoModels/Tag_relationship'
import { ITagDocument } from '../../mongoModels/Tag'
import { IArticleDocument } from 'src/mongoModels/Article'
import Tag from '../../mongoModels/Tag'

const saveRelationship = async (tagId: ITagDocument['_id'], articleId: IArticleDocument['_id']) => {
  const savedTag = await Tag.findOne({
    _id: tagId
  })
  const newRelationship = new TagRelationship({
    tagId,
    articleId,
    tagName: savedTag!.name
  })
  await newRelationship.save()
}

const deleteRelationship = async (relationshipList: Array<ITagRelationshipDocument>) => {
  const idList = relationshipList.map(e => {
    let result = []
    result.push(e['_id'])
    return result
  })
  await TagRelationship.deleteMany({
    _id: {
      $in: idList
    }
  })
}

export const BindTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tagIdList, articleId }: { tagIdList: Array<ITagDocument['_id']>, articleId: IArticleDocument['_id'] } = req.body

    const tagRelationshipList = await TagRelationship.find({
      articleId
    })
    if (tagRelationshipList) {

      // tagRelationshipList.forEach(tagRelationship => {
      //   if (tagIdList.includes(tagRelationship.tagId)) {
      //   } else {
      //     saveRelationship(tagRelationship.tagId, articleId)

      //   }
      // })
      let deleteIdList: Array<ITagRelationshipDocument> = []

      tagIdList.forEach(tagId => {
        let isSaved = false
        tagRelationshipList.forEach(relationship => {
          if (relationship.tagId == tagId) isSaved = true
          if (!tagIdList.includes(relationship.tagId.toString())) {
            deleteIdList.push(relationship)
          }
        })
        if (!isSaved) saveRelationship(tagId, articleId)
      })

      if (JSON.stringify(tagIdList) === '[]') deleteIdList = tagRelationshipList
      if (deleteIdList.length > 0) {
        deleteRelationship(deleteIdList)
      }
    } else {
      tagIdList.forEach(tagId => {
        saveRelationship(tagId, articleId)
      })
    }

    res.json({
      success: true,
      message: tagRelationshipList ? '更新成功' : '保存成功'
    })





  } catch (e) {
    next(e)
  }
}