import { Request, Response, NextFunction } from 'express'
import Article, { IArticleDocument } from '../../mongoModels/Article'

export const GetArticleList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body
    let articleList: IArticleDocument[] = []
    if (token) {

    } else {
      articleList = await Article.find({}, { body: false })
    }

    res.json({
      success: true,
      data: {
        ...articleList
      },
      message: '查询成功'
    })
  }
  catch (e) {
    next(e)
  }
}

export const GetArticleDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body
    const { id } = req.query
    let article: IArticleDocument | null = null
    if (token) {

    } else {
      article = await Article.findOne(id)
      if (!article) throw '未查询到文章详情'
    }

    res.json({
      success: true,
      data: {
        ...article
      },
      message: '查询成功'
    })
  }
  catch (e) {
    next(e)
  }
}