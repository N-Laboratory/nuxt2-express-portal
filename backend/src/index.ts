import express, { Request, Response, json } from 'express'
import { AppDataSource } from './data-source'
import { Routes } from './routes'
import { generate } from './utils/HashGenerator'
import { User } from './entity/User'

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express()
    app.use(json())

    // register express routes from defined application routes
    Routes.forEach((route) => {
      ;(app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          )
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            )
          } else if (result !== null && result !== undefined) {
            res.json(result)
          }
        }
      )
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    const hashData = generate('password')
    // insert new users for test
    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        name: 'Timber',
        password: hashData[0],
        salt: hashData[1],
      })
    )

    console.log(
      'Express server has started on port 3000. Open http://localhost:3000/users to see results'
    )
  })
  .catch((error) => console.log(error))
