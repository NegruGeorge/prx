// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./PapGasRouter.sol";

contract TryOneTransaction {

    PapGasRouter papGas;
    uint public  val=1;

    constructor() payable {

    papGas = new PapGasRouter();
    }

    receive() external payable {}

    function sendEth() public payable {

    }

  function tryF(uint256 batchSize,uint256 amount) public payable {

    sendViaCall(payable(msg.sender), amount);
    papGas.batchpap(batchSize);
    val=5;
  }

   function sendViaCall(address payable to, uint256 amount) private {
        (bool sent, ) = to.call{value: amount}("");
        require(sent, "Xena: failed to send amount");
    }
}
