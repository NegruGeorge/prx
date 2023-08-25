// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "./PapGas.sol";

contract PapGasRouter {
   PapGas papGas;
    
    constructor() payable {
        papGas = new PapGas();
    }

    receive() external payable {}

    function batchpap(uint256 n) public {
        papGas.batchpap(n);
    }
}
