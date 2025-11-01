// 示例使用 QuickNode Token API 和 ethers.js
// import { ethers } from "ethers";
const { ethers } = require("ethers");

// ERC-20 代币标准 ABI（只需要 balanceOf 和 decimals 方法）
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];
