const { XenLib } = require("../built/XenLib");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const {abi: xeNFTAbi} = require("../artifacts/contracts/XENFT.sol/XENFT.json");
// const {abi: xeNFTAbi} = require("../artifacts/contracts/X")

// npx tsc && npx hardhat test test/testXenLib.js 

describe("XenLib utility functions", function () {

    let xenCrypto, xeNFT, coinTool, mathLib, coinToolBatchMinterView, deployer, dateTime , quotes;

    let xenLib;

    let interactionAdd1XeNFT;

    beforeEach("Set enviroment", async () => {
        [deployer,add1] = await ethers.getSigners();

        const Math = await ethers.getContractFactory("MathX");
        mathLib = await Math.deploy();
        await mathLib.deployed();

        const DateTime = await ethers.getContractFactory("DateTime");
        dateTime = await DateTime.deploy();
        await dateTime.deployed();

        const Quotes = await ethers.getContractFactory("Quotes");
        quotes = await Quotes.deploy();
        await quotes.deployed();

        const XENCrypto = await ethers.getContractFactory("XENCrypto", {
            libraries: {
                MathX: mathLib.address,
            },
        });
        xenCrypto = await XENCrypto.deploy();
        await xenCrypto.deployed();

        const CoinTool_App = await ethers.getContractFactory("CoinTool_App");
        coinTool = await CoinTool_App.deploy();
        await coinTool.deployed();

        const CoinToolBatchMinterView = await ethers.getContractFactory("CoinToolBatchMinterView");
        coinToolBatchMinterView = await CoinToolBatchMinterView.deploy(xenCrypto.address);
        await coinToolBatchMinterView.deployed();

        const XENFT = await ethers.getContractFactory("XENFT",{
            libraries:
            {
                DateTime: dateTime.address,
                Quotes: quotes.address
            }
        });
        xeNFT = await XENFT.deploy(xenCrypto.address);
        await xeNFT.deployed();

        xenLib = new XenLib(xenCrypto.address, coinTool.address, coinToolBatchMinterView.address, xeNFT.address, deployer);

        interactionAdd1XeNFT =  new ethers.Contract(xeNFT.address,xeNFTAbi,add1);

    });

    it("Should fetch all account mints", async function() {
        let data = `0x59635f6f000000000000000000000000${xenCrypto.address.slice(2)}000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000`
        await coinTool.t(10, data, "0x01");

        let proxyCount = parseInt(await coinTool.map(deployer.address, "0x01"));
        const mintsInfo = await xenLib.getMints(deployer.address, 0, proxyCount);

        expect(mintsInfo.length).to.equal(proxyCount + 1);
        // console.log(mintsInfo);
    });
    it.only("should test the function that estimate the xen price reward in ether", async function(){
       console.log(deployer.address)
       console.log(add1.address)
        // await xeNFT.bulkClaimRank(128,100);
        await xeNFT.bulkClaimRank(100,1);

        console.log("batch done");
        // for(let i=0;i<21;i++){
        //     console.log(i);
        //     await interactionAdd1XeNFT.bulkClaimRank(10,10)
        // }
        
        

        let tokenId = await xeNFT.ownedTokens();
        console.log(tokenId);

        let ti = await interactionAdd1XeNFT.ownedTokens();
        console.log(ti)
        console.log("..........")

// //- cRank (related to the first VMU, or the start of the batch)

//         // console.log(await xeNFT.tokenURI(10001))
//         let mintInfoFull = await xeNFT.mintInfo(tokenId[0]);
//         console.log(mintInfoFull);
//         console.log("vmuCount:")
//         console.log(await xeNFT.vmuCount(tokenId[0]));
       
//         let decodedMintInfo = await xeNFT.decodeMintInfo(mintInfoFull);
//         console.log("decodedMintInfo.......................................")
//         console.log(decodedMintInfo);
//         console.log(".......................................")
//         //getGrossReward
//         let globalRank = await xenCrypto.globalRank();
//         console.log("globalRank: ",globalRank);
//         // let rankDelta = await mathLib.max(globalRank.sub(decodedMintInfo.rank),2);
//         let rankDelta = await Math.max(globalRank.sub(decodedMintInfo.rank),2);

//         let EAA =  decodedMintInfo.eaa.add(1000);
//         // calculate amplifier
//         let amplifier = decodedMintInfo.amp;
//         let term = decodedMintInfo.term;

//         console.log("data: ")
//         console.log("rank: ",parseInt(rankDelta));
//         console.log("EAA: ",parseInt(EAA));
//         console.log("AMP: ",parseInt(amplifier))
//         console.log("term: ",parseInt(term))
        
//         let getGrossReward = await xenCrypto.getGrossReward(
//             rankDelta,
//             amplifier,
//             term,
//             EAA
//             );
//             // console.log( ethers.utils.parseEther("1"))
//         console.log("reward per 1 account: ")
//         console.log(getGrossReward)
//         console.log(getGrossReward.mul( ethers.utils.parseEther("1")))

//         console.log("total.................")

//         let tokenVMUCounts = await xeNFT.vmuCount(tokenId[0]);

        
//         console.log("tokenVMUCounts: ",parseInt(tokenVMUCounts));
//         console.log("first ranK: ",parseInt(decodedMintInfo.rank))
//         console.log("last ranK: ",parseInt(decodedMintInfo.rank.add(tokenVMUCounts)))
//         console.log("global Rank: ",parseInt(globalRank));

//         let totalXen =0;
//         for(let i=parseInt(decodedMintInfo.rank); i<parseInt(decodedMintInfo.rank.add(tokenVMUCounts));i++){
//             console.log(i)
//             console.log(parseInt(decodedMintInfo.rank.add(tokenVMUCounts)))
//             console.log("....")
//             rankDelta = await Math.max(globalRank.sub(i),2);
//             EAA = decodedMintInfo.eaa.add(1000);
//             amplifier = decodedMintInfo.amp;
//             term = decodedMintInfo.term; 
//             getGrossReward = await xenCrypto.getGrossReward(
//                 rankDelta,
//                 amplifier,
//                 term,
//                 EAA
//             );
//             totalXen = getGrossReward.add(totalXen)
//         }

//         console.log("totalXenFrom tests: ",totalXen);
        console.log("from lib: ",await xenLib.getNFTRewardInXen(parseInt(tokenId[0]),0))
        // console.log("optimise: ",await xenLib.getNFTRewardInXenOptimise(parseInt(tokenId[0]),0))

    })
});
















