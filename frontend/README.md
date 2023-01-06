<h1 align="center">Welcome to vue-portal 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/vue-portal" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/vue-portal.svg">
  </a>
  <a href="https://twitter.com/中西直樹" target="_blank">
    <img alt="Twitter: 中西直樹" src="https://img.shields.io/twitter/follow/中西直樹.svg?style=social" />
  </a>
</p>

> portal site for Nuxt 2

### ✨ [Demo](http://demo.com)

## Install


```sh
# Go into the frontend project
$ cd frontend

# Install dependencies
$ npm ci
```

## Usage
To start this application, run below command line.
```sh
# Go into the frontend project
$ cd frontend

# Install dependencies
$ npm run start:all
```
You can access http://localhost:3030 to use this application.

## Run unit tests
### Frontend
To run tests of frontend project, run below command line.
```sh
# Go into the frontend project
$ cd frontend

# Run all tests
$ npm run test:all
```
You can also run each test file.

Edit config:path in frontend/package.json.
```sh
{
  "config": {
    "path": "./src/test/pages/login.spec.ts",
  }
}
```
Then run below command line.
```sh
# Go into the frontend project
$ cd frontend

# Run test file defined frontend/package.json
$ npm run test
```


To run tests of backend project, run below command line.
```sh
# Go into the backend project
$ cd backend

# Run all tests
$ npm run test:all
```
You can also run each test file.

Edit config:path in backend/package.json.
```sh
{
  "config": {
    "path": "./src/test/controller/LoginController.spec.ts",
  }
}
```
Then run below command line.
```sh
# Go into the backend project
$ cd backend

# Run test file defined backend/package.json
$ npm run test
```

## Author

👤 **Naoki Nakanishi**

* Website: https://n-laboratory.jp/nlab/
* Twitter: [@中西直樹](https://twitter.com/中西直樹)
* Github: [@NAOKI-NAKANISHI](https://github.com/NAOKI-NAKANISHI)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_