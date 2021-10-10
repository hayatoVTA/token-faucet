//SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract TestToken is ERC20 {
//     constructor(string memory name, string memory symbol) ERC20(name, symbol) {
//         _mint(msg.sender, 10000 * (10**18));
//     }

//     function faucet(address recipient, uint256 amount) external {
//         _mint(recipient, amount);
//     }
// }

pragma solidity ^0.8.0;

import "./ERC20.sol";

contract FaucetToken is ERC20 {
    string public name = "FaucetToken";
    string public symbol = "FAT";
    uint256 public decimals = 18;

    uint256 public faucetMax;
    uint256 public faucetFee;
    // address payable public boss;
    address public owner;
    mapping(address => uint256) timeouts;

    constructor() {
        owner = msg.sender;
        faucetFee = 0 ether;
        faucetMax = 1000 * 10**18; // Initial max of 1,000 FAT per mint request
    }

    function getMeSome(uint256 _requestValue) public payable timeCheck {
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
        require(msg.data.length == 0, "invalid");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not_owner");
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
