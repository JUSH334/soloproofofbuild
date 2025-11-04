const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const Badge = await hre.ethers.getContractFactory("DidLabBadge");
    const badge = await Badge.deploy(deployer.address);
    await badge.waitForDeployment();
    console.log("DidLabBadge:", await badge.getAddress());
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
