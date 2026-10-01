import { ethers } from "ethers"; import { TOKEN_ABI } from "../abi/tokenAbi"; import { LENDING_POOL_ABI } from "../abi/lendingPoolAbi";
export const TOKEN_ADDRESS=import.meta.env.VITE_TOKEN_ADDRESS; export const POOL_ADDRESS=import.meta.env.VITE_LENDING_POOL_ADDRESS;
export async function getProvider(){if(!window.ethereum)throw new Error("MetaMask not installed");return new ethers.BrowserProvider(window.ethereum)}
export async function getSigner(){return (await getProvider()).getSigner()}
export async function getToken(x){return new ethers.Contract(TOKEN_ADDRESS,TOKEN_ABI,x)} export async function getPool(x){return new ethers.Contract(POOL_ADDRESS,LENDING_POOL_ABI,x)}
export async function connectWallet(){if(!window.ethereum)throw new Error("Please install MetaMask");const a=await window.ethereum.request({method:"eth_requestAccounts"});return a[0]}
export async function getUserData(address){const p=await getProvider(),t=await getToken(p),pool=await getPool(p),d=await t.decimals(),b=await t.balanceOf(address),a=await pool.getAccount(address),m=await pool.maxBorrow(address),l=await pool.availableLiquidity();return {balance:ethers.formatUnits(b,d),deposited:ethers.formatUnits(a.deposited,d),borrowed:ethers.formatUnits(a.borrowed,d),maxBorrow:ethers.formatUnits(m,d),liquidity:ethers.formatUnits(l,d)}}
async function amountValue(s,amount){return ethers.parseUnits(amount,await s.decimals())}
export async function faucet(amount){const s=await getSigner(),t=await getToken(s),v=await amountValue(t,amount),tx=await t.faucet(v);return tx.wait()}
export async function deposit(amount){const s=await getSigner(),t=await getToken(s),p=await getPool(s),v=await amountValue(t,amount),a=await t.approve(POOL_ADDRESS,v);await a.wait();const tx=await p.deposit(v);return {tx,receipt:await tx.wait()}}
export async function withdraw(amount){const s=await getSigner(),t=await getToken(s),p=await getPool(s),v=await amountValue(t,amount),tx=await p.withdraw(v);return {tx,receipt:await tx.wait()}}
export async function borrow(amount){const s=await getSigner(),t=await getToken(s),p=await getPool(s),v=await amountValue(t,amount),tx=await p.borrow(v);return {tx,receipt:await tx.wait()}}
export async function repay(amount){const s=await getSigner(),t=await getToken(s),p=await getPool(s),v=await amountValue(t,amount),a=await t.approve(POOL_ADDRESS,v);await a.wait();const tx=await p.repay(v);return {tx,receipt:await tx.wait()}}
