# 🎫 TIXHUB

# Overview
TixHub is a Web3 ticketing platform on Scroll, leveraging Worldcoin for proof of personhood to prevent scalping and fraud. It ensures fair ticket distribution by verifying unique users while preserving privacy.
Built on Ethereum Layer 2, TixHub offers low-cost, transparent, and secure ticketing with features like on-chain verification, decentralized event creation, and resale protections. By combining scalability, security, and decentralization, TixHub redefines event ticketing for a fairer, secure and seamless experience.

## 🤔 The Problems?
<img src="https://github.com/exellaz/tixhub/blob/main/frontend/public/pitch/2.png" width="640" height="420"/>

## ✍️ Main Idea
<img src="https://github.com/exellaz/tixhub/blob/main/frontend/public/pitch/3.png" width="640" height="420"/>

## Tech Stack
- **Blockchain**: Scroll (Ethereum L2 Solution)
- **Smart Contracts**: Solidity, Hardhat
- **Frontend**: Next.js, Web3.js
- **Identity Verification**: Worldcoin

# Installation
## Install Contract Dependencies
```
npm install --save-dev hardhat @nomicfoundation/hardhat-web3-v4 web3@4
```

## Install Frontend Dependencies
```bash
npm install next react react-dom  next-transpile-modules webpack-bundle-analyzer gsap web3 @worldcoin/idkit
```

### Frontend:
```bash
cd frontend && npm run dev
```

### Backend：
```bash
cd frontend/src/app/admin && node server.js
```

> [!Note]
> Backend contract
> 1) cd contract && npm hardhat node
> 2) cd contract && npx hardhat ignition deploy ignition/modules/Occasion.js --network localhost
> 3) paste the contract id to frontend/src/component/contractAddress.ts

# Usage
![Image](https://github.com/user-attachments/assets/014597ff-3337-4d99-b947-783082929365)
![Image](https://github.com/user-attachments/assets/bda75ddc-72cc-4f06-ace8-6f3aeca5eed0)
![Image](https://github.com/user-attachments/assets/de18d2ae-de16-4c91-a271-6a2fc019aedd)
![Image](https://github.com/user-attachments/assets/58d9baf5-08cc-497a-9192-1cdd77b3e427)
