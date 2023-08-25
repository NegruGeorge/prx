const { ethers } = require("hardhat");
const { abi:xenCryptoAbi } = require("../artifacts/contracts/XENCrypto.sol/XENCrypto.json");
const { abi:coinToolBatchMinterAbi } = require("../artifacts/contracts/CoinTool.sol/CoinTool_App.json");
const { abi:coinToolBatchMinterViewAbi } = require("../artifacts/contracts/CoinToolBatchMinterView.sol/CoinToolBatchMinterView.json");
const { abi:xeNFTAbi} = require("../artifacts/contracts/XENFT.sol/XENFT.json");

class XenLib {

    xenCryptoContract: any;
    coinToolBatchMinter: any;
    coinToolBatchMinterView: any;
    xeNFTContract: any;

    constructor(
        public xenCryptoAddress: string,
        public coinToolBatchMinterAddress: string,
        public coinToolBatchMinterViewAddress: string,
        public xeNFTAddress:string,
        public signer: any
    ) {
        this.xenCryptoContract = new ethers.Contract(xenCryptoAddress, xenCryptoAbi, signer);
        this.coinToolBatchMinter = new ethers.Contract(coinToolBatchMinterAddress, coinToolBatchMinterAbi, signer);
        this.coinToolBatchMinterView = new ethers.Contract(coinToolBatchMinterViewAddress, coinToolBatchMinterViewAbi, signer);
        this.xeNFTContract = new ethers.Contract(xeNFTAddress,xeNFTAbi,signer);
    }

    async getMints(account: string, fromIndex: number, toIndex: number): Promise<any> {
        const batchUnitMintInfos = await this.coinToolBatchMinterView.getMints(this.coinToolBatchMinter.address, account, "0x01", fromIndex, toIndex);
        return XenLib.toMints(batchUnitMintInfos);
    }

    static toMints(batchUnitMintInfos: any) {
        return batchUnitMintInfos.map((item: { account: any; index: any; mintInfo: any; }) => {
            return {
                account: item.account,
                index: item.index,
                mintInfo: XenLib.toMintInfo(item.mintInfo)
            };
        });
    }

    static toMintInfo(input: any) {
        return {
            user: input.user,
            term: input.term,
            maturityTs: input.maturityTs,
            rank: input.rank,
            amplifier: input.amplifier,
            eaaRate: input.eaaRate,
        };
    }

    async getNFTRewardInXen(tokenId: number,newUsers: number ): Promise<any>{
        const mintInfo = await this.xeNFTContract.mintInfo(tokenId);
        const decodedMintInfo = await this.xeNFTContract.decodeMintInfo(mintInfo);
        const globalRank = await this.xenCryptoContract.globalRank();
        
        const tokenVMUCounts = await this.xeNFTContract.vmuCount(tokenId);

        let totalXen =0;

        for(let i=parseInt(decodedMintInfo.rank); i<parseInt(decodedMintInfo.rank.add(tokenVMUCounts));i++){
            const rankDelta = await Math.max(globalRank.sub(i).add(newUsers),2);
            const EAA = decodedMintInfo.eaa.add(1000);
            const amplifier = decodedMintInfo.amp;
            const term = decodedMintInfo.term; 
            const getGrossReward = await this.xenCryptoContract.getGrossReward(
                rankDelta,
                amplifier,
                term,
                EAA
            );
            totalXen = getGrossReward.add(totalXen);
        }
    
        return totalXen;
    }

    async getNFTRewardInXenOptimise(tokenId: number,newUsers: number ): Promise<any>{
        const mintInfo = await this.xeNFTContract.mintInfo(tokenId);
        const decodedMintInfo = await this.xeNFTContract.decodeMintInfo(mintInfo);
        const globalRank = await this.xenCryptoContract.globalRank();
        
        const tokenVMUCounts = await this.xeNFTContract.vmuCount(tokenId);

        let totalXen =0;

        const EAA = decodedMintInfo.eaa.add(1000);
        const amplifier = decodedMintInfo.amp;
        const term = decodedMintInfo.term; 
        console.log("eaa: ",EAA);
        console.log("amplifier: ",amplifier);
        console.log("term: ",term)
        const currentEAA = await this.xenCryptoContract.getCurrentEAAR();
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

            const getGrossReward = term.mul(amplifier).mul(EAA).div(1000).mul(ethers.utils.parseWei(Math.log2(rankDelta).toString()))
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


    async getRewardForOneWallet(address: string,newUsers: number ): Promise<any>{
        const globalRank = await this.xenCryptoContract.globalRank();

    }

}

module.exports = {
    XenLib,
};  