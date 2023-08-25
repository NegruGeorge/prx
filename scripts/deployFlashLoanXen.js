
const hre = require("hardhat");

async function main() {
  const FlashLoanXen = await hre.ethers.getContractFactory(FlashLoanXen);
  //PoolAddressesProvider-Aave is 0xc4...
  const flashLoan = await FlashLoanXen.deploy("0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D");

  await FlashLoanXen.deployed();
  console.log("Flash loan xen contract deployed at address: ", flashLoan.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
