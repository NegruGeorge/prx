
const hre = require("hardhat");

async function main() {
  // cointoolAdd baseGoerli: 0x18e37E322C432ed4b3a78d0DcF79dFEc97CfC57b
  const xenCryptoAddress = "0x9A74084370c9A43fA0b9B0185d64968870ec531f"

  const CointTool = await hre.ethers.getContractFactory("CoinTool_App");
  const coinTool = await hre.ethers.getContractAt("CoinTool_App", "0x18e37E322C432ed4b3a78d0DcF79dFEc97CfC57b");

  // cointToolViewr = 0x2C5792AF38b5477ce5dE5d05fBF51C0F7e0Bd936
  const View = await hre.ethers.getContractFactory("CoinToolBatchMinterView");
  const view = await hre.ethers.getContractAt("CoinToolBatchMinterView", "0x2C5792AF38b5477ce5dE5d05fBF51C0F7e0Bd936");

  // const view = CointTool.attach("0x2C5792AF38b5477ce5dE5d05fBF51C0F7e0Bd936")

  // adresa cu care ati facut mint si vreti sa vedeti cate adrese aveti:
  let userAddress = "0x2dAD87948265Fb9a64F1532fe6d0BfF12dFBeED1"
  
  let amountProxy = (await coinTool.map(userAddress,"0x01")).toString();
  console.log(amountProxy)

  let i=1;
  let addresses=[];
  for(i=1;i<=parseInt(amountProxy);i++){
       let prx = await view.getProxyForSpecificId(
           userAddress,
           coinTool.address,
           i,
           "0x01"
           );
       
       addresses.push(prx);
  }
  console.log("address list:",addresses); 
 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
