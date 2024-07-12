// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assessment {
    uint256 private value;
    string private message;

    function getValue() public view returns (uint256) {
        return value;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setValue(uint256 newValue) public {
        value = newValue;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
