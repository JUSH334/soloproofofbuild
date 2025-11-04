const hre = require("hardhat");

async function main() {
  const badgeAddress = process.env.BADGE_ADDRESS || "0x0f1303e4c74C9a15543E454c08754E410178986f";
  const tokenURI = process.env.TOKEN_URI;

  if (!tokenURI) {
    console.error("❌ TOKEN_URI not set!");
    console.log('Set it with: $env:TOKEN_URI="ipfs://..."');
    process.exit(1);
  }

  const [signer] = await hre.ethers.getSigners();
  console.log("\n🎨 Minting Badge NFT...\n");
  console.log("Minting to:", signer.address);
  console.log("Contract:", badgeAddress);
  console.log("Token URI:", tokenURI);

  const Badge = await hre.ethers.getContractAt("DidLabBadge", badgeAddress);
  
  console.log("\n📤 Sending mint transaction...");
  const tx = await Badge.mintTo(signer.address, tokenURI);
  
  console.log("✓ Transaction sent!");
  console.log("  TX Hash:", tx.hash);
  console.log("  Explorer:", `https://explorer.didlab.org/tx/${tx.hash}`);
  
  console.log("\n⏳ Waiting for confirmation...");
  const receipt = await tx.wait();
  
  console.log("✓ Transaction confirmed in block:", receipt.blockNumber);

  const tokenId = (await Badge.nextId()) - 1n;
  const mintedTokenURI = await Badge.tokenURI(tokenId);
  
  console.log("\n🎉 BADGE MINTED SUCCESSFULLY!");
  console.log("═══════════════════════════════════════════════════");
  console.log("Token ID:", tokenId.toString());
  console.log("Token URI:", mintedTokenURI);
  console.log("Mint TX Hash:", receipt.hash);
  console.log("Contract:", badgeAddress);
  console.log("═══════════════════════════════════════════════════\n");
  console.log("View your NFT:");
  console.log(`https://explorer.didlab.org/token/${badgeAddress}/instance/${tokenId}`);
  console.log("\nView metadata:");
  console.log(`https://ipfs.io/ipfs/QmSicWHrHvs33ybbUZS7H8hbTx4EEfSwhNGmyooJY2CCv2`);
}

main().catch((e) => {
  console.error("\n❌ Minting failed:", e.message);
  process.exit(1);
});