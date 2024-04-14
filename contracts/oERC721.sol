// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract oERC721 is ERC721, AccessControl {
    struct TokenData {
        string publicData;
        string privateData;
        bool isRevealed;
        uint256 revealEndTime;
    }

    mapping(uint256 => TokenData) private _tokenData;
    mapping(address => uint256) internal _balances;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(address to, uint256 tokenId, string memory publicData, string memory privateData) public {
        _mint(to, tokenId);
        _tokenData[tokenId] = TokenData(publicData, privateData, false, 0);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) override internal view returns (bool) {
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }
    
    function reveal(uint256 tokenId, uint256 revealTime) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        _tokenData[tokenId].isRevealed = true;
        _tokenData[tokenId].revealEndTime = block.timestamp + revealTime;
    }

    function revoke(uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        _tokenData[tokenId].isRevealed = false;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        super.transferFrom(from, to, tokenId);
        _tokenData[tokenId].isRevealed = false;
    }

    function getTokenData(uint256 tokenId) public view returns (string memory publicData, string memory privateData, bool isRevealed) {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        TokenData storage data = _tokenData[tokenId];
        bool currentlyRevealed = data.isRevealed && block.timestamp <= data.revealEndTime;
        return (data.publicData, currentlyRevealed ? data.privateData : "", currentlyRevealed);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}