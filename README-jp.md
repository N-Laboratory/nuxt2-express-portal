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
  <a href="https://twitter.com/NL4boratory" target="_blank">
    <img alt="Twitter: N-LAB" src="https://img.shields.io/twitter/follow/NL4boratory.svg?style=social" />
  </a>
  <a href="https://github.com/N-Laboratory" target="_blank">
    <img src="https://img.shields.io/badge/-FollowMyAccount-grey.svg?logo=github&style=flat">
  </a>
</p>

Nuxt2の学習用として本プロジェクトを作成しました。
このプロジェクトでは以下の機能を実装しています。
* アカウント作成
* アカウントパスワードの変更
* ログイン
* アカウント情報の表示

このプロジェクトはフロントエンドとバックエンドの2つのプロジェクトで構成されています。
```sh
project_root
├── frontend (Nuxt2)
└── backend (Express)
```
フロントエンドプロジェクトはNuxt2を利用して作成しています。
以下のライブラリを利用しています。
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

バックエンドプロジェクトはExpressを利用して作成しています。
以下のライブラリを利用しています。
* TypeScript
* CryptoJS
* Helmet
* TypeORM
* Jest
* SonarQube
* JSONWebToken

## 目次

1. [前提条件](#前提条件)
1. [デモ](#デモ)
1. [インストール方法](#インストール方法)
1. [使い方](#使い方)
1. [ユニットテストの実行](#ユニットテストの実行)
1. [E2Eテストの実行](#E2Eテストの実行)
1. [プロジェクトの解析](#プロジェクトの解析)
1. [ライセンス](#ライセンス)
1. [Author](#author)

## 前提条件
ローカルのパソコンに以下がインストール済みであることが前提:
* Git
* Node.js -v18ではなくv16.x系をインストールしてください。npm package managerもインストールする必要があります。

## デモ
* アカウント作成
<img src="https://user-images.githubusercontent.com/42198184/211146473-c1eb0d04-f2bb-4c88-a2fd-cf8a8e2cec79.gif" style="width:70%;">

* アカウントパスワードの変更
<img src="https://user-images.githubusercontent.com/42198184/211146470-02c2f366-da47-46cf-a9c9-7a1d6c64802d.gif" style="width:70%;">

* ログインとアカウント情報の表示
<img src="https://user-images.githubusercontent.com/42198184/211146469-dec581c3-9357-4851-8140-082408c80d8d.gif" style="width:70%;">


## インストール方法

### ・ フロントエンド
```sh
# フロントエンドプロジェクトへ移動
$ cd frontend

# パッケージのインストール
$ npm install
```

### ・ バックエンド
```sh
# バックエンドプロジェクトへ移動
$ cd backend

# パッケージのインストール
$ npm install
```

## 使い方
アプリケーションを起動するには以下を実施します。
```sh
# フロントエンドプロジェクトへ移動
$ cd frontend

# アプリケーションの起動
$ npm run start:all
```

以下のURLでアプリケーションの動作確認ができます。
* http://localhost:3030

## ユニットテストの実行
### ・ フロントエンド
フロントエンドのユニットテストを実行するには以下を実施します。
```sh
# フロントエンドプロジェクトへ移動
$ cd frontend

# すべてのテストファイルのテスト実施
$ npm run test:all
```
テストファイルごとにテストを実施することもできます。

以下のファイルのconfigのpathに任意のテストファイルを設定します。
* frontend/package.json
```sh
{
  "config": {
    "path": "./src/test/pages/login.spec.ts",
  }
}
```
上記を設定後に以下を実施します。
```sh
# フロントエンドプロジェクトへ移動
$ cd frontend

# frontend/package.jsonのconfigのpathに設定されたテストファイルのテストを実施
$ npm run test

# Windowsを利用している場合は上記のコマンドの代わりに以下のコマンドを実行してください
$ npm run test:win
```

### ・ バックエンド

バックエンドのユニットテストを実行するには以下を実施します。
```sh
# バックエンドプロジェクトへ移動
$ cd backend

# すべてのテストファイルのテスト実施
$ npm run test:all
```
テストファイルごとにテストを実施することもできます。

以下のファイルのconfigのpathに任意のテストファイルを設定します。
* backend/package.json
```sh
{
  "config": {
    "path": "./src/test/controller/LoginController.spec.ts",
  }
}
```
上記を設定後に以下を実施します。
```sh
# バックエンドプロジェクトへ移動
$ cd backend

# backend/package.jsonのconfigのpathに設定されたテストファイルのテストを実施
$ npm run test

# Windowsを利用している場合は上記のコマンドの代わりに以下のコマンドを実行してください
$ npm run test:win
```


## E2Eテストの実行
各ページをjest-puppeteerを使ってテストすることができます。

以下のファイルのconfigのe2eに任意のテストファイルを設定します。
* frontend/package.json
```sh
{
  "config": {
    "e2e": "./e2e/e2e-test/login.spec.ts",
  }
}
```
上記を設定後に以下を実施します。
```sh
# フロントエンドプロジェクトへ移動
$ cd frontend

# frontend/package.jsonのconfigのe2eに設定されたテストファイルのテストを実施
$ npm run test:e2e

# Windowsを利用している場合は上記のコマンドの代わりに以下のコマンドを実行してください
$ npm run test:e2e-win
```

## プロジェクトの解析
SonarQubeを利用してプロジェクトの静的解析を行うことができます。
事前にSonarQubeをインストールしておく必要があります。

### ・ フロントエンド
SonarQubeのインストール後に、SonarQube上でプロジェクトを作成してプロジェクトトークンを生成します。
プロジェクトの作成時に、project display nameとproject keyには以下の名前を設定する必要があります。
```sh
portal-frontend
```

以下のファイルのconfigのtokenに生成したプロジェクトトークンを設定します。
* frontend/package.json.
```sh
{
  "config": {
    "token": "sqp_XXXXXXXXX",
  }
}
```
上記を設定後に以下を実施します。
```sh
# フロントエンドプロジェクトへ移動
$ cd frontend

# ユニットテストを全件実行
$ npm run test:all

# SonarQubeの解析実行
$ npm run sonar

# Windowsを利用している場合は上記のコマンドの代わりに以下のコマンドを実行してください
$ npm run sonar:win
```
以下のURLより解析結果を確認することができます。
* http://localhost:9000/dashboard?id=portal-frontend


### ・ バックエンド
SonarQubeのインストール後に、SonarQube上でプロジェクトを作成してプロジェクトトークンを生成します。
プロジェクトの作成時に、project display nameとproject keyには以下の名前を設定する必要があります。
```sh
portal-backend
```

以下のファイルのconfigのtokenに生成したプロジェクトトークンを設定します。
* backend/package.json.
```sh
{
  "config": {
    "token": "sqp_XXXXXXXXX",
  }
}
```
上記を設定後に以下を実施します。
```sh
# バックエンドプロジェクトへ移動
$ cd backend

# ユニットテストを全件実行
$ npm run test:all

# SonarQubeの解析実行
$ npm run sonar

# Windowsを利用している場合は上記のコマンドの代わりに以下のコマンドを実行してください
$ npm run sonar:win
```
以下のURLより解析結果を確認することができます。
* http://localhost:9000/dashboard?id=portal-backend

## ライセンス
[MIT](LICENSE.md)

## Author

👤 **Naoki Nakanishi**

* Website: https://n-laboratory.jp/nlab/
* Twitter: [@N-LAB](https://twitter.com/NL4boratory)