const hre = require("hardhat");

async function main() {
    const txHash = "0x6c14ee4fbc2c14f9238cb3dabaa56b69652a8a65fda834c73dda331a8e8d2715";
    
    console.log("Checking mint transaction...\n");
    
    const receipt = await hre.ethers.provider.getTransactionReceipt(txHash);
    
    if (receipt) {
        console.log("✅ Transaction confirmed!");
        console.log("Block:", receipt.blockNumber);
        console.log("Status:", receipt.status === 1 ? "Success ✅" : "Failed ❌");
        console.log("Gas used:", receipt.gasUsed.toString());
        
        if (receipt.status === 1) {
            console.log("\n🎉 Badge minted successfully!");
            console.log("Token ID: 1");
            console.log("View NFT:", "https://explorer.didlab.org/token/0x9142C203B35443446D9167837788Aaf8F2929982/instance/1");
        }
    } else {
        console.log("⏳ Still pending...");
        console.log("Check again in a minute or two.");
    }
}

main().catch(console.error);