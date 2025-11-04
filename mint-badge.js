const hre = require("hardhat");

async function main() {
    const contractAddress = "0x9142C203B35443446D9167837788Aaf8F2929982";
    const [deployer] = await hre.ethers.getSigners();
    
    console.log("Minting badge from:", deployer.address);
    console.log("Contract:", contractAddress);
    
    const Badge = await hre.ethers.getContractFactory("DidLabBadge");
    const badge = Badge.attach(contractAddress);
    
    // Mint to yourself as a test
    const recipient = deployer.address;
    const tokenURI = "https://example.com/metadata/1.json"; // Replace with your actual metadata URI
    
    console.log("\nMinting to:", recipient);
    console.log("Token URI:", tokenURI);
    
    const tx = await badge.mintTo(recipient, tokenURI);
    console.log("\n✅ Transaction sent:", tx.hash);
    console.log("Explorer:", `https://explorer.didlab.org/tx/${tx.hash}`);
    
    console.log("\nWaiting for confirmation...");
    const receipt = await tx.wait();
    
    console.log("✅ Badge minted successfully!");
    console.log("Token ID:", 1); // First token will be ID 1
    console.log("View NFT:", `https://explorer.didlab.org/token/${contractAddress}/instance/1`);
}

main().catch((e) => {
    console.error("\n❌ Error:", e.message);
    process.exit(1);
});