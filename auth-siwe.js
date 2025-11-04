const { Wallet } = require("ethers");
const fs = require("fs");
const https = require("https");

const ADDR = "0xFB3C61Dcc2dF6800C62E7ba2bcA5e9dd7d42f2F7";
const PRIVKEY = "0xcde553ec19806847ac8794493da93fb6549b937b815609c499a5faa6309a4cc8";

async function httpRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  console.log("\n🔐 Step 1: Getting SIWE challenge...");
  
  const prepareOptions = {
    hostname: "api.didlab.org",
    path: "/v1/siwe/prepare",
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  
  const prepareData = JSON.stringify({ address: ADDR });
  const prepareResponse = await httpRequest(prepareOptions, prepareData);
  const message = prepareResponse.message;
  
  console.log("✓ Challenge received");
  fs.writeFileSync("siwe.txt", message);
  
  console.log("\n✍️  Step 2: Signing message...");
  const wallet = new Wallet(PRIVKEY);
  const signature = await wallet.signMessage(message);
  console.log("✓ Message signed");
  
  console.log("\n🎫 Step 3: Getting JWT token...");
  const verifyOptions = {
    hostname: "api.didlab.org",
    path: "/v1/siwe/verify",
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  
  // Send both message and signature
  const verifyData = JSON.stringify({ 
    address: ADDR, 
    message: message,
    signature: signature 
  });
  const verifyResponse = await httpRequest(verifyOptions, verifyData);
  
  console.log("Response:", JSON.stringify(verifyResponse, null, 2));
  
  const jwt = verifyResponse.token;
  
  if (!jwt) {
    console.error("❌ Failed to get JWT token!");
    console.error("Response:", verifyResponse);
    process.exit(1);
  }
  
  console.log("✓ JWT token received");
  console.log("\n📝 JWT Token saved to jwt-token.txt");
  fs.writeFileSync("jwt-token.txt", jwt);
  
  console.log("\n✅ Authentication complete!");
  console.log("\nNext steps:");
  console.log("1. Make sure badge image is at: assets/badge.png");
  console.log("2. Run: node upload-to-ipfs.js");
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});