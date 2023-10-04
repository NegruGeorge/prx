
const hre = require("hardhat");

// TO DO TO DO TO DO: 

// trebuie sa schimbati xenCryptoAddress cu adresa de pe base
// trebuie sa schimbati userAddress cu userul vostru (cel cu care vreti sa dati claim)
// COMANDA RUN:
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// COMANDA RUN:

  // npx hardhat run scripts/cointoolT.js --network base 

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


async function main() {
  // base cointool  0x47459F869001aF28Cea2394c59e9EE4145311686
  //xen 0xffcbF84650cE02DaFE96926B37a0ac5E34932fa5
  // adauga adresa de xen de pe base
  const xenCryptoAddress = "0xffcbF84650cE02DaFE96926B37a0ac5E34932fa5"

  let dataT= `0x59635f6f000000000000000000000000${xenCryptoAddress.slice(2)}000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000`


  // 0x59635f6f000000000000000000000000ffcbF84650cE02DaFE96926B37a0ac5E34932fa5000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000249ff054df000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000
  const CointTool = await hre.ethers.getContractFactory("CoinTool_App");
  const coinTool = await hre.ethers.getContractAt("CoinTool_App", "0x47459F869001aF28Cea2394c59e9EE4145311686");

  // const coinTool = CointTool.attach("0x47459F869001aF28Cea2394c59e9EE4145311686")
  console.log("sendT");

  //setati aici la cati tokeni vreti sa dati mint
 await coinTool.t(1,dataT,"0x01");
 console.log("sent T");

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
0x47459F869001aF28Cea2394c59e9EE4145311686