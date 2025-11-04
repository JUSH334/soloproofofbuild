const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("⚠️  WARNING: This will attempt to replace stuck transactions");
  console.log("Account:", deployer.address);
  
  const currentNonce = await hre.ethers.provider.getTransactionCount(deployer.address, "latest");
  const pendingNonce = await hre.ethers.provider.getTransactionCount(deployer.address, "pending");
  const stuckCount = pendingNonce - currentNonce;
  
  console.log("\nCurrent nonce:", currentNonce);
  console.log("Pending nonce:", pendingNonce);
  console.log("Stuck transactions:", stuckCount);
  
  if (stuckCount === 0) {
    console.log("\n✅ No stuck transactions!");
    return;
  }
  
  console.log("\n🔧 Strategy: Send replacement transaction with 10x gas");
  console.log("This will replace the stuck transaction at nonce", currentNonce);
  console.log("\nPress Ctrl+C to cancel, or wait 5 seconds to continue...");
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  console.log("\n📤 Sending replacement transaction...");
  
  try {
    // Get current gas price
    const feeData = await hre.ethers.provider.getFeeData();
    const currentGasPrice = feeData.gasPrice;
    
    // Use 10x gas price to prioritize
    const highGasPrice = currentGasPrice * 10n;
    
    console.log("Current gas price:", hre.ethers.formatUnits(currentGasPrice, "gwei"), "gwei");
    console.log("Using gas price:", hre.ethers.formatUnits(highGasPrice, "gwei"), "gwei");
    
    // Send a simple transaction to yourself with the stuck nonce
    const tx = await deployer.sendTransaction({
      to: deployer.address, // Send to self
      value: 0, // Zero value
      nonce: currentNonce, // Replace the stuck transaction
      gasPrice: highGasPrice,
      gasLimit: 21000 // Minimum gas for transfer
    });
    
    console.log("\n✓ Replacement transaction sent!");
    console.log("TX Hash:", tx.hash);
    console.log("Explorer:", `https://explorer.didlab.org/tx/${tx.hash}`);
    
    console.log("\nWaiting for confirmation...");
    const receipt = await tx.wait();
    
    console.log("✅ Cleared! Block:", receipt.blockNumber);
    console.log("\nYou cleared 1 stuck transaction.");
    console.log("You still have", stuckCount - 1, "more pending.");
    console.log("\nRun this script again to clear the next one.");
    console.log("Or just wait - they will eventually process.");
    
  } catch (error) {
    console.error("\n❌ Failed:", error.message);
    
    if (error.message.includes("replacement transaction underpriced")) {
      console.log("\n💡 Try increasing the gas multiplier in the script");
    }
  }
}

main().catch(console.error);