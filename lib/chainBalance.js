const { ethers } = require("ethers");

// ERC-20 代币标准 ABI（只需要 balanceOf 和 decimals 方法）
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

/**
 * 获取链式上的钱包余额信息
 */
module.exports = {
  /**
   * 获取钱包余额
   * @param {jsonRpcProvider} jsonRpcProvider: 节点地址
   * @param {string} walletAddress 钱包地址
   */
  async getBnbBalance(jsonRpcProvider, walletAddress) {
    try {
      // 获取本地余额（单位为 wei）
      const balanceWei = await jsonRpcProvider.getBalance(walletAddress);
      // 转换为 BNB 单位
      const balanceBNB = ethers.formatEther(balanceWei);

      return { 
        balanceBNB
      }
    } catch (error) {
      console.error("获取余额失败:", error);
      throw error;
    }
  },
  /**
   * 获取代币余额
   * @param {*} provider 
   * @param {*} tokenAddress 
   * @param {*} walletAddress 
   */
  async getTokenBalance(jsonRpcProvider, walletAddress, tokenAddress) {
    try {
      // 创建代币合约实例
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, jsonRpcProvider);
      
      // 并行获取余额和小数位
      const [balance, decimals, symbol] = await Promise.all([
        tokenContract.balanceOf(walletAddress),
        tokenContract.decimals(),
        tokenContract.symbol()
      ]);
      
      // 将余额转换为可读格式
      const balanceToken = ethers.formatUnits(balance, decimals);

      return {
        balance: balance.toString(),
        balanceToken,
        symbol,
        decimals
      };
    } catch (error) {
      console.error("查询代币余额失败:", error);
      throw error;
    }
  },
  async run(chainName, rpcProviderUrl, walletAddress, tokenAddress) { 
    try {
      const jsonRpcProvider = new ethers.JsonRpcProvider(rpcProviderUrl);
      const { balanceBNB } = await this.getBnbBalance(jsonRpcProvider, walletAddress);
      const { balanceToken, symbol } = await this.getTokenBalance(jsonRpcProvider, walletAddress, tokenAddress);

      return {
        chainName,
        balanceBNB,
        symbol,
        balanceToken
      }
    } catch (error) {
      console.error("创建 JsonRpcProvider 失败:", error);
      throw error;
    }
  },
}
