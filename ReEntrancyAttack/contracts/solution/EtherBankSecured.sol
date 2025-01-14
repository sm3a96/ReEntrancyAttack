// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EtherBankSecured is ReentrancyGuard {

    mapping(address => uint256) public balances;

    // Solution 1 - We have to wrap every function with reentrancyGuard 
    // The 'locked' bool variable is a mutex(this to prevent re entrancy attacks)
    bool internal locked;
    modifier reentrancyGuard() {
        require(!locked);
        locked = true;
        _;
        locked = false;
    }

    function depositETH() public payable {
        balances[msg.sender] += msg.value;
    }
    

    function withdrawETH() public reentrancyGuard nonReentrant {

        uint256 balance = balances[msg.sender];

        // Solution 1 - Update Balance Before Sending ETH
        balances[msg.sender] = 0;

        // Solution 2 - Use transfer() function instead of the call() function
        payable(msg.sender).transfer(balance);
    }
}
