import { Request, Response, NextFunction } from 'express'
import Tag from '../../mongoModels/Tag'
// import { FORBIDDEN } from 'http-status-codes'
// import HttpException from '../../exceptions/HttpException'

export const GetTag = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { name }: { name: ITagDocument['name'] } = req.body

    const tagList = await Tag.find({})
    if (tagList) {
      res.json({
        success: true,
        data: tagList,
        message: '查询成功'
      })
    }
    throw '未查询到标签'
  } catch (e) {
    next(e)
  }
}