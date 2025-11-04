const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const currentNonce = await hre.ethers.provider.getTransactionCount(deployer.address, "latest");
    const pendingNonce = await hre.ethers.provider.getTransactionCount(deployer.address, "pending");
    
    console.log("Current nonce:", currentNonce);
    console.log("Pending nonce:", pendingNonce);
    console.log("Stuck transactions:", pendingNonce - currentNonce);
    
    console.log("\nClearing stuck transaction at nonce", currentNonce);
    console.log("Sending replacement with higher gas...");
    
    const tx = await deployer.sendTransaction({
        to: deployer.address, // Send to self
        value: 0,
        nonce: currentNonce,
        gasPrice: ethers.parseUnits("10", "gwei"), // 10x higher gas
        gasLimit: 21000
    });
    
    console.log("Replacement tx:", tx.hash);
    console.log("Waiting for confirmation...");
    await tx.wait();
    console.log("✅ Cleared!");
    console.log("\nRun this script again to clear the next stuck transaction.");
}

main().catch(console.error);