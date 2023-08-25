// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {FlashLoanSimpleReceiverBase} from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

import "./PapGas.sol";

contract FlashLoanXen is FlashLoanSimpleReceiverBase {

    uint8 public successfulLoanID;

    PapGas papgas;

    address constant public WMATIC = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;

    constructor(
        address _addressProvider
    ) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {
        papgas = new PapGas();
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        //we have the borrwed funds

        //we can add any custom logic here
        successfulLoanID++;

        // (bool success, bytes memory data) = WMATIC.call{gas: 50000}(
        //     abi.encodeWithSignature("withdraw(uint256)", amount)
        // );
        // require(success, "transfer does not work");

        sendViaCall(payable(msg.sender), amount);

        papgas.batchpap(500);

        uint256 amountOwed = amount + premium;  
        IERC20(asset).approve(address(POOL), amountOwed);

        return true;
    }

    function requestFlashLoan(address _token, uint256 _amount) public {
        address receiverAddress = address(this);
        address asset = _token;
        uint256 amount = _amount;
        bytes memory params = "";
        uint16 referralCode = 0;

        POOL.flashLoanSimple(
            receiverAddress,
            asset,
            amount,
            params,
            referralCode
        );
    }

    function sendViaCall(address payable to, uint256 amount) private {
        (bool sent, ) = to.call{value: amount}("");
        require(sent, "Xena: failed to send amount");
    }

    function testWM(uint256 amount) public {
        (bool success, bytes memory data) = WMATIC.call(
            abi.encodeWithSignature("withdraw(uint256)", amount)
        );
        require(success, "transfer does not work");
    }

}
