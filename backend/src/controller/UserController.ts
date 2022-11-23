/* eslint-disable require-await */
import { Request } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import { generateHashAndSalt } from '../utils/HashGenerator'

export class UserController {
  private userRepository = AppDataSource.getRepository(User)

  async all() {
    return this.userRepository.find()
  }

  async one(request: Request) {
    return await this.getUser('id', request.params.id)
  }

  async save(request: Request) {
    const hashData = generateHashAndSalt(request.body.password)
    request.body.password = hashData[0]
    request.body.salt = hashData[1]

    // 初期登録の場合
    if (request.body.id === 0) {
      delete request.body.id
    }

    return this.userRepository.save(request.body)
  }

  async remove(request: Request) {
    const removeUser = await this.getUser('id', request.params.id)
    return await this.userRepository.remove(removeUser)
  }

  async checkUser(request: Request) {
    const user = await this.getUser('name', request.body.name)
    return user ? user.id.toString() : '0'
  }

  async existUser(request: Request) {
    const user = await this.getUser('name', request.body.name)
    return user ? true : false
  }

  getUser(columnName: string, data: any) {
    return this.userRepository.findOne({
      where: { [columnName]: data },
    })
  }
}
