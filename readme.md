# Backend with Fastify — Part 1 (Project setup with Typescript, Eslint, Husky, Prettier) の写経
https://medium.com/codingmountain-blog/backend-with-fastify-part-1-project-setup-with-typescript-eslint-husky-prettier-4a96aeab3b4d

## プロジェクトディレクトリ作成
```
$ mkdir fav-mov
$ cd fav-mov
```

## node.js プロジェクト初期化
```
$ npm init -y
```

## ライブラリの追加（fastify関連）
```
$ npm i @fastify/autoload @fastify/cors @fastify/env @fastify/jwt @fastify/sensible @fastify/swagger @fastify/type-provider-typebox fastify fastify-cli fastify-plugin
```

## ライブラリの追加（開発用）
```
$ npm i -D @types/node eslint-config-standard-with-typescript fastify-tsconfig rimraf tap tsx typescript ts-node prettier eslint-config-prettier lint-staged nodemon
```

## TypeScriptの設定
tsconfig.json を作成して記述
```
{
  "extends": "fastify-tsconfig",
  "compilerOptions": {
    "outDir": "dist",
    "declaration": false,
    "sourceMap": true
  },
  "include": ["src/**/*.ts"],
  "exclude": [".eslintrc.js"]
}
```

fastify-tsconfig の詳細は以下のリンクを参照
https://github.com/fastify/tsconfig


## EsLint と Prettierの設定
.eslintrc.js を作成して記述
```
module.exports = {
  extends: ['standard-with-typescript','prettier'],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
};
```

.prettierrc ファイルを作成して記述
```
{
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

## index.tsの作成
/src/index.ts の作成
```
console.log('Hello!!')
```

## package.js の設定
scripts に追記する
```
{
  scripts: {
    "build": "rimraf dist && tsc",
    "dev": "nodemon src/index.ts",
    "start": "node dist/index.ts"
  }
}
```

## いったん実行してみる 
```
npm run dev
⇒ アプリケーションを開発モードで実行し、変更を監視します

npm run build
⇒ TypeScriptをコンパイルし、運用ビルドを作成します

npm run star
⇒ 実稼働ビルドを開始します
```

## Huskyのセットアップ 
まずはブランチの作成
```
$ git init --initial-branch=main
```

Huskyを開発用に追加(v9からコマンドが変わった)
https://zenn.dev/otomoti_27/articles/692e1308ce849b
```
$ npm i -D husky
```

package.json に設定を追加して実行
```
$ npx husky init
```

コミット前処理の追加
```
$ echo "yarn lint-staged" > .husky/pre-commit
```

## エンドポイントの追加
```
GET /movies
POST /movies
GET /movies/:movieGenre
```

起動してGETの確認
```
$ npm run dev
別のターミナルから
$ curl http://localhost:8081/movies
```

POSTの確認
```
$ curl --location 'http://localhost:8081/movies' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Pulp fiction",
    "description": "A must watch movie!",
    "genre": "action"
}'
```

短縮法で記述した GET にアクセス
```
$  curl http://localhost:8081/movies/1
```

## DBのセットアップ前にライブラリの追加
```
$ npm i knex pg dotenv
```

## knexの設定
```
$ npm i knex pg dotenv
```

knexfile.ts ファイルに設定
.eslintignore ファイルに設定
package.json にscriptの追加

テーブルの追加
```
$ npm run merge:make add_users_table
```

.envに設定
```
DATABASE_URL=postgres://postgres@localhost/fav_mov
```

postgreSQLに「fav_mov」というデータベースを作成
```
CREATE DATABASE fav_mov;
```

migrate実行
```
npm run migrate:latest
```

## 
```
```
