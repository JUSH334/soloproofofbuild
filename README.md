# DIDLab Solo Hackathon - Proof of Build

## Project Overview
This project demonstrates a complete NFT minting system on the DIDLab blockchain, including smart contract deployment, IPFS integration, and NFT minting.

## Contract Details
- **Network**: DIDLab QBFT (Chain ID: 252501)
- **Contract Address**: `0x0f1303e4c74C9a15543E454c08754E410178986f`
- **Contract Name**: DidLabBadge (ERC-721)
- **Token Symbol**: DLHB
- **Deploy Transaction**: `0xb91790cbf06db021d00d05a8db91cfc631b6d6848f441692c01aa4c88990774e`
- **Deploy Block**: 1274988

[View Contract on Explorer](https://explorer.didlab.org/address/0x0f1303e4c74C9a15543E454c08754E410178986f)

## NFT Details
- **Token ID**: 1
- **Token URI**: `ipfs://QmSicWHrHvs33ybbUZS7H8hbTx4EEfSwhNGmyooJY2CCv2`
- **Mint Transaction**: `0xc1da9fe31467a21e05697d126ce0dc2be4074855aa67cc555bbdec821f6fa6d8`
- **Mint Block**: 1284202
- **Owner**: `0xFB3C61Dcc2dF6800C62E7ba2bcA5e9dd7d42f2F7`

[View Mint TX on Explorer](https://explorer.didlab.org/tx/0xc1da9fe31467a21e05697d126ce0dc2be4074855aa67cc555bbdec821f6fa6d8)

## IPFS Content
- **Metadata CID**: `QmSicWHrHvs33ybbUZS7H8hbTx4EEfSwhNGmyooJY2CCv2`
- **Image CID**: `QmewS57gkw1k7jjmucdkY1XDS8exBXQy8N4QtFszP6VFq7`

## Reflection

Successfully deployed an ERC-721 NFT smart contract on the DIDLab blockchain and minted a badge NFT with IPFS-hosted metadata. The main challenge was network congestion causing significantly delayed transaction confirmations (up to 1 hour). Learned the importance of implementing transaction monitoring tools and being patient with live blockchain networks. The project demonstrates end-to-end NFT creation including SIWE authentication, decentralized storage, and on-chain minting.