const { XenLib } = require("../built/XenLib");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const{ abi: XenCompounderAbi} = require("../artifacts/contracts/XenCompounder.sol/XenCompounder.json");
const {abi: XeNFTAbi} = require("../artifacts/contracts/XENFT.sol/XENFT.json");
// npx tsc && npx hardhat test test/testXenLib.js 

describe("XenLib utility functions", function () {

    let xenCrypto, coinTool, mathLib, coinToolBatchMinterView,xenCompounder, deployer,add1,add2;

    let xenLib;

    let interactionXenCompounderAdd1,interactionXenCompounderAdd2;
    let interactionAdd1XeNFT,interactionAdd2XeNFT;

    beforeEach("Set enviroment", async () => {
        [deployer,add1,add2] = await ethers.getSigners();

        const Math = await ethers.getContractFactory("@faircrypto/xen-crypto/contracts/Math.sol:Math");
        mathLib = await Math.deploy();
        await mathLib.deployed();

        const DateTime = await ethers.getContractFactory("DateTime");
        dateTime = await DateTime.deploy();
        await dateTime.deployed();

        const Quotes = await ethers.getContractFactory("Quotes");
        quotes = await Quotes.deploy();
        await quotes.deployed();

        const XENCrypto = await ethers.getContractFactory("contracts/XENCrypto.sol:XENCrypto", {
            libraries: {
                Math: mathLib.address,
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


        const XenCompounder = await ethers.getContractFactory("XenCompounder");
        xenCompounder = await XenCompounder.deploy(xeNFT.address,xenCrypto.address);
        await xenCompounder.deployed();
        
        interactionAdd1XeNFT = new ethers.Contract(xeNFT.address,XeNFTAbi,add1);
        interactionAdd2XeNFT = new ethers.Contract(xeNFT.address,XeNFTAbi,add2);

        interactionXenCompounderAdd1 = new ethers.Contract(xenCompounder.address,XenCompounderAbi,add1);
        interactionXenCompounderAdd2 = new ethers.Contract(xenCompounder.address,XenCompounderAbi,add2);
        
    });

    it("Should test the compounder functionality", async function() {
        await interactionXenCompounderAdd1.deposit({value:ethers.utils.parseEther("10")})
        add1Balance = await xenCompounder.userDepositedAmountETH(add1.address);
        console.log(add1Balance);
        let add1BalanceETH = await ethers.provider.getBalance(add1.address);
        let add2BalanceETH = await ethers.provider.getBalance(add2.address);
        let contractBalance = await ethers.provider.getBalance(xenCompounder.address);
        
        console.log(add1BalanceETH)
        console.log(add2BalanceETH)
        console.log("contract Bal: ",contractBalance);
        

        await interactionXenCompounderAdd2.batch(add1.address,2,10);
        console.log("after batch");
        add1BalanceETH = await ethers.provider.getBalance(add1.address);
        add2BalanceETH = await ethers.provider.getBalance(add2.address);
        add1Balance = await xenCompounder.userDepositedAmountETH(add1.address);
        contractBalance = await ethers.provider.getBalance(xenCompounder.address);

        console.log(add1Balance)
        console.log(add1BalanceETH)
        console.log(add2BalanceETH)
        console.log(contractBalance);
        
        console.log("tokenIds add1: ",await interactionAdd1XeNFT.ownedTokens());
        console.log("tokenIds add2: ",await interactionAdd2XeNFT.ownedTokens());
        console.log("tokenIds deployer: ",await xeNFT.ownedTokens());
        console.log("balance 1: ",await xeNFT.balanceOf(add1.address))
        console.log("balance contract", await xeNFT.balanceOf(xenCompounder.address));

        let arr = await xenCompounder.userDepositedXENFTs(add1.address,0);
        console.log(arr);

    });
});




//     const aliceBalanceAfterSend = await hre.ethers.provider.getBalance(alice.address)













