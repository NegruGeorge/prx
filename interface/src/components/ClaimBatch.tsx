import React, { useEffect, useState } from 'react'
import { useAccount,useProvider,useSigner } from 'wagmi'
import {ethers} from "ethers";

import XeNFTContract from "../contracts/XeNFT";
import XenCryptoContract from "../contracts/XenCrypto";

const xeNFTContractAddress = "0x03c13830dc69f14218aa76ccfbff59271da19ca7";
const xenCryptoAddress = "0xcdee1efe9ee48406a956e1242de3cd06fc6e6dd4";
export default function ClaimBatch() {
  const { address, isConnected} = useAccount()
  const provider:any = useProvider();
  const {data:signer} = useSigner();
  let [userBalance,setUserBalance] = useState<any>("0");
  let [ownedTokensArray,setOwnedTokensArray] = useState<any>([]);


  useEffect(()=>{
      if(isConnected && signer!== undefined){
        getAccountNFTS();
      }

    
  },[signer,isConnected])

  // useEffect(()=>{

  //   if(isConnected){
  //     getAccountNFTS();
  //   }
  
  // },[])


  async function getNftInfo(tokenId: number,newUsers: number ): Promise<any>{
    const xeNFTContract = XeNFTContract(signer,xeNFTContractAddress);
    const xenCryptoContract = XenCryptoContract(signer,xenCryptoAddress);

    const mintInfo = await xeNFTContract.mintInfo(tokenId);
    console.log(mintInfo);
    const decodedMintInfo = await xeNFTContract.decodeMintInfo(mintInfo);
    const globalRank = await xenCryptoContract.globalRank();

    const tokenVMUCounts = await xeNFTContract.vmuCount(tokenId);

    let totalXen = 0;
    const EAA = decodedMintInfo.eaa.add(1000);
    const amplifier = decodedMintInfo.amp;
    const term = decodedMintInfo.term;
    console.log("eaa: ",EAA);
    console.log("amplifier: ",amplifier);
    console.log("term: ",term)
    const currentEAA = await xenCryptoContract.getCurrentEAAR();
    console.log("currentEAA: ",currentEAA); 
        for(let i=parseInt(decodedMintInfo.rank); i<parseInt(decodedMintInfo.rank.add(tokenVMUCounts));i++){
           //console.log("i: ",i);
            const rankDelta = Math.max(globalRank.sub(i).add(newUsers),2);
           //console.log("rankDelta: ",rankDelta);
        //    console.log("Math.log2(rankDelta): ",Math.log2(rankDelta) )
        //    console.log("Math.log2(rankDelta): ",Math.log2(rankDelta).toLocaleString() )
        //    console.log("Math.log2(rankDelta): ",Math.log2(rankDelta).toFixed() )
        //    console.log("Math.log2(rankDelta): ",Math.log2(rankDelta).toPrecision() )
        //    console.log("Math.log2(rankDelta): ",ethers.utils.parseEther(Math.log2(rankDelta).toString()))

            const getGrossReward = term.mul(amplifier).mul(EAA).div(1000).mul(ethers.utils.parseUnits(Math.log2(rankDelta).toString()))
            // const getGrossReward = await this.xenCryptoContract.getGrossReward(
            //     rankDelta,
            //     amplifier,
            //     term,
            //     EAA
            // );
            // console.log("sss")
            totalXen = getGrossReward.add(totalXen);
        }
        return totalXen;

  }

  async function getAccountNFTS(){
    if(isConnected){
      console.log("provider: ", provider);
      console.log("signer: ", signer);

      const xeNFTContract = XeNFTContract(signer,xeNFTContractAddress);
      console.log("ssssssssss")

      let balance = await xeNFTContract.balanceOf(address);
      setUserBalance(balance.toString());

      console.log("balance: ",balance.toString());

      let ownedTokens = await xeNFTContract.ownedTokens();
      setOwnedTokensArray(ownedTokens);
      console.log("ownedTokens: ",ownedTokens);

      for(let i=0;i<ownedTokens.length;i++)
      {
        let totalXen = await getNftInfo(parseInt(ownedTokens[i].toString()),1000);
        console.log("tokenId + reward:  ", ownedTokens[i])
        console.log(totalXen);
      }


    }
  }

  return (
    <div><h1>ClaimBatch</h1></div>
  )
}
