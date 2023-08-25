
const hre = require("hardhat");

async function main() {
  // base goerli 0x18e37E322C432ed4b3a78d0DcF79dFEc97CfC57b
  // adauga adresa de xen de pe base
  const xenCryptoAddress = "0x9A74084370c9A43fA0b9B0185d64968870ec531f"

  // !!!!! MANDATORY sa schimbati !!!!!
  // adresa cu care ati facut mint si vreti dati CLAIM:
  let userAddress = "0x2dAD87948265Fb9a64F1532fe6d0BfF12dFBeED1"


  let dataF= `0x59635f6f000000000000000000000000${xenCryptoAddress.slice(2)}000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000441c560305000000000000000000000000${userAddress.slice(2)}000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000`

  const CointTool = await hre.ethers.getContractFactory("CoinTool_App");
  const coinTool = await hre.ethers.getContractAt("CoinTool_App", "0x18e37E322C432ed4b3a78d0DcF79dFEc97CfC57b");

  console.log("redeeem...");

  // in array se pune ce adrese vreti sa scoateti => e.g
  // e.g daca aveti 10 adresse aveti array [1,2...,10], 
  await coinTool.f([3,4],dataF,"0x01");
   console.log("redeemed");

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
