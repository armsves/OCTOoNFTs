// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract oERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    }

    struct HolderData {
        bool isBalanceRevealed;
        uint256 revealEndTime;
    }

    mapping(address => HolderData) private _holderData;

    function revealBalance(uint256 revealTime) public {
        _holderData[msg.sender].isBalanceRevealed = true;
        _holderData[msg.sender].revealEndTime = block.timestamp + revealTime;
    }

    function revokeBalance() public {
        _holderData[msg.sender].isBalanceRevealed = false;
    }

    function balanceOf(address account) public override view returns (uint256) {
        HolderData storage data = _holderData[account];
        bool currentlyRevealed = data.isBalanceRevealed && block.timestamp <= data.revealEndTime;
        return currentlyRevealed ? super.balanceOf(account) : 0;
    }
}