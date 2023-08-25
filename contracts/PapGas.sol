// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;


contract PapGas {

    uint256[] sugiPlNegru;

    constructor() payable {}

    receive() external payable {}

    function batchpap(uint256 n) public {
        payable(msg.sender).transfer(address(this).balance);

        for(uint256 i=0; i<n; i++){
            sugiPlNegru.push(i);
        }
    }
}
