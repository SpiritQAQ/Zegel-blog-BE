import express, {  Request, Response } from 'express'

import * as userController from '../controllers/user/index'
import * as postController from '../controllers/post'
import * as articleController from '../controllers/article'
import * as tagController from '../controllers/tag'

import checkAuthMiddleware from '../middlewares/check-auth.middleware'

export const initRoute = (app:express.Express) => {
  app.get('/', (_req: Request, res: Response) => {
  res.send('hello world')
})

app.post('/user/register', userController.postRegister)

app.post('/user/login', userController.postLogin)

app.get('/post', postController.getPosts)
app.post('/createPost', checkAuthMiddleware, postController.createPost)
app.post('/updatePost', checkAuthMiddleware, postController.updatePost)

app.post('/editArticle', articleController.EditArticle)
app.get('/article/list', articleController.GetArticleList)
app.get('/article/detail', articleController.GetArticleDetail)

app.get('/getTag', tagController.GetTag)
app.post('/bindTag', tagController.BindTag)
app.post('/createTag', tagController.CreateTag)

}
