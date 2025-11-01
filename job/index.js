const schedule = require('node-schedule');
const opBanceMonitoring = require('./opBalanceMonitoring');

// 每小时的0分、10分、20分、30分、40分、50分执行任务
const job = schedule.scheduleJob('*/2 * * * *', opBanceMonitoring);