//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract FaucetToken is ERC20 {
    string public name = "FaucetToken";
    string public symbol = "FAT";
    uint256 public decimals = 18;

    uint256 public faucetMax;
    uint256 public faucetFee;
    address public owner;
    mapping(address => uint256) timeouts;

    constructor() {
        owner = msg.sender;
        faucetFee = 0 ether;
        faucetMax = 1000 * 10**18;
    }

    // Main Faucet Func
    function getMeSome(uint256 _requestValue) public payable {
        require(msg.value == faucetFee, "no_fee");
        require(_requestValue <= faucetMax, "too_much");

        _mint(msg.sender, _requestValue);
    }

    function burnMine(uint256 _burnValue) public {
        _burn(msg.sender, _burnValue);
    }

    function changeMaxAmount(uint256 _newMaxAmount) public onlyOwner {
        faucetMax = _newMaxAmount;
    }

    function changeFee(uint256 _newFee) public onlyOwner {
        faucetFee = _newFee;
    }

    function changeOwner(address payable _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function withdraw(address payable _account) public onlyOwner {
        _account.transfer(payable(address(this)).balance);
    }

    fallback() external {
        require(msg.data.length == 0, "Invalid detail");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not owner!!");
        _;
    }

    modifier timeCheck() {
        require(
            timeouts[msg.sender] <= block.timestamp - 30 minutes,
            "You can only withdraw once every 30 minutes. Please check back later."
        );
        _;

        timeouts[msg.sender] = block.timestamp;
    }
}
