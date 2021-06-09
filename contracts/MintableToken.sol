pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MintableToken is ERC20("Mintable Token", "MINTBL") {
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
