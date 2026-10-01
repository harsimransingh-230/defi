const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("DeFi Lending", function () {
  let token, pool, owner;
  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MockToken"); token = await Token.deploy(); await token.waitForDeployment();
    const Pool = await ethers.getContractFactory("LendingPool"); pool = await Pool.deploy(await token.getAddress()); await pool.waitForDeployment();
  });
  it("creates token", async function () { expect(await token.name()).to.equal("DeFi USD"); });
  it("deposits", async function () {
    const amount = ethers.parseUnits("1000", 18); await token.faucet(amount); await token.approve(await pool.getAddress(), amount); await pool.deposit(amount);
    const account = await pool.getAccount(owner.address); expect(account[0]).to.equal(amount);
  });
  it("borrows against collateral", async function () {
    const deposit = ethers.parseUnits("1000", 18), borrow = ethers.parseUnits("500", 18);
    await token.faucet(deposit); await token.approve(await pool.getAddress(), deposit); await pool.deposit(deposit); await pool.borrow(borrow);
    const account = await pool.getAccount(owner.address); expect(account[1]).to.equal(borrow);
  });
});
