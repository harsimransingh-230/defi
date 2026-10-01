const { ethers } = require("ethers");
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://sepolia.base.org");
module.exports = { provider, getProvider: () => provider };
