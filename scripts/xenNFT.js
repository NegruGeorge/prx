// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const axios = require("axios")
async function main() {
 

axios.get("https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings?limit=1")
.then(res=>{
    console.log("then............")
    console.log(res);
}).catch(err=>{
    console.log("err.......")
    console.log(err);
})
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
