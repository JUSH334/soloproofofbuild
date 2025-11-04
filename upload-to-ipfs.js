const fs = require("fs");
const https = require("https");
const FormData = require("form-data");

const ADDR = "0xFB3C61Dcc2dF6800C62E7ba2bcA5e9dd7d42f2F7";
const REPO_URL = "https://github.com/YOUR_USERNAME/soloproofofbuild"; // Update this!

async function uploadFile(jwt, filePath) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    
    const options = {
      hostname: "api.didlab.org",
      path: "/v1/ipfs/upload",
      method: "POST",
      headers: {
        ...form.getHeaders(),
        "Authorization": `Bearer ${jwt}`,
      },
    };
    
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error("Failed to parse response: " + body));
        }
      });
    });
    
    req.on("error", reject);
    form.pipe(req);
  });
}

async function main() {
  console.log("\n📤 Uploading to IPFS...\n");
  
  if (!fs.existsSync("jwt-token.txt")) {
    console.error("❌ JWT token not found! Run: node auth-siwe.js first");
    process.exit(1);
  }
  
  const jwt = fs.readFileSync("jwt-token.txt", "utf8").trim();
  
  if (!fs.existsSync("assets/badge.png")) {
    console.error("❌ Badge image not found!");
    console.error("   Place your image at: assets/badge.png");
    process.exit(1);
  }
  
  console.log("📸 Uploading badge image...");
  const imageResult = await uploadFile(jwt, "assets/badge.png");
  const imageCID = imageResult.cid;
  console.log("✓ Image uploaded!");
  console.log("  CID:", imageCID);
  console.log("  URL: ipfs://" + imageCID);
  
  console.log("\n📝 Creating metadata...");
  const metadata = {
    name: "DIDLab Hackathon Badge (Solo)",
    description: "70-minute solo proof-of-build",
    image: `ipfs://${imageCID}`,
    attributes: [
      { trait_type: "wallet", value: ADDR },
      { trait_type: "repo", value: REPO_URL },
    ],
  };
  
  fs.writeFileSync("metadata.json", JSON.stringify(metadata, null, 2));
  console.log("✓ Metadata created: metadata.json");
  
  console.log("\n📤 Uploading metadata...");
  const metadataResult = await uploadFile(jwt, "metadata.json");
  const metadataCID = metadataResult.cid;
  console.log("✓ Metadata uploaded!");
  console.log("  CID:", metadataCID);
  console.log("  URL: ipfs://" + metadataCID);
  
  const tokenURI = `ipfs://${metadataCID}`;
  fs.writeFileSync("token-uri.txt", tokenURI);
  
  console.log("\n✅ IPFS Upload Complete!");
  console.log("═══════════════════════════════════════════════════");
  console.log("Image CID:", imageCID);
  console.log("Metadata CID:", metadataCID);
  console.log("Token URI:", tokenURI);
  console.log("═══════════════════════════════════════════════════\n");
  console.log("Next: Mint the badge");
  console.log(`$env:TOKEN_URI="${tokenURI}"`);
  console.log("npx hardhat run scripts/mint.js --network didlab");
}

main().catch((error) => {
  console.error("\n❌ Upload failed:", error.message);
  process.exit(1);
});