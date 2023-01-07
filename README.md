<h1 align="center">Portal Site For Nuxt2 Study</h1>
<p align="center">
  <img src="https://img.shields.io/badge/-Typescript-00bfff.svg?logo=typescript&style=flat">
  <img src="https://img.shields.io/badge/-Nuxt.js-008000.svg?logo=nuxt.js&style=flat">
  <img src="https://img.shields.io/badge/-Node.js-lightyellow.svg?logo=node.js&style=flat">
  <img src="https://img.shields.io/badge/-FontAwesome-ffff00.svg?logo=fontawesome&style=flat">
  <img src="https://img.shields.io/badge/-JWT-black.svg?logo=jsonwebtokens&style=flat">
  <img src="https://img.shields.io/badge/-Bulma-white.svg?logo=bulma&style=flat">
  <img src="https://img.shields.io/badge/-Express-1572B6.svg?logo=express&style=flat">
  <img src="https://img.shields.io/badge/-Jest-C21325.svg?logo=jest&style=flat">
  <img src="https://img.shields.io/badge/-SonarQube-white.svg?logo=sonarqube&style=flat">
  <img src="https://img.shields.io/badge/-Windows-0078D6.svg?logo=windows&style=flat">
  <img src="https://img.shields.io/badge/-Mac-grey.svg?logo=macos&style=flat">
  <img src="https://img.shields.io/badge/-Linux-black.svg?logo=linux&style=flat">
  <img src="https://img.shields.io/badge/-VSCode-007ACC.svg?logo=visualstudiocode&style=flat">
  <img src="https://img.shields.io/badge/license-MIT-green">
  <a href="https://twitter.com/NaokiNakanishi" target="_blank">
    <img alt="Twitter: NaokiNakanishi" src="https://img.shields.io/twitter/follow/NaokiNakanishi.svg?style=social" />
  </a>
</p>

I created this project for a nuxt learning purpose.
You can do the following in this application.
* Create account
* Change account password
* Login with account created this application
* Show account info

This project consists of frontend project + backend project.
```sh
project_root
├── frontend (Nuxt2)
└── backend (Express)
```
Frontend project is created by Nuxt2.
This project use following.
* TypeScript
* Nuxt/auth
* Nuxt/axios
* Font Awesome
* Bulma CSS
* Vee-Validate
* SweetAlert2
* Jest
* Jest Puppeteer
* SonarQube


Backend project is created by Express.
This project use following.
* TypeScript
* CryptoJS
* Helmet
* TypeORM
* Jest
* SonarQube
* JSONWebToken

## Contents

1. [Prerequisites](#prerequisites)
1. [Demo](#demo)
1. [Install](#install)
1. [Usage](#usage)
1. [Run unit tests](#run-unit-tests)
1. [Run e2e tests](#run-e2e-tests)
1. [Analyze project](#analyze-project)
1. [License](#license)
1. [Author](#author)

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - Download & Install Git. OSX and Linux machines typically have this already installed.
* Node.js - Download & Install Node.js (Install v16.x, do not install v18) and the npm package manager.

## Demo

## Install

### ・ Frontend
```sh
# Go into the frontend project
$ cd frontend

# Install dependencies
$ npm install
```

### ・ Backend
```sh
# Go into the backend project
$ cd backend

# Install dependencies
$ npm install
```

## Usage
To start this application, run below command line.
```sh
# Go into the frontend project
$ cd frontend

# Start application
$ npm run start:all
```
You can access http://localhost:3030 to use this application.

## Run unit tests
### ・ Frontend
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

# Run test file defined config:path in frontend/package.json
$ npm run test

# If you use Windows, run below command instead of above command
$ npm run test:win
```

### ・ Backend

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

# Run test file defined config:path in backend/package.json
$ npm run test

# If you use Windows, run below command instead of above command
$ npm run test:win
```


## Run e2e tests
You can test each page by jest-puppeteer.

Edit config:e2e in frontend/package.json.
```sh
{
  "config": {
    "e2e": "./e2e/e2e-test/login.spec.ts",
  }
}
```
Then run below command line.
```sh
# Go into the frontend project
$ cd frontend

# Run e2e test file defined config:e2e in frontend/package.json
$ npm run test:e2e

# If you use Windows, run below command instead of above command
$ npm run test:e2e-win
```

## Analyze project
You can analyze project by SonarQube.
To do this, you have to install SonarQube in advance.

### ・ Frontend
After installing SonarQube, create project and generate project token.
Project display name and project key must set up with the following name when you create project.
```sh
portal-frontend
```

Paste project token to config:token in frontend/package.json.
```sh
{
  "config": {
    "token": "sqp_XXXXXXXXX",
  }
}
```
Then run below command line.
```sh
# Go into the frontend project
$ cd frontend

# Run all tests
$ npm run test:all

# Run SonarQube
$ npm run sonar

# If you use Windows, run below command instead of above command
$ npm run sonar:win
```
You can access http://localhost:9000/dashboard?id=portal-frontend to show result.



### ・ Backend
After installing SonarQube, create project and generate project token.
Project display name and project key must set up with the following name when you create project.
```sh
portal-backend
```

Paste project token to config:token in backend/package.json.
```sh
{
  "config": {
    "token": "sqp_XXXXXXXXX",
  }
}
```
Then run below command line.
```sh
# Go into the backend project
$ cd backend

# Run all tests
$ npm run test:all

# Run SonarQube
$ npm run sonar

# If you use Windows, run below command instead of above command
$ npm run sonar:win
```
You can access http://localhost:9000/dashboard?id=portal-backend to show result.

## License
[MIT](LICENSE.md)

## Author

👤 **Naoki Nakanishi**

* Website: https://n-laboratory.jp/nlab/
* Twitter: [@中西直樹](https://twitter.com/NaokiNakanishi)