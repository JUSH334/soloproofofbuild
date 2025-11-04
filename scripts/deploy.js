const hre = require("hardhat");

async function main() {
    console.log("Step 1: Getting signer...");
    const [deployer] = await hre.ethers.getSigners();
    console.log("✅ Deployer address:", deployer.address);
    
    console.log("\nStep 2: Checking balance...");
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("✅ Balance:", hre.ethers.formatEther(balance), "TT");
    
    console.log("\nStep 3: Getting contract factory...");
    const Badge = await hre.ethers.getContractFactory("DidLabBadge");
    console.log("✅ Contract factory created");
    
    console.log("\nStep 4: Deploying contract...");
    const badge = await Badge.deploy(deployer.address);
    console.log("✅ Deploy transaction sent");
    console.log("Transaction hash:", badge.deploymentTransaction().hash);
    console.log("Explorer:", `https://explorer.didlab.org/tx/${badge.deploymentTransaction().hash}`);
    
    console.log("\nStep 5: Waiting for confirmation (this may take several minutes)...");
    await badge.waitForDeployment(); // No timeout - wait as long as needed
    
    const address = await badge.getAddress();
    console.log("\n🎉 DidLabBadge deployed to:", address);
    console.log("View on explorer: https://explorer.didlab.org/address/" + address);
}

main().catch((e) => {
    console.error("\n❌ Error:", e.message);
    process.exit(1);
});