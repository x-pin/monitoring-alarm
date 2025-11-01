const { ethers } = require("ethers");

// BSC 主网 RPC 节点（可换成你自己的或官方的节点）
const BSC_RPC = "https://babel-api.fastblocks.io";

// 创建 provider 实例
const provider = new ethers.JsonRpcProvider(BSC_RPC);

// 目标账户地址
const address = "0x982AE9c4F166646B0896F25357C26b9F013F1b99";

async function getBnbBalance() {
  try {
    // 获取余额（单位为 wei）
    const balanceWei = await provider.getBalance(address);

    // 转换为 IOTX 单位
    const balanceBNB = ethers.formatEther(balanceWei);

    console.log(`账户余额：${balanceBNB} IOTX`);
  } catch (error) {
    console.error("获取余额失败:", error);
  }
}

getBnbBalance();
