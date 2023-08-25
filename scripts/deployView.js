
const hre = require("hardhat");

async function main() {
  // last view address = 0x2C5792AF38b5477ce5dE5d05fBF51C0F7e0Bd936

  
  // adauga adresa de xen de pe base
 const xenCryptoAddress = "0x9A74084370c9A43fA0b9B0185d64968870ec531f"
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
