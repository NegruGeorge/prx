
const hre = require("hardhat");

// TO DO TO DO TO DO: 

// trebuie sa schimbati xenCryptoAddress cu adresa de pe base
// trebuie sa schimbati userAddress cu userul vostru (cel cu care vreti sa dati claim)
// COMANDA RUN:
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// COMANDA RUN:

  // npx hardhat run scripts/cointoolView.js --network base 

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


async function main() {
  // cointoolAdd baseGoerli: 0x47459F869001aF28Cea2394c59e9EE4145311686
  const xenCryptoAddress = "0xffcbF84650cE02DaFE96926B37a0ac5E34932fa5"

  const CointTool = await hre.ethers.getContractFactory("CoinTool_App");
  const coinTool = await hre.ethers.getContractAt("CoinTool_App", "0x47459F869001aF28Cea2394c59e9EE4145311686");

  // cointToolViewr = 0x2C5792AF38b5477ce5dE5d05fBF51C0F7e0Bd936
  const View = await hre.ethers.getContractFactory("CoinToolBatchMinterView");
  const view = await hre.ethers.getContractAt("CoinToolBatchMinterView", "0xf493830d33800035B945598F2520D18060f3e94e");

  // const view = CointTool.attach("0xf493830d33800035B945598F2520D18060f3e94e")

  // !!! Mandatory de schimbat !!!!
  /// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // adresa cu care ati facut mint si vreti sa vedeti cate adrese aveti:
  let userAddress = "0x2dAD87948265Fb9a64F1532fe6d0BfF12dFBeED1"
  
  let amountProxy = (await coinTool.map(userAddress,"0x01")).toString();
  console.log(amountProxy)

  let i=1;
  let addresses=[];
  // for(i=1;i<=parseInt(amountProxy);i++){
  //      let prx = await view.getProxyForSpecificId(
  //          userAddress,
  //          coinTool.address,
  //          i,
  //          "0x01"
  //          );
       
  //      addresses.push(prx);
  // }
  console.log("address list:",addresses); 
 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
