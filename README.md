# Conduit Next.js 提出課題

[RealWorld](https://realworld-docs.netlify.app/docs/specs/backend-specs/introduction) の仕様を満たすウェブアプリ

デプロイ先: 

## 作成したページ
- Home
- Create/Edit Article
- Article
- Authentication
- Profile
- Settings

## 実装した機能
- ユーザーの登録・編集・ログイン
- 記事の投稿・編集・削除
- 著者
- タグ付け機能
- 記事へのコメント投稿・削除


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
| Feed Articles                | `GET /api/articles/feed`                  |
| Get Article                  | `GET /api/articles/:slug`                 |
| Create Article               | `POST /api/articles`                      |
| Update Article               | `PUT /api/articles/:slug`                 |
| Delete Article               | `DELETE /api/articles/:slug`              |
| Add Comments to an Article   | `POST /api/articles/:slug/comments`       |
| Get Comments from an Article | `GET /api/articles/:slug/comments`        |
| Delete Comment               | `DELETE /api/articles/:slug/comments/:id` |
| Favorite Article             | `POST /api/articles/:slug/favorite`       |
| Unfavorite Article           | `DELETE /api/articles/:slug/favorite`     |
| Get Tags                     | `GET /api/tags`                           |

