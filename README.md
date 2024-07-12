# ETH-AVAX-PROOF-Intermediate-Module-2

## Setup Instructions

1. **Open in Gitpod**: Click on [Open in Gitpod](https://metacrafterc-scmstarter-ybypmhi93f4.ws-us115.gitpod.io/) to start the project in Gitpod.

2. **Install Prerequisites**: Make sure you have `hardhat` and `node` installed in your Gitpod environment.

3. **Open Terminals**:
   - Open three terminals in your Gitpod workspace.

## Terminal Commands

### Terminal 2: Start Hardhat Node
'''bash
This command starts a local Ethereum-like network using Hardhat.

### Terminal 3: Deploy Smart Contract
'''bash
npx hardhat run scripts/deploy.js --network localhost

### After deployment, note the contract address displayed (0x....45). Copy this address.

Update index.js
Paste the copied contract address into the contractAddress variable in index.js.

Run the Project
Terminal 1: Start Development Server
bash
Copy code
npm run dev
This command starts the project on port 3000.

Make Project Public
Ensure the project is set to be public in Gitpod to access it via port 3000.

Example Screenshot
![image](https://github.com/user-attachments/assets/bb906d6e-84e1-42ca-9e11-5b8ca0ee8970)
