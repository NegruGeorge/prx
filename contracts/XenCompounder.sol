// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.10;
// import "./XENFT.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


// contract XenCompounder is IERC721Receiver {
//     using SafeERC20 for IERC20;

//     address public xeNFT;
//     address public xenCrypto;

//     XENFT xeNFTContract;
//     IERC20 xenCryptoContract;

//     // amount of ETH one user deposited
//     mapping(address => uint256) public userDepositedAmountETH;
    
//     // amount of XEN one user deposited
//     mapping(address => uint256) public userDepositedAmountXEN;
    
//     mapping(address => uint256[]) public userDepositedXENFTs;

// // putem sa dam reward pentru agent cand da claim =>
// // 1) agentul1 vine si face batch pentru un user automat el primeste 10% procent din rewardul pe care utiziatorul il primeste la maturitate
// // 2) agentul2 vine si da claim tokens pentru user => automat si el primeste 10% din rewardul utilizatorului 
// // 3) astfel => agentii primesc 20% sau un procent fixat de noi din reward, userul 80% + nu asteapta sa faca el batch

// // batch cu mai multe perioade de timp ?

//     constructor(address _xeNFT,address _xenCrypto) {
//         xeNFT = _xeNFT;
//         xenCrypto = _xenCrypto;

//         xeNFTContract =  XENFT(xeNFT);
//         xenCryptoContract = IERC20(xenCrypto);
//     }

//     /**
//      * Deposit ETH.
//      * 
//      * Access: end user account
//      */
//     function deposit() payable public {
//         userDepositedAmountETH[msg.sender] = msg.value;
//     }

//     /**
//      * Deposit XENFTs with given IDs
//      *
//      * Access: end user account
//      */
//     function depositXENFT(uint256[] memory ids) public {
//         for(uint256 i=0;i<ids.length;i++){
//             xeNFTContract.safeTransferFrom(msg.sender,address(this),ids[i]);
//             userDepositedXENFTs[msg.sender].push(ids[i]);
//         }
//     }       

//     /**
//      * Sends requested wei amount to given account.
//      *
//      * Access: end user account
//      */
//     function withdrawETH(uint256 amount, address account) public {
//         require(amount <= userDepositedAmountETH[msg.sender],"XenCompounder: User does not have enaugh ETH");
//         userDepositedAmountETH[msg.sender] -= amount;
//         sendViaCall(payable(account),amount);
//     }

//     /**
//      * Withdraws the given XENFTs.
//      *
//      * Access: end user account
//      */
//     function withdrawXENFT(uint256[] memory ids, address account) public {
//         for(uint256 i=0;i<ids.length;i++){
//             removeERC721Id(msg.sender, ids[i]);
//             xeNFTContract.safeTransferFrom(address(this),account,ids[i]);
//         }
//     }


//     function removeERC721Id(address account, uint256 tokenId) internal {
//         // switch the desired TokenId to delete from the array to the last array value;
//         // delete the last value from the array
//         uint256 index = 0;
//         bool found = false;

//         for(uint256 i=0;i<userDepositedXENFTs[account].length;i++){
//             if(tokenId == userDepositedXENFTs[account][i]){
//                 index = i;
//                 found = true;
//                 break;
//             }
//         }
//         require(found,"XenCompounder: this id is not owned by the user");

//         uint256 last = userDepositedXENFTs[account].length -1;
//         userDepositedXENFTs[account][index] = userDepositedXENFTs[account][last];
//         userDepositedXENFTs[account].pop();
//     }

//     /**
//      * Withdraws the given XEN token amount.
//      *
//      * Access: end user account
//      */
//     function withdrawXEN(uint256 amount, address account) public {
//         require(amount <= userDepositedAmountXEN[msg.sender],"XenCompounder: User does not have enaugh XEN");
//         userDepositedAmountXEN[msg.sender] -=amount;
        
//         xenCryptoContract.safeApprove(address(this), amount);
//         xenCryptoContract.safeTransferFrom(address(this), account, amount);
//     }

//     /**
//      * Creates a batch on behalf of the given account.
//      *
//      * Access: compounder
//      */
//     function batch(address account, uint256 term, uint256 vmus) public {
//         // se plateste cu banii depozitati de account
//         //21000 -send
//         uint256 startGas = gasleft();
//         uint256 tokenId = xeNFTContract.bulkClaimRank(vmus,term);
//         userDepositedXENFTs[account].push(tokenId);
// // nft ramane in contract   deci fara safeTransfer => se salveaza in mapping ul accountului dat ca si parametru
// // try delegateCall with the contract to see 

//         // xeNFTContract.safeTransferFrom(address(this),account,tokenId);
//         // uint256 gas = tx.gasprice * (startGas + 21000);
//         uint256 gas = tx.gasprice * (startGas - gasleft() + 21000);
//         userDepositedAmountETH[account] -= gas;

//         sendViaCall(payable(msg.sender), gas);

//     }

//     /**
//      * Swaps the given amount of XEN token to ETH.
//      *
//      * Access: compounder
//      */

//      // integrare cu uniswap ca sa faca swap ul
//     function rewardsToETH(uint256 amountXen) public {
        
//     }


//     function claimRewards(uint256[] memory ids, address account) public {

//     }


//     function claimRewardsToETH(uint256[] memory ids, address account) public{

//     }



//     function sendViaCall(address payable _to, uint256 _amount) private {
//         (bool sent, ) = _to.call { value: _amount } ("");
//         require(sent, "XenCompounder: failed to send amount");
//     }

//     function onERC721Received(
//         address operator,
//         address from,
//         uint256 tokenId,
//         bytes calldata data
//     ) external override  returns (bytes4) {
//         return
//             bytes4(
//                 keccak256("onERC721Received(address,address,uint256,bytes)")
//             );
//     }
// }
