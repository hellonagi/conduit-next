# Conduit API 提出課題

[RealWorld の バックエンドの API](https://realworld-docs.netlify.app/docs/specs/backend-specs/introduction) の仕様を満たす Rails API

2-4まで実装済

## 実装したエンドポイント

| NAME                         | PATH                                      |
| ---------------------------- | ----------------------------------------- |
| Authentication               | `POST /api/users/login`                   |
| Registration                 | `POST /api/users`                         |
| Get Current User             | `GET /api/user`                           |
| Update User                  | `PUT /api/user`                           |
| Get Profile                  | `GET /api/profiles/:username`             |
| Follow user                  | `POST /api/profiles/:username/follow`     |
| Unfollow user                | `DELETE /api/profiles/:username/follow`   |
| List Articles                | `GET /api/articles`                       |
| Get Article                  | `GET /api/articles/:slug`                 |
| Create Article               | `POST /api/articles`                      |
| Update Article               | `PUT /api/articles/:slug`                 |
| Delete Article               | `DELETE /api/articles/:slug`              |
| Add Comments to an Article   | `POST /api/articles/:slug/comments`       |
| Get Comments from an Article | `GET /api/articles/:slug/comments`        |
| Delete Comment               | `DELETE /api/articles/:slug/comments/:id` |
| Get Tags                     | `GET /api/tags`                           |

## APIテストの実行方法

```bash
rails server # Railsサーバー起動
cd api # ディレクトリ移動
APIURL=http://localhost:3000/api ./run-api-tests.sh # テスト実行
```
