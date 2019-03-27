#!/bin/bash
echo "预发测试"
USER=root
HOST=47.92.172.97
DIR=/app/tc
echo ${USER}@${HOST}:${DIR}
rm -rf ./dist && npm run build && rsync -avz --delete dist/ ${USER}@${HOST}:${DIR}
echo "预发环境发布成功"
