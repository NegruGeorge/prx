import {ethers} from "ethers";
import XeNFTAbi from "../abis/XeNFT.json";

export default(signer,contractAddress) =>{
    return new ethers.Contract(contractAddress,XeNFTAbi,signer);
}