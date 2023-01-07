import express, { Request, Response, json } from 'express'
import { AppDataSource } from './data-source'
import { Routes } from './routes'
import { generateHashAndSalt } from './utils/HashGenerator'
import { User } from './entity/User'
import helmet from 'helmet'

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express()
    app.use(json())
    app.use(helmet())

    const allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, access_token'
      )

      // intercept OPTIONS method
      if ('OPTIONS' === req.method) {
        res.sendStatus(200)
      } else {
        next()
      }
    }
    app.use(allowCrossDomain)

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

    // start express server
    app.listen(3000)

    const hashData = generateHashAndSalt('password')
    // insert new users for test
    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        name: 'admin',
        password: hashData[0],
        salt: hashData[1],
      })
    )

    console.log(
      'Express server has started on port 3000. Open http://localhost:3000/users to see results'
    )
  })
  .catch((error) => console.log(error))
