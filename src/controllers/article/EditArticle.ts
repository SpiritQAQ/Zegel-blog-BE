import { Request, Response, NextFunction } from 'express'
import Article, { IArticleDocument } from '../../mongoModels/Article'
import { UNPROCESSABLE_ENTITY } from 'http-status-codes'
import HttpException from '../../exceptions/HttpException'

export const EditArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const aData: IArticleDocument = req.body

    if (!aData.abstract) {
      aData.abstract = aData.body.substr(0, 50)
    }

    if (aData.id) {
      const article = await Article.findOne({ _id: aData.id })

      if (!article) throw new HttpException(UNPROCESSABLE_ENTITY, '未查询到相关文章')
      await article.updateOne({
        ...aData
      })
    } else {
      const newArticle = new Article({
        ...aData
      })
      await newArticle.save()
    }


    res.json({
      success: true,
      // data: {
      //   article?
      // },
      message: aData.id ? '修改成功' : '新增成功'
    })
  }
  catch (e) {
    next(e)
  }
}