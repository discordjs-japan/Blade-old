#!/bin/sh
type "node" >/dev/null 2>&1

if [ $? != 0 ]; then
  echo "Node.jsがインストールされていません。"
  echo "以下からNode.jsをダウンロードし、インストールしてください。"
  echo "https://nodejs.org/ja/"
  exit
fi

NODE=`node -v`
dpkg --compare-versions "8.0.0" "gt" ${NODE#v}
if [ $? -eq "0" ]; then
  echo "このボットの推奨バージョンはv8.0.0以降ですが、"
  echo "インストールされているnodeのバージョンは%NODE%です"
  echo "続行すると不具合が発生する可能性があります。"
  echo -n "続行しますか？ [y/N]"
  read ANSWER

  case $ANSWER in
    "Y" | "y") echo;;
    * ) exit;;
  esac
fi

node ./run.js
