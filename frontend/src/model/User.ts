export class User {
  id: number
  name: string
  password: string

  constructor(id: number, name: string, password: string) {
    this.id = id
    this.name = name
    this.password = password
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  getPassword() {
    return this.password
  }

  setId(id: number) {
    this.id = id
  }

  setName(name: string) {
    this.name = name
  }

  setPassword(password: string) {
    this.password = password
  }
}
