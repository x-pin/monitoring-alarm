// 示例使用 QuickNode Token API 和 ethers.js
// import { ethers } from "ethers";
const { ethers } = require("ethers");

// ERC-20 代币标准 ABI（只需要 balanceOf 和 decimals 方法）
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];
/**
 * 获取代币余额
 * @param {string} tokenContractAddress 代币合约地址
 * @param {string} walletAddress 钱包地址
 * @param {ethers.JsonRpcProvider} provider JsonRpcProvider 实例
 * @returns {Promise<{balance: string, formattedBalance: string, symbol: string, decimals: number}>} 代币余额详情
 */
async function getTokenBalance(tokenContractAddress, walletAddress, provider) {
  try {
    // 创建代币合约实例
    const tokenContract = new ethers.Contract(tokenContractAddress, ERC20_ABI, provider);
    
    // 并行获取余额和小数位
    const [balance, decimals, symbol] = await Promise.all([
      tokenContract.balanceOf(walletAddress),
      tokenContract.decimals(),
      tokenContract.symbol()
    ]);
    
    // 将余额转换为可读格式
    const formattedBalance = ethers.formatUnits(balance, decimals);
    return {
      balance: balance.toString(),
      formattedBalance,
      symbol,
      decimals
    };
  } catch (error) {
    console.error("查询代币余额失败:", error);
    throw error;
  }
}

// 使用示例
async function main() {
  const provider = new ethers.JsonRpcProvider("https://bnb.rpc.subquery.network/public");
  // 替换为实际的地址
  const tokenAddress = "0xD955c9bA56Fb1AB30e34766e252A97ccCE3D31A6"; // 代币合约地址
  // 钱包地址不变
  const walletAddress = "0x982AE9c4F166646B0896F25357C26b9F013F1b99";
  
  const tokenBalance = await getTokenBalance(tokenAddress, walletAddress, provider);
  console.log("代币余额详情:", tokenBalance);
}

main().catch(console.error);
