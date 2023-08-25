// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "hardhat/console.sol";

contract testMATIC {
    constructor() payable {}

    address public constant WMATIC = 0xd9145CCE52D386f254917e481eB44e9943F39138;

    function testWM(uint amount) public {
        (bool success, bytes memory data) = WMATIC.call(
            abi.encodeWithSignature("withdraw(uint)", amount)
        );
        // require(success, "transfer does not work");
        console.log(success);
    }

    function depositWM() public payable{
        (bool success,) = WMATIC.call{value: msg.value}(abi.encodeWithSignature("deposit()"));
        require(success, "transfer does not work");
    }

}
