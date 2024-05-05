#!/usr/bin/env bash
set -x

# スクリプトが配置されているディレクトリのパスを取得
SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

# ファイルパスの変換
CONDUIT_COLLECTION_PATH=$(wslpath -w $SCRIPTDIR/Conduit.postman_collection.json)

# 環境変数の設定
APIURL=${APIURL:-https://api.realworld.io/api}
USERNAME=${USERNAME:-u`date +%s`}
EMAIL=${EMAIL:-$USERNAME@mail.com}
PASSWORD=${PASSWORD:-password}

# Newmanを使用してAPIテストを実行
npx newman run $CONDUIT_COLLECTION_PATH \
  --delay-request 500 \
  --global-var "APIURL=$APIURL" \
  --global-var "USERNAME=$USERNAME" \
  --global-var "EMAIL=$EMAIL" \
  --global-var "PASSWORD=$PASSWORD" \
  "$@"
