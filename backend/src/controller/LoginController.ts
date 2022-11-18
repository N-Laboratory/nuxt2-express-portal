import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import jwt from 'jsonwebtoken'
import { generateBySalt } from '../utils/HashGenerator'

export class LoginController {
  private userRepository = AppDataSource.getRepository(User)
  // Token有効期限5分 (秒)
  private expirationTime = 60 * 5

  async login(request: Request, response: Response) {
    response.header('Content-Type', 'application/json; charset=utf-8')
    const user = await this.userRepository.findOne({
      where: { name: request.body.name },
    }).catch(() => {
      response.status(401).send('{ "message": "login error" }')
      return
    })

    if (!user) {
      response.status(401).send('{ "message": "login error" }')
      return
    }

    // パスワード（ハッシュ）の取得
    const hashPassword = generateBySalt(request.body.password, user.salt)
    if (hashPassword !== user.password) {
      response.status(401).send('{ "message": "login error" }')
      return
    }

    const payload = {
      name: user.name,
    }
    // 本番環境ではsecretには秘密鍵を設定する
    // e.g. openssl genrsa -out /path/to/private.key 2048
    const token = jwt.sign(payload, 'secret', {
      expiresIn: this.expirationTime,
    })
    response.status(200).send('{ "token": "' + token + '" }')
  }

  async user(request: Request, response: Response) {
    const bearToken = request.headers['authorization']
    const bearer = bearToken.split(' ')
    const token = bearer[1]

    jwt.verify(token, 'secret', (err, user) => {
      if (!err) {
        return response.status(200).json({
          user,
        })
      }
      if (err instanceof jwt.TokenExpiredError) {
        console.error('トークンの有効期限が切れています。', err)
      } else if (err instanceof jwt.JsonWebTokenError) {
        console.error('トークンが不正です。', err)
      } else {
        console.error('トークンの検証でエラーが発生しました。', err)
      }
      return response.sendStatus(403)
    })
  }
}
