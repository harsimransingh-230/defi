// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MockToken is ERC20 {
    constructor() ERC20("DeFi USD", "dUSD") { _mint(msg.sender, 1_000_000 * 10 ** decimals()); }
    function faucet(uint256 amount) external { require(amount > 0, "Amount must be greater than zero"); _mint(msg.sender, amount); }
}
