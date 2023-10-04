
const hre = require("hardhat");

async function main() {
  // last view address = 0xf493830d33800035B945598F2520D18060f3e94e


  // adauga adresa de xen de pe base
 const xenCryptoAddress = "0xffcbF84650cE02DaFE96926B37a0ac5E34932fa5"
  const View = await hre.ethers.getContractFactory("CoinToolBatchMinterView");
  const view = await View.deploy(xenCryptoAddress);

  await view.deployed();

  console.log(
    `deployed to ${view.address}`
  );
  console.log(
    `deployed to ${view.address}`
  );
  console.log(
    `deployed to ${view.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
