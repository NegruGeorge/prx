const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  const {ethers} = require("hardhat");
  const { keccak256 } = require("ethers/lib/utils");

  const {abi: xenCryptoABI} = require("../artifacts/contracts/XENCrypto.sol/XENCrypto.json"); 
  
  describe("testGetAddresses", function () {
    let xenCrypto,coinTool, mathLib, view, xenToken;
    let user1, user2, user3;
    beforeEach("Set enviroment", async() => {
        [user1, user2, user3] = await ethers.getSigners();

        const MATHLIB = await ethers.getContractFactory("contracts/MathX.sol:MathX");
        mathLib = await MATHLIB.deploy();
        await mathLib.deployed();

        const XEN = await ethers.getContractFactory("XENCrypto",{
            libraries:{
                MathX: mathLib.address,
            },  
        });
        xenCrypto = await XEN.deploy();
        await xenCrypto.deployed();

        const COINTOOL = await ethers.getContractFactory("CoinTool_App");
        coinTool = await COINTOOL.deploy();
        await coinTool.deployed();

        const GAT = await ethers.getContractFactory("CoinToolBatchMinterView");
        view = await GAT.deploy(xenCrypto.address);
        await view.deployed();


    });

    it("should get the addresses list",async()=>{
        console.log("xenC: ",xenCrypto.address);
        console.log("coinT: ",coinTool.address)
        console.log("CoinToolBatchMinterView: ",view.address);
        console.log("user1: ",user1.address);
        console.log("user2: ",user2.address);
        console.log("..............................")

        await xenCrypto.claimRank(1);
        console.log("user info about xen mints: ",await xenCrypto.getUserMint());


       // trebuie sa modificam "DATA" din parametrii 
       //0x59635f6f0000000000000000000000002ab0e9e4ee70fff1fb9d67031e44f6410170d00e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000
       //0x59635f6f000000000000000000000000""2ab0e9e4ee70fff1fb9d67031e44f6410170d00e""000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000
      // aici avem adresa de pe polygin. Trebuie sa punem adresa contractului nostru.
      // 2ab0e9e4ee70fff1fb9d67031e44f6410170d00e => polygomn
    //   console.log(xenCrypto.address.slice(2));  => punem slice(2) pt ca avem nev de tot fara 0x
       let data = `0x59635f6f000000000000000000000000${xenCrypto.address.slice(2)}000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000`
       await coinTool.t(10,data,"0x01");
       await coinTool.t(10,data,"0x01");
       await coinTool.t(10,data,"0x01");
       await coinTool.t(10,data,"0x01");


       console.log("sent T");

       console.log("we have this many proxies: ",(await coinTool.map(user1.address,"0x01")).toString());

        let proxy1 = await view.getProxyForSpecificId(
        user1.address,
        coinTool.address,
        1,
        "0x01"
        );
        console.log("proxy add for 1: ",proxy1);


        let signer1 = await ethers.getSigner(proxy1)

        // console.log("signer:  ",signer1);
        let proxy1Interaction = await xenCrypto.connect(signer1)
        console.log("info from proxy1: ", await proxy1Interaction.getUserMint());
        
       console.log("........................ get array list.......................")
       let byteCode = await view.getByteCode(coinTool.address);
       console.log("byteCode: ",byteCode);
       let amountProxy = (await coinTool.map(user1.address,"0x01")).toString();
       console.log(amountProxy)
    
       let i=1;
       let addresses=[];
       for(i=1;i<=parseInt(amountProxy);i++){
            let prx = await view.getProxyForSpecificId(
                user1.address,
                coinTool.address,
                i,
                "0x01"
                );
            
            addresses.push(prx);
       }
       console.log("address list:",addresses);

    })

    it("should try to claim tokens",async()=>{

  


       // trebuie sa modificam "DATA" din parametrii 
       //0x59635f6f0000000000000000000000002ab0e9e4ee70fff1fb9d67031e44f6410170d00e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000
       //0x59635f6f000000000000000000000000""2ab0e9e4ee70fff1fb9d67031e44f6410170d00e""000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000
      // aici avem adresa de pe polygin. Trebuie sa punem adresa contractului nostru.
      // 2ab0e9e4ee70fff1fb9d67031e44f6410170d00e => polygomn
    //   console.log(xenCrypto.address.slice(2));  => punem slice(2) pt ca avem nev de tot fara 0x
       let data = `0x59635f6f000000000000000000000000${xenCrypto.address.slice(2)}000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000`
       await coinTool.t(10,data,"0x01");
       await coinTool.t(10,data,"0x01");
       await coinTool.t(10,data,"0x01");
       await coinTool.t(10,data,"0x01");

       console.log("sent T");
       console.log("we have this many proxies: ",(await coinTool.map(user1.address,"0x01")).toString());

        let proxy1 = await view.getProxyForSpecificId(
        user1.address,
        coinTool.address,
        1,
        "0x01"
        );
        console.log("proxy add for 1: ",proxy1);


        let signer1 = await ethers.getSigner(proxy1)

        // console.log("signer:  ",signer1);
        let proxy1Interaction = await xenCrypto.connect(signer1)
        console.log("info from proxy1: ", await proxy1Interaction.getUserMint());
        
       console.log("........................ get array list.......................")
       let byteCode = await view.getByteCode(coinTool.address);
       console.log("byteCode: ",byteCode);
       let amountProxy = (await coinTool.map(user1.address,"0x01")).toString();
       console.log(amountProxy)
    
       let i=1;
       let addresses=[];
       for(i=1;i<=parseInt(amountProxy);i++){
            let prx = await view.getProxyForSpecificId(
                user1.address,
                coinTool.address,
                i,
                "0x01"
                );
            
            addresses.push(prx);
       }
       console.log("address list:",addresses); 
    })

    it.only("should try to claim tokens from a different smart contract but using the same PROXY",async()=>{
        // we have dataT for 2 days so we need to wait 2 days for the proxys to work
        let dataT= `0x59635f6f000000000000000000000000${xenCrypto.address.slice(2)}000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000`
        let dataF= `0x59635f6f000000000000000000000000${xenCrypto.address.slice(2)}000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000441c560305000000000000000000000000${user1.address.slice(2)}000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000`
        console.log("coinToolAdd: ",coinTool.address);

        await coinTool.t(10,dataT,"0x01");
        console.log("sent T");
 
        console.log("we have this many proxies: ",(await coinTool.map(user1.address,"0x01")).toString());

        console.log("contract balance before F: ",(await xenCrypto.balanceOf(user1.address)).toString());

        await hre.ethers.provider.send("evm_increaseTime", [60 * 60 * 24 *2])
        await hre.ethers.provider.send("evm_mine")

        console.log("doing F...");
        await coinTool.f([1],dataF,"0x01");
        console.log("contract balance after F: ",(await xenCrypto.balanceOf(user1.address)).toString());

        await coinTool.f([2,3,4,5],dataF,"0x01");
        console.log("contract balance after F 1: ",(await xenCrypto.balanceOf(user1.address)).toString());
        await coinTool.f([6],dataF,"0x01");
        console.log("contract balance after F 2: ",(await xenCrypto.balanceOf(user1.address)).toString());

        await coinTool.f([2],dataF,"0x01");
        console.log("contract balance after F 3: ",(await xenCrypto.balanceOf(user1.address)).toString());
        await coinTool.f([2,3,4,5],dataF,"0x01");
        await coinTool.f([6],dataF,"0x01");
        await coinTool.f([1],dataF,"0x01");

        console.log("contract balance after F 4: ",(await xenCrypto.balanceOf(user1.address)).toString());

        await coinTool.f([7],dataF,"0x01");    
        console.log("contract balance after F 5: ",(await xenCrypto.balanceOf(user1.address)).toString());

        await coinTool.f([10],dataF,"0x01");    
        console.log("contract balance after F 5: ",(await xenCrypto.balanceOf(user1.address)).toString());
        await coinTool.f([11],dataF,"0x01");    
        console.log("contract balance after F 5: ",(await xenCrypto.balanceOf(user1.address)).toString());
        let amountProxy = (await coinTool.map(user1.address,"0x01")).toString();
        console.log(amountProxy)
     
        let i=1;
        let addresses=[];
        for(i=1;i<=parseInt(amountProxy);i++){
             let prx = await view.getProxyForSpecificId(
                 user1.address,
                 coinTool.address,
                 i,
                 "0x01"
                 );
             
             addresses.push(prx);
        }
        console.log("address list:",addresses); 
    })
    it("should try with normal xen claim rank ",async()=>{
        // test with normal claimRank/claimMintReward
        // console.log("balance: ",await xenCrypto.balanceOf(user1.address));

        // await xenCrypto.claimRank(1);
        // console.log("user info about xen mints: ",await xenCrypto.getUserMint());
        // await hre.ethers.provider.send("evm_increaseTime", [60 * 60 * 24 *1])
        // await hre.ethers.provider.send("evm_mine")
        // await xenCrypto.claimMintReward();
   
        // console.log("balance: ",await xenCrypto.balanceOf(user1.address));
    })

    it("make a T , 1 day pass and proxy try to get the tokens without the coinTool",async()=>{
        let dataT= `0x59635f6f000000000000000000000000${xenCrypto.address.slice(2)}000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000`
        let dataF= `0x59635f6f000000000000000000000000${xenCrypto.address.slice(2)}000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000441c560305000000000000000000000000${user1.address.slice(2)}000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000`
        console.log("coinTool add: ",coinTool.address);
        console.log("user1 add: ",user1.address);
        console.log("xenCrypto add: ",xenCrypto.address);
        await coinTool.t(10,dataT,"0x01");
        console.log("sent T");
 
        console.log("we have this many proxies: ",(await coinTool.map(user1.address,"0x01")).toString());


        await hre.ethers.provider.send("evm_increaseTime", [60 * 60 * 24 *2])
        await hre.ethers.provider.send("evm_mine")

        let proxy1 = await view.getProxyForSpecificId(
            user1.address,
            coinTool.address,
            1,
            "0x01"
            );
            console.log("proxy add for 1: ",proxy1);

        let signer1 = await ethers.getSigner(proxy1)

        // console.log("signer:  ",signer1);
        let proxy1Interaction = await xenCrypto.connect(signer1)
        console.log("info from proxy1: ", await proxy1Interaction.getUserMint());
        console.log("balance proxy1: ",(await proxy1Interaction.balanceOf(proxy1)).toString());
        console.log("balance user1: ",(await xenCrypto.balanceOf(user1.address)).toString());

        // await proxy1Interaction.claimMintReward();
        // console.log("claim")
        // console.log("balance proxy1: ",(await xenCrypto.balanceOf(proxy1)).toString());
        // console.log("balance user1: ",(await xenCrypto.balanceOf(user1.address)).toString());

        await hre.ethers.provider.send("evm_increaseTime", [60 * 60 * 24 *2])
        await hre.ethers.provider.send("evm_mine")

        console.log("doing F...");

        await coinTool.f([1],dataF,"0x01");
        console.log("contract balance after F: ",(await xenCrypto.balanceOf(user1.address)).toString());

        console.log("CALL WITH VIEW")

        let proxy3 = await view.getProxyForSpecificId(
            user1.address,
            coinTool.address,
            3,
            "0x01"
            );
            console.log("proxy add for 3: ",proxy3);

            let signer3 = await ethers.getSigner(proxy3)
            let proxy3Interaction = await xenCrypto.connect(signer3)
            console.log("info from proxy3: ", await proxy3Interaction.getUserMint());


        console.log("view address: ",view.address);
        await view.makeCallForSpecificProxy(user1.address, coinTool.address,3,"0x01",dataF);
        console.log("contract balance after F: ",(await xenCrypto.balanceOf(user1.address)).toString());

    })


});

/*
ziua 1
3300000000000000000000
ziua2:
2145000000000000000000
ziua 6:
924000000000000000000
ziua 100:
33000000000000000000
*/