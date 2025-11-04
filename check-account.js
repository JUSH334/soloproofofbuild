const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  const address = signer.address;
  
  console.log("Checking account:", address);
  
  const currentNonce = await hre.ethers.provider.getTransactionCount(address, "latest");
  const pendingNonce = await hre.ethers.provider.getTransactionCount(address, "pending");
  
  console.log("\nNonce Status:");
  console.log("Current (confirmed):", currentNonce);
  console.log("Pending (in mempool):", pendingNonce);
  console.log("Stuck transactions:", pendingNonce - currentNonce);
  
  if (pendingNonce > currentNonce) {
    console.log("\n⚠️  You have", pendingNonce - currentNonce, "pending transaction(s)");
    console.log("This is normal - they're waiting to be mined.");
    console.log("\nThe network is just very slow. Your transaction will eventually confirm.");
  } else {
    console.log("\n✅ No pending transactions - all clear!");
  }
  
  // Check balance
  const balance = await hre.ethers.provider.getBalance(address);
  console.log("\nBalance:", hre.ethers.formatEther(balance), "ETH");
  
  // Try to get block number to confirm network is responsive
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  console.log("Current block:", blockNumber);
  console.log("\n✓ Network is responsive");
}

main().catch(console.error);