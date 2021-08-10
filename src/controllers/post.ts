/*
 * @Author: your name
 * @Date: 2020-01-18 14:21:52
 * @LastEditTime: 2021-01-09 15:44:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog-node/src/controllers/post.ts
 */
import { Request, Response, NextFunction } from 'express'
import Post from '../mongoModels/post'
import HttpException from '../exceptions/HttpException'
import { NOT_FOUND, UNAUTHORIZED } from 'http-status-codes'
import { IPostDocument } from '../mongoModels/post'
import { IUserDocument } from 'src/mongoModels/User'
import { checkPostBody } from '../utils/validator'

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.query
    console.log('TCL: id', id)

    let posts
    if (id) {
      posts = await Post.findById(id)
    } else {
      posts = await Post.find()
    }

    res.json({
      success: true,
      data: posts,
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

    checkPostBody(body)

    const newPost = new Post({
      body,
      username: user?.username,
      user,
      createAt: new Date().toISOString(),
    })

    await newPost.save()

    res.json({
      success: true,
      data: '创建成功',
      message: '创建成功',
    })
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.query
    const { body }: { body: IPostDocument['body'] } = req.body
    const user = req.currentUser as IUserDocument
    const post = await Post.findById(id)

    checkPostBody(body)

    if (post) {
      console.log('TCL: post', post)
      if (post.username === user.username) {
        const resPost = await Post.findByIdAndUpdate(
          id,
          { body },
          { new: true }
        )
        res.json({
          success: true,
          data: resPost,
          message: '修改成功',
        })
      } else {
        throw new HttpException(UNAUTHORIZED, '没有权限')
      }
    } else {
      throw new HttpException(NOT_FOUND, '未找到该POST')
    }
  } catch (e) {
    next(e)
  }
}
