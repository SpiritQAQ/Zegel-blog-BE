import { Request, Response, NextFunction } from 'express'
import Tag, { ITagDocument } from '../../mongoModels/Tag'
import { FORBIDDEN } from 'http-status-codes'
import HttpException from '../../exceptions/HttpException'

export const CreateTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name }: { name: ITagDocument['name'] } = req.body

    const tag = await Tag.findOne({ name })
    if (tag) {
      throw new HttpException(FORBIDDEN, '该标签已存在')
    } else {
      const newTag = new Tag({
        name
      })
      await newTag.save()

      if (!newTag) throw new HttpException(FORBIDDEN, '该标签已存在')

      res.json({
        success: true,
        message: '增加标签成功'
      })
    }
  } catch (e) {
    next(e)
  }
}