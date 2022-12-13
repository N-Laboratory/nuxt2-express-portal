import { UserController } from './controller/UserController'
import { LoginController } from './controller/LoginController'

export const Routes = [
  {
    method: 'get',
    route: '/api/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/users/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/users',
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/users/:id',
    controller: UserController,
    action: 'remove',
  },
  {
    method: 'post',
    route: '/api/checkUser',
    controller: UserController,
    action: 'checkUser',
  },
  {
    method: 'post',
    route: '/api/existUser',
    controller: UserController,
    action: 'existUser',
  },
  {
    method: 'post',
    route: '/api/login',
    controller: UserController,
    action: 'login',
  },
  {
    method: 'post',
    route: '/api/auth/login',
    controller: LoginController,
    action: 'login',
  },
  {
    method: 'get',
    route: '/api/auth/user',
    controller: LoginController,
    action: 'user',
  },
]
