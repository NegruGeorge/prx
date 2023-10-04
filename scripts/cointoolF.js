
const hre = require("hardhat");

// TO DO TO DO TO DO: 

// trebuie sa schimbati xenCryptoAddress cu adresa de pe base
// trebuie sa schimbati userAddress cu userul vostru (cel cu care vreti sa dati claim)
// COMANDA RUN:
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// COMANDA RUN:

  // npx hardhat run scripts/cointoolF.js --network base 

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

async function main() {
  // base goerli 0x18e37E322C432ed4b3a78d0DcF79dFEc97CfC57b
  // adauga adresa de xen de pe base
  const xenCryptoAddress = "0xffcbF84650cE02DaFE96926B37a0ac5E34932fa5"

  // !!!!! MANDATORY sa schimbati !!!!!
  // adresa cu care ati facut mint si vreti dati CLAIM:
  let userAddress = "0x2dAD87948265Fb9a64F1532fe6d0BfF12dFBeED1"


  let dataF= `0x59635f6f000000000000000000000000${xenCryptoAddress.slice(2)}000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000441c560305000000000000000000000000${userAddress.slice(2)}000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000`

  const CointTool = await hre.ethers.getContractFactory("CoinTool_App");
  const coinTool = await hre.ethers.getContractAt("CoinTool_App", "0x47459F869001aF28Cea2394c59e9EE4145311686");

  console.log("redeeem...");


   // IMPORTANT
  // in array se pune ce adrese vreti sa scoateti => e.g
  // e.g daca aveti 10 adresse aveti array [1,2...,10], => se poate scoate [2,3] => se scoate adresa 2 sau 3
  arrayClaimAddresses= []

  startAddressIndex = 301;
  endAddressIndex = 331;

  for(let i = startAddressIndex; i<=endAddressIndex;i++)
    arrayClaimAddresses.push(i);
  console.log(arrayClaimAddresses)
  // IMPORTANT
  // in array se pune ce adrese vreti sa scoateti => e.g
  // e.g daca aveti 10 adresse aveti array [1,2...,10], 
  await coinTool.f(arrayClaimAddresses,dataF,"0x01");
   console.log("redeemed");

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
