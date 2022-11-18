import { LoginController } from './../../controller/LoginController'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '../../data-source'
import { User } from '../../entity/User'
import { generate } from '../../utils/HashGenerator'

const hashData = generate('password')
const lc = new LoginController()
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
  header: jest.fn().mockReturnThis(),
  sendStatus: jest.fn().mockReturnThis(),
}

beforeEach(async () => {
  jest.spyOn(jwt, 'sign').mockImplementation(() => 'TestToken')
  await AppDataSource.initialize()
  // create test user
  await AppDataSource.manager.save(
    AppDataSource.manager.create(User, {
      name: 'admin',
      password: hashData[0],
      salt: hashData[1],
    })
  )
})

afterEach(async () => {
  await AppDataSource.dropDatabase()
  await AppDataSource.destroy()
  jest.clearAllMocks()
})

describe('ログイン処理の動作確認', () => {
  test('ログインに成功した場合はjwtトークンが返却されること', async () => {
    // Arrange
    const req = {
      body: {
        name: 'admin',
        password: 'password',
      },
    }

    // Act
    await lc.login(req, res)

    // Assert
    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(res.send.mock.calls[0][0]).toMatch('{ "token": "TestToken" }')
  })

  test('データベースでエラーが発生した場合はエラーメッセージが返却されること', async () => {
    // Arrange
    const req = {
      body: {
        name: 'admin',
        password: 'password',
      },
    }
    await AppDataSource.dropDatabase()

    // Act
    await lc.login(req, res)

    // Assert
    expect(res.status.mock.calls[0][0]).toBe(401)
    expect(res.send.mock.calls[0][0]).toBe('{ "message": "login error" }')
  })

  test('ログインユーザーがデータベースに存在しない場合はエラーメッセージが返却されること', async () => {
    // Arrange
    const req = {
      body: {
        name: 'testname',
        password: 'password',
      },
    }

    // Act
    await lc.login(req, res)

    // Assert
    expect(res.status.mock.calls[0][0]).toBe(401)
    expect(res.send.mock.calls[0][0]).toBe('{ "message": "login error" }')
  })

  test('ログインユーザーのパスワードがデータベースに存在するログインユーザーと一致しない場合はエラーメッセージが返却されること', async () => {
    // Arrange
    const req = {
      body: {
        name: 'admin',
        password: 'admin',
      },
    }

    // Act
    await lc.login(req, res)

    // Assert
    expect(res.status.mock.calls[0][0]).toBe(401)
    expect(res.send.mock.calls[0][0]).toBe('{ "message": "login error" }')
  })
})

describe('ユーザー認証の動作確認', () => {
  test('jwtトークンが不正な場合はステータスコード403が返却されること', async () => {
    // Arrange
    const req = {
      headers: {
        authorization: 'Bearer hogetoken',
      },
    }

    // Act
    await lc.user(req, res)

    // Assert
    expect(res.sendStatus.mock.calls[0][0]).toBe(403)
  })

  test('jwtトークンが有効な場合は認証されたユーザー情報が返却されること', async () => {
    // Arrange
    jest.spyOn(jwt, 'sign').mockRestore()
    const loginReq = {
      body: {
        name: 'admin',
        password: 'password',
      },
    }
    await lc.login(loginReq, res)
    const token = JSON.parse(res.send.mock.calls[0][0]).token

    // Act
    res.status.mockClear()
    res.send.mockClear()
    const userReq = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    await lc.user(userReq, res)

    // Assert
    expect(res.status.mock.calls[0][0]).toBe(200)
  })
})
