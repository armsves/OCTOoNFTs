pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract oERC20 is ERC20 {
    struct HolderData {
        bool isBalanceRevealed;
        uint256 revealEndTime;
    }

    mapping(address => HolderData) private _holderData;

    function revealBalance(uint256 revealTime) public {
        _holderData[msg.sender].isBalanceRevealed = true;
        _holderData[msg.sender].revealEndTime = now + revealTime;
    }

    function revokeBalance() public {
        _holderData[msg.sender].isBalanceRevealed = false;
    }

    function balanceOf(address account) public view returns (uint256) {
        HolderData storage data = _holderData[account];
        bool currentlyRevealed = data.isBalanceRevealed && now <= data.revealEndTime;
        return currentlyRevealed ? super.balanceOf(account) : 0;
    }
}