# DeFi Lending Web3 Starter

Three-layer educational/testnet DeFi lending dApp:
- Solidity + OpenZeppelin + Hardhat
- React + Vite + ethers.js
- Node.js + Express + PostgreSQL
- Base Sepolia support

## 1. Contracts
cd contracts
npm install
cp .env.example .env
# edit PRIVATE_KEY
npm run compile
npm test
npm run deploy:base

Copy the deployed TOKEN_ADDRESS and LENDING_POOL_ADDRESS.

## 2. PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql

CREATE DATABASE defi_lending;
CREATE USER defi_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE defi_lending TO defi_user;
\q

From backend directory:
sudo -u postgres psql defi_lending < schema.sql

## 3. Backend
cd backend
npm install
cp .env.example .env
# fill DB credentials and contract addresses
npm run dev

API: http://localhost:5000

## 4. Frontend
cd frontend
npm install
cp .env.example .env
# fill deployed contract addresses
npm run dev

Open the Vite URL, connect MetaMask on Base Sepolia, request test dUSD, deposit, borrow and repay.

## Security note
This is an educational starter and is not audited. Do not use real funds. Production lending needs audited contracts, oracle pricing, interest-rate accrual, liquidation, access control, stronger accounting, event indexing, and extensive tests.
