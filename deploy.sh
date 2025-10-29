#!/bin/bash
echo "========== wealth-h5-nest 项目开始部署 ============"
cd /opt/wwwroot/wealth-h5-nest
# docker rm -f `docker ps -aq --filter name=wealth-h5-nest`
# docker build -t wealth-h5-nest .
# docker run -dt -p 9999:8080 --name wealth-h5-nest wealth-h5-nest
# rm -rf *

pm2 del nest-service
pm2 start ecosystem.config.js
echo "========== wealth-h5-nest 项目部署结束了 =========="