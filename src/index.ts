import express, { Express, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { NOT_FOUND } from 'http-status-codes'
import HttpException from './exceptions/HttpException'
import errorMiddleware from './middlewares/error.middleware'

const app: Express = express()

const PORT: any = process.env.PORT || 3000

app.get('/', (_req: Request, res: Response) => {
  res.send('hello world')
})

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error = new HttpException(NOT_FOUND, 'Router not found')
  next(error)
})

app.use(errorMiddleware)

const run = async () => {
  await mongoose.connect(`mongodb://localhost:27017/tsexpress`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  app.listen(PORT, () => {
    console.log(`Service is running on http://localhost:${PORT}`)
  })
}

run()
