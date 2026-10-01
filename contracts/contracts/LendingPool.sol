// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
contract LendingPool is ReentrancyGuard {
    IERC20 public immutable token;
    uint256 public constant BASIS_POINTS = 10000;
    uint256 public constant COLLATERAL_FACTOR = 7500;
    struct UserAccount { uint256 deposited; uint256 borrowed; uint256 lastBorrowTimestamp; }
    mapping(address => UserAccount) public users;
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);
    constructor(address tokenAddress) { require(tokenAddress != address(0), "Invalid token"); token = IERC20(tokenAddress); }
    function deposit(uint256 amount) external nonReentrant { require(amount > 0, "Amount must be greater than zero"); require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed"); users[msg.sender].deposited += amount; emit Deposited(msg.sender, amount); }
    function withdraw(uint256 amount) external nonReentrant { require(amount > 0, "Invalid amount"); UserAccount storage user = users[msg.sender]; require(user.deposited >= amount, "Insufficient deposit"); uint256 remaining = user.deposited - amount; uint256 maxBorrowAmount = remaining * COLLATERAL_FACTOR / BASIS_POINTS; require(user.borrowed <= maxBorrowAmount, "Collateral ratio too low"); require(token.balanceOf(address(this)) >= amount, "Insufficient pool liquidity"); user.deposited -= amount; require(token.transfer(msg.sender, amount), "Transfer failed"); emit Withdrawn(msg.sender, amount); }
    function borrow(uint256 amount) external nonReentrant { require(amount > 0, "Invalid amount"); UserAccount storage user = users[msg.sender]; uint256 newDebt = user.borrowed + amount; uint256 maxBorrowAmount = user.deposited * COLLATERAL_FACTOR / BASIS_POINTS; require(newDebt <= maxBorrowAmount, "Insufficient collateral"); require(token.balanceOf(address(this)) >= amount, "Insufficient pool liquidity"); user.borrowed = newDebt; user.lastBorrowTimestamp = block.timestamp; require(token.transfer(msg.sender, amount), "Transfer failed"); emit Borrowed(msg.sender, amount); }
    function repay(uint256 amount) external nonReentrant { require(amount > 0, "Invalid amount"); UserAccount storage user = users[msg.sender]; require(user.borrowed >= amount, "Repay exceeds debt"); require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed"); user.borrowed -= amount; emit Repaid(msg.sender, amount); }
    function getAccount(address userAddress) external view returns (uint256 deposited, uint256 borrowed) { UserAccount memory user = users[userAddress]; return (user.deposited, user.borrowed); }
    function availableLiquidity() external view returns (uint256) { return token.balanceOf(address(this)); }
    function maxBorrow(address userAddress) external view returns (uint256) { UserAccount memory user = users[userAddress]; return user.deposited * COLLATERAL_FACTOR / BASIS_POINTS; }
    function healthFactor(address userAddress) external view returns (uint256) { UserAccount memory user = users[userAddress]; if (user.borrowed == 0) return type(uint256).max; return user.deposited * COLLATERAL_FACTOR / user.borrowed; }
}
