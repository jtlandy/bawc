// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { deployOwndContract, deploySaleContract } from "../helpers/contracts-deployments";
import { TOTAL_SUPPLY_OWND } from "../helpers/constants";
import { getEthersSigners } from "../helpers/contracts-helpers";
import { addresses, initAddresses } from "./common";


async function main() {
  const [deployer] = await getEthersSigners();
  const deployerAddress = await deployer.getAddress();

  initAddresses(deployerAddress);
  console.log("Deploying contracts with the account: ", deployerAddress);
  const contract = await deployOwndContract(true);
  console.log("OWNED contract deployed to: ", contract.address);
  await contract.mint(addresses.owndTreasury, TOTAL_SUPPLY_OWND);
  console.log("Successfully mint to: ", addresses.owndTreasury);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
