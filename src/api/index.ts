import express, { Request, Response } from 'express'
const app = express()

app.get(
  '/sayHello',
  (req: Request, res: Response): express.Response<any, Record<string, any>> => {
    return res.status(200).send(JSON.stringify({ status: '0', message: 'hello' }))
  }
)

export default {
  path: '/api',
  handler: app,
}
