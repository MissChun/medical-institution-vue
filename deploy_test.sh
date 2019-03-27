#!/bin/bash
echo "测试"
USER=root
HOST=47.92.172.97
DIR=/app/tc
echo ${USER}@${HOST}:${DIR}
rm -rf ./dist && npm run build && rsync -avz dist/* ${USER}@${HOST}:${DIR}/
echo "测试环境发布成功"
