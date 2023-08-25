import {ethers} from "ethers";
import XenCryptoAbi from "../abis/XenCrypto.json";

export default(signer,contractAddress) =>{
    return new ethers.Contract(contractAddress,XenCryptoAbi,signer);
}