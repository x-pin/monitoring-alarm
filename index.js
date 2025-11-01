const sky = require('skybase')
const config = require('./config')
const $ = require('meeko')
const SkyDB = require('j2sql2')

config.beforeMount = async () => {
  // 连接mysql
  const skyDB = new SkyDB({ mysql: config.mysql})
  const db = await skyDB.mysql // 创建mysql实例
  global.db = db
}

sky.start(config, async () => {
  console.log('启动成功')
})
