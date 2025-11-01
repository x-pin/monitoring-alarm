const path = require('path')
const fs = require('fs')
const packageJson = require('../package')
module.exports = {
  name: packageJson.name,
  rootDir: path.join(__dirname, '../'),
  /**
   * OP 账号本币与token 监控值班群（双链）
   */
  alarmBalanceGroup: {
    // 群机器人webHook
    robotUrl: 'https://open.larksuite.com/open-apis/bot/v2/hook/1e3af47e-6ffe-4f57-a866-08bc765b4518',
    // 钱包地址
    walletAddress: '0x982AE9c4F166646B0896F25357C26b9F013F1b99',
    // bsc链信息配置
    bscConfig: {
      chainName: 'b s c',
      tokenAddress: '0xD955c9bA56Fb1AB30e34766e252A97ccCE3D31A6',
      rpcProviders: [
        'https://bnb.rpc.subquery.network/public'
      ]
    },
    // loTex信息配置
    loTexConfig: {
      chainName: 'loTex',
      tokenAddress: '0x7a275c27da6e2ff68742b5d17d11edab407f9327',
      rpcProviders: [
        'https://babel-api.fastblocks.io'
      ]
    },
  },
  mysql: {
    host: '106.14.13.242',
    port: 3306,
    user: 'root',
    password: 'Yxf@wn775210end',
    database: 'kapok', // 一般root才有访问此数据库权限
    pool: 100,
    timeout: 60000,
    charset: 'utf8mb4',
    supportBigNumbers: true,
    bigNumberStrings: true,
    multipleStatements: true,
    connectionLimit: 100,
    /*
    crudExtend: {
      // 打开后 db['tablename'].ex扩展方法
    },
    */
    showSql: true // 使用BaseModel的才有效，打印sql
  },
  mysqlSkybaseTest: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'skybase-test', // 一般root才有访问此数据库权限
    pool: 1000,
    timeout: 60000,
    charset: 'utf8mb4',
    multipleStatements: true,
    connectionLimit: 10,
    showSql: true // 使用BaseModel的才有效，打印sql
  },
  redis: {
    host: '106.14.117.241',
    port: 6389,
    auth: 'DD@dd775210allDay',
    db: 1
  },

  redisMain: {
    host: 'localhost',
    port: 6379,
    auth: '',
    db: 2
  },

  rabbitMQ: {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    username: 'user',
    password: 'user',
    vhost: ''
  },

  kafka: {
    host: '10.0.2.31:9092,172.16.64.35:9092',
    topic: 'appRequest'
  },

  middleware: {
    limit: {
      // 接口锁是否使用redis锁
      // useRedisLock: true,
      code: 666, // 可以指定同一时间多次调用时返回的内容
      msg: '前面有人在执行哦~~'
    }
  },

  // 重定向配置，逻辑放在中间件 sky-check-param 内，所以必须要使用该中间件，此功能才生效
  redirect: {
    '/skyapi/redirect/original': '/skyapi/redirect/to'
  },

  middlewares: [
    // 自己实现的middle 不能以 sky- 开头
    'sky-cors',
    'sky-body-parse',
    'sky-static-server',
    'sky-check-param',
    // 'sky-check-token',
    // 'sample-middleware', //自定义例子打开
    'sky-output',
    'limit',
    'sky-api-register'
  ]
}
