// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./CoinTool.sol";

contract CoinToolBatchMinterView {
    
    struct MintInfo {
        address user;
        uint256 term;
        uint256 maturityTs;
        uint256 rank;
        uint256 amplifier;
        uint256 eaaRate;
    }

    struct BatchUnitMintInfo {
        address account;
        uint256 index;
        MintInfo mintInfo;
    }
    
    address public xenCrypto;

    constructor(address _xenCrypto) {
        xenCrypto = _xenCrypto;
    }

    function getMints(address coinTool, address account, bytes calldata _salt, uint256 from, uint256 to) public view returns (BatchUnitMintInfo[] memory) {
        require(to >= from, "to must be >= from");

        uint256 totalResults = to - from + 1;
        BatchUnitMintInfo[] memory result = new BatchUnitMintInfo[](totalResults);

        bytes32 byteCode = getByteCode(coinTool);

        for(uint256 i = from; i <= to; i++){
            bytes32 salt = keccak256(abi.encodePacked(_salt, i, account));
            address proxy = address(uint160(uint(keccak256(abi.encodePacked(
                    hex'ff',
                    coinTool,
                    salt,
                    byteCode
                )))));

            bytes memory payload = abi.encodeWithSignature("userMints(address)", proxy);
            (bool success, bytes memory returnData) = address(xenCrypto).staticcall(payload);
            require(success);

            MintInfo memory mintInfo = abi.decode(returnData, (MintInfo));
            
            result[i] = BatchUnitMintInfo(account, i, mintInfo);
        }

        return result;
    }

    function getAddresses(address add, address coinToolAdd, bytes calldata _salt) public view returns(address[] memory) {
        bytes32 bytecode = keccak256(abi.encodePacked(bytes.concat(bytes20(0x3D602d80600A3D3981F3363d3d373d3D3D363d73), bytes20(coinToolAdd), bytes15(0x5af43d82803e903d91602b57fd5bf3))));

        CoinTool_App coinTool = CoinTool_App(payable(coinToolAdd));
        uint256  totalAdd = coinTool.map(add,_salt);
        address[] memory addresses = new address[](totalAdd);

        uint256 i = 0;
        for(i; i < totalAdd; i++){
            bytes32 salt = keccak256(abi.encodePacked(_salt, i, add));
            address proxy = address(uint160(uint(keccak256(abi.encodePacked(
                    hex'ff',
                    coinToolAdd,
                    salt,
                    bytecode
                )))));
            addresses[i] = proxy;
        }
        return addresses;

    }
    
    function getByteCode(address coinToolAdd) public pure returns(bytes32){
        bytes32 bytecode = keccak256(abi.encodePacked(bytes.concat(bytes20(0x3D602d80600A3D3981F3363d3d373d3D3D363d73), bytes20(coinToolAdd), bytes15(0x5af43d82803e903d91602b57fd5bf3))));
        return bytecode;
    }

    /// @param add address of the account you want to get a specific proxy from
    /// @param coinToolAdd address of the coinTool contract
    /// @param index index of the proxy contract 
    /// @param _salt usually is 0x01 for the CoinTool contract.
    function getProxyForSpecificId(address add, address coinToolAdd, uint256 index,bytes calldata _salt) public pure returns(address){
        bytes32 bytecode = getByteCode(coinToolAdd);
        bytes32 salt = keccak256(abi.encodePacked(_salt, index, add)); 
        address proxy = address(uint160(uint(keccak256(abi.encodePacked(
            hex'ff',
            coinToolAdd,
            salt,
            bytecode
        )))));
        return proxy;
    }

    function makeCallForSpecificProxy(address add, address coinToolAdd, uint256 index, bytes calldata _salt, bytes memory data) external payable {
        address proxy = getProxyForSpecificId(add, coinToolAdd, index, _salt);
        assembly {
            let succeded := call(
                gas(),
                proxy,
                0,
                add(data,0x20),
                mload(data),
                0,
                0
            )
        }
    }
}
