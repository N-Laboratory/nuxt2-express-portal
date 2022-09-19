/* eslint-disable require-await */
import { Request } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import { generate, generateBySalt } from '../utils/HashGenerator'

export class UserController {
  private userRepository = AppDataSource.getRepository(User)

  async all() {
    return this.userRepository.find()
  }

  async one(request: Request) {
    return this.userRepository.findOne({ where: { id: request.params.id } })
  }

  async save(request: Request) {
    const hashData = generate(request.body.password)
    request.body.password = hashData[0]
    request.body.salt = hashData[1]

    // 初期登録の場合
    if (request.body.id === 0) {
      delete request.body.id
    }
    return this.userRepository.save(request.body)
  }

  async remove(request: Request) {
    const userToRemove = await this.userRepository.findOneBy({
      id: request.params.id,
    })
    await this.userRepository.remove(userToRemove)
    return 'OK'
  }

  async checkUser(request: Request) {
    const user = await this.userRepository.findOne({
      where: { name: request.body.name },
    })
    if (user) {
      return user.id.toString()
    }
    return '0'
  }

  async existUser(request: Request) {
    const user = await this.userRepository.findOne({
      where: { name: request.body.name },
    })
    return user ? true : false
  }

  async login(request: Request) {
    const user = await this.userRepository.findOne({
      where: { name: request.body.name },
    })
    if (user) {
      const hashPassword = generateBySalt(request.body.password, user.salt)
      return hashPassword === user.password ? true : false
    }
    return false
  }
}
