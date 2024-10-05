#!/bin/bash

# Launch TixHub

# Launch Front-end
echo "Launching Front-end..."
cd frontend
npm run dev &
cd src/app/admin
node server.js &

# Launch Back-end
echo "Launching Back-end..."
cd ../../../..
cd contract
npm hardhat clean
npm hardhat compile
npm hardhat node &
npx hardhat ignition deploy ignition/modules/Occasion.js --network localhost

echo "TixHub launched successfully!"
