pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenDistributor is Ownable {
    using SafeERC20 for IERC20;

    constructor() Ownable() {}

    function distributeTokens(
        address[] calldata recipients,
        uint256[] calldata amounts,
        address token
    ) external onlyOwner {
        require(recipients.length == amounts.length, "INV_LEN");
        IERC20 tokenToDistribute = IERC20(token);

        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "INV_ADDR");
            tokenToDistribute.safeTransfer(recipients[i], amounts[i]);
        }
    }

    // this function is only for an emergency bailout where we need to do an action,
    // but cannot with the current code
    function delegateCallLogic(address target, bytes calldata data) external onlyOwner {
        (bool success, ) = target.delegatecall(data);
        require(success, "INV_DELEGATE");
    }
}