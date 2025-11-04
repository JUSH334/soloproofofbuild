const hre = require("hardhat");

async function main() {
  const txHash = "0xc1da9fe31467a21e05697d126ce0dc2be4074855aa67cc555bbdec821f6fa6d8";
  
  console.log("Checking mint transaction:", txHash);
  console.log("Explorer:", `https://explorer.didlab.org/tx/${txHash}\n`);
  
  const receipt = await hre.ethers.provider.getTransactionReceipt(txHash);
  
  if (receipt) {
    console.log("✅ Transaction CONFIRMED!");
    console.log("Block:", receipt.blockNumber);
    console.log("Status:", receipt.status === 1 ? "Success ✅" : "Failed ❌");
    console.log("Gas used:", receipt.gasUsed.toString());
    
    if (receipt.status === 1) {
      console.log("\n🎉 Badge minted successfully!");
      console.log("Token ID: 1");
      console.log("\nView your NFT:");
      console.log("https://explorer.didlab.org/token/0x0f1303e4c74C9a15543E454c08754E410178986f/instance/1");
      console.log("\nView metadata:");
      console.log("https://ipfs.io/ipfs/QmSicWHrHvs33ybbUZS7H8hbTx4EEfSwhNGmyooJY2CCv2");
    }
  } else {
    console.log("⏳ Still pending...");
    console.log("The DIDLab network is processing your transaction.");
    console.log("This can take several minutes.");
    console.log("\nRefresh the explorer page or run this script again in 1-2 minutes.");
  }
}

main().catch(console.error);