import { UserController } from '../../controller/UserController'
import { AppDataSource } from '../../data-source'
import { User } from '../../entity/User'
import * as hg from '../../utils/HashGenerator'

jest
  .spyOn(hg, 'generateHashAndSalt')
  .mockImplementation(() => ['generatedHash', 'generatedSalt'])
const uc = new UserController()

const defaultUserAdmin: User = {
  id: 1,
  name: 'admin',
  password: 'adminpassword',
  salt: 'salt',
}

const defaultUserRoot: User = {
  id: 2,
  name: 'root',
  password: 'rootpassword',
  salt: 'salt',
}

const newUser: User = {
  id: 3,
  name: 'admin',
  password: 'generatedHash',
  salt: 'generatedSalt',
}

const updatedUser: User = {
  id: 2,
  name: 'updatedname',
  password: 'generatedHash',
  salt: 'generatedSalt',
}

const deletedUser: User = {
  id: undefined,
  name: 'root',
  password: 'rootpassword',
  salt: 'salt',
}

beforeEach(async () => {
  await AppDataSource.initialize()
  // create test user
  await AppDataSource.manager.save(
    AppDataSource.manager.create(User, {
      name: 'admin',
      password: 'adminpassword',
      salt: 'salt',
    })
  )
  await AppDataSource.manager.save(
    AppDataSource.manager.create(User, {
      name: 'root',
      password: 'rootpassword',
      salt: 'salt',
    })
  )
})

afterEach(async () => {
  await AppDataSource.dropDatabase()
  await AppDataSource.destroy()
})

describe('ユーザー情報のCRUD処理の動作確認', () => {
  describe('指定した条件でユーザーを取得できるかの確認', () => {
    test('存在するユーザーIDで絞り込んだ場合、該当ユーザーを取得できること', async () => {
      // Act
      const user = await uc.getUser('id', 2)

      // Assert
      expect(user).toMatchObject(defaultUserRoot)
    })

    test('存在しないユーザーIDで絞り込んだ場合、ユーザーを取得できないこと', async () => {
      // Act
      const user = await uc.getUser('id', 99)

      // Assert
      expect(user).toBeFalsy()
    })

    test('存在するユーザー名で絞り込んだ場合、該当ユーザーを取得できること', async () => {
      // Act
      const user = await uc.getUser('name', 'root')

      // Assert
      expect(user).toMatchObject(defaultUserRoot)
    })

    test('存在しないユーザー名で絞り込んだ場合、ユーザーを取得できないこと', async () => {
      // Act
      const user = await uc.getUser('name', 'unknownUser')

      // Assert
      expect(user).toBeFalsy()
    })
  })

  test('全てのユーザーを取得できること', async () => {
    // Act
    const users = await uc.all()

    // Assert
    expect(users[0]).toMatchObject(defaultUserAdmin)
    expect(users[1]).toMatchObject(defaultUserRoot)
  })

  test('idが一致するユーザーを取得できること', async () => {
    // Arrange
    const req = {
      params: {
        id: 2,
      },
    }

    // Act
    const user = await uc.one(req)

    // Assert
    expect(user).toMatchObject(defaultUserRoot)
  })

  test('ユーザーを新規登録できること', async () => {
    // Arrange
    const req = {
      body: {
        id: 0,
        name: 'admin',
        password: 'password',
      },
      params: {
        id: 3,
      },
    }

    // Act
    const result = await uc.save(req)
    const user = await uc.one(req)

    // Assert
    expect(result).toMatchObject(newUser)
    expect(user).toMatchObject(newUser)
  })

  test('ユーザーを更新できること', async () => {
    // Arrange
    const req = {
      body: {
        id: 2,
        name: 'updatedname',
        password: 'updatedpassword',
      },
      params: {
        id: 2,
      },
    }

    // Act
    const result = await uc.save(req)
    const user = await uc.one(req)

    // Assert
    expect(result).toMatchObject(updatedUser)
    expect(user).toMatchObject(updatedUser)
  })

  test('ユーザーを削除できること', async () => {
    // Arrange
    const req = {
      params: {
        id: 2,
      },
    }

    // Act
    const result = await uc.remove(req)
    const user = await uc.one(req)

    // Assert
    expect(result).toMatchObject(deletedUser)
    expect(user).toBeFalsy()
  })

  test('ユーザー名が一致するユーザーが存在する場合は該当のユーザーのIDを取得できること', async () => {
    // Arrange
    const req = {
      body: {
        name: 'root',
      },
    }

    // Act
    const userId = await uc.checkUser(req)

    // Assert
    expect(userId).toBe('2')
  })

  test('ユーザー名が一致するユーザーが存在しない場合は0が取得できること', async () => {
    // Arrange
    const req = {
      body: {
        name: 'testName',
      },
    }

    // Act
    const userId = await uc.checkUser(req)

    // Assert
    expect(userId).toBe('0')
  })

  test('ユーザー名が一致するユーザーが存在する場合はtrueが返却されること', async () => {
    // Arrange
    const req = {
      body: {
        name: 'root',
      },
    }

    // Act
    const result = await uc.existUser(req)

    // Assert
    expect(result).toBe(true)
  })

  test('ユーザー名が一致するユーザーが存在しない場合はfalseが返却されること', async () => {
    // Arrange
    const req = {
      body: {
        name: 'testName',
      },
    }

    // Act
    const result = await uc.existUser(req)

    // Assert
    expect(result).toBe(false)
  })
})
