import express, { Express, Request, Response } from 'express'

const app: Express = express()

const PORT: any = process.env.PORT || 3000

app.get('/', (_req: Request, res: Response) => {
  res.send('hello world')
})
const run = () => {
  app.listen(PORT, () => {
    console.log(`Service is running on http://localhost:${PORT}`)
  })
}

run()
