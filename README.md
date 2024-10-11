# TIXHUB

### The problem Tixhub solves
1. Reduces the effects of scalpers.
2. Improves the lack of community engagement.
3. Helps organizers control ticket resales.
4. Prevents sybil attacks.

# TO LAUNCH TIXHUB

### Front-end: 	
1) cd frontend && npm run dev

### Back-end：
1) cd frontend/src/app/admin && node server.js

### Back-end contract: （ for testing contract purpose ）
1) cd contract && npm hardhat node
2) cd contract && npx hardhat ignition deploy ignition/modules/Occasion.js --network localhost
3) paste the contract id to frontend/src/component/contractAddress.ts


## CONTRACT INSTALLATION
```
npm install --save-dev hardhat @nomicfoundation/hardhat-web3-v4 web3@4
```

## FRONTEND INSTALLATION
```
npm install next react react-dom  next-transpile-modules webpack-bundle-analyzer gsap web3 @worldcoin/idkit
```
