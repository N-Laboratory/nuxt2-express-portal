/* eslint-disable require-await */
import { Request } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import { generate } from '../utils/HashGenerator'

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
    return this.userRepository.save(request.body)
  }

  async remove(request: Request) {
    const userToRemove = await this.userRepository.findOneBy({
      id: request.params.id,
    })
    await this.userRepository.remove(userToRemove)
    return 'OK'
  }
}
