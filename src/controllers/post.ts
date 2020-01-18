import { Request, Response, NextFunction } from "express";
import Post from "../mongoModels/post";
import isEmpty from "validator/lib/isEmpty";
import HttpException from "../exceptions/HttpException";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";
import { IPostDocument } from '../mongoModels/post'
import { IUserDocument } from "src/mongoModels/User";

export const getPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await Post.find()

    res.json({
      success: true,
      data: posts
    })
  } catch (error) {
    next(error)
  }
}

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.currentUser as IUserDocument

    const { body }: { body: IPostDocument['body'] } = req.body

    if (isEmpty(body.trim())) {
      throw new HttpException(UNPROCESSABLE_ENTITY, 'Body不能为空')
    }

    const newPost = new Post({
      body,
      username: user?.username,
      user,
      createAt: new Date().toISOString()
    })

    await newPost.save()

    res.json({
      success: true,
      data: '创建成功',
      message: '创建成功'
    })
  } catch (error) {
    next(error)
  }

}