
const hre = require("hardhat");

async function main() {
  // base goerli 0x18e37E322C432ed4b3a78d0DcF79dFEc97CfC57b
  // adauga adresa de xen de pe base
  const xenCryptoAddress = "0x9A74084370c9A43fA0b9B0185d64968870ec531f"
  let dataT= `0x59635f6f000000000000000000000000${xenCryptoAddress.slice(2)}000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000`

  const CointTool = await hre.ethers.getContractFactory("CoinTool_App");
  const coinTool = await hre.ethers.getContractAt("CoinTool_App", "0x18e37E322C432ed4b3a78d0DcF79dFEc97CfC57b");

  // const coinTool = CointTool.attach("0x18e37E322C432ed4b3a78d0DcF79dFEc97CfC57b")
  console.log("sendT");

  //setati aici la cati tokeni vreti sa dati mint
 await coinTool.t(10,dataT,"0x01");
 console.log("sent T");

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
