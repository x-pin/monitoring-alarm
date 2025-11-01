const schedule = require('node-schedule');
const axios = require('axios');
const {alarmBalanceGroup} = require('../config')
const chainBalance = require("../lib/chainBalance");
const larkMsgTypes = require('../tool/larkMsgTypes');

/**
 * OP 账号本币与token 监控
 * 发送 larg 群消息
 * Unicode Emoji 官方网站: https://unicode.org/emoji/charts/，用于丰富表情
 * Hello 😊 这是一条带表情的消息 🚀 ❤️ 😋 ❤ 🍳 ❌ ❎ 💚 💯 🌹💩🏃‍♂️🐦‍🔥🦚🌲🌿📈📉
 * 飞书机器人接口: https://open.larksuite.com/document/client-docs/bot-v3/add-custom-bot#4996824a
 */
async function start_test() {
  const bscRes = await chainBalance.run(
    alarmBalanceGroup.bscConfig.chainName,
    alarmBalanceGroup.bscConfig.rpcProviders[0], 
    alarmBalanceGroup.walletAddress, 
    alarmBalanceGroup.bscConfig.tokenAddress
  )
  const loTexRes = await chainBalance.run(
    alarmBalanceGroup.loTexConfig.chainName,
    alarmBalanceGroup.loTexConfig.rpcProviders[0], 
    alarmBalanceGroup.walletAddress, 
    alarmBalanceGroup.loTexConfig.tokenAddress
  )
  
  try {
    const title = `💰钱包:${alarmBalanceGroup.walletAddress}`
    // ❌、✅、⚠
    const balanceBNBStatus = bscRes.balanceBNB < 5 ? '⚠' : '✅'
    const balanceBNBTokenStatus = bscRes.balanceToken < 2000000 ? '⚠' : '✅'
    const balanceLoTexStatus = bscRes.balanceBNB < 5000 ? '⚠' : '✅'
    const balanceLoTexTokenStatus = bscRes.balanceToken < 5000000 ? '⚠' : '✅'


    let message = `**${alarmBalanceGroup.bscConfig.chainName}链:**本币余额【${bscRes.balanceBNB.toLocaleString()}】${balanceBNBStatus},  Token 余额【${bscRes.balanceToken.toLocaleString()}】${balanceBNBTokenStatus}\n`
        message += `**${alarmBalanceGroup.loTexConfig.chainName}链:**本币余额【${loTexRes.balanceBNB.toLocaleString()}】${balanceLoTexStatus},  Token 余额【${loTexRes.balanceToken.toLocaleString()}】${balanceLoTexTokenStatus}`

    await axios.post(
      'https://open.larksuite.com/open-apis/bot/v2/hook/1e3af47e-6ffe-4f57-a866-08bc765b4518',
      larkMsgTypes.card1(title, message),
      { timeout: 5000 }
    );
  } catch (error) {
    // 404 等错误会进入这里
    console.log(error.response.status);
  }
}

start_test()
