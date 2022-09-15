import { UserController } from './controller/UserController'
import { LoginController } from './controller/LoginController'

export const Routes = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove',
  },
  {
    method: 'post',
    route: '/checkUser',
    controller: UserController,
    action: 'checkUser',
  },
  {
    method: 'post',
    route: '/existUser',
    controller: UserController,
    action: 'existUser',
  },
  {
    method: 'post',
    route: '/login',
    controller: UserController,
    action: 'login',
  },
  {
    method: 'post',
    route: '/auth/login',
    controller: LoginController,
    action: 'login',
  },
  {
    method: 'get',
    route: '/auth/user',
    controller: LoginController,
    action: 'user',
  },
]
