// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";
import { deployGiftContractV2 } from "../helpers/contracts-deployments";
import { getEthersSigners } from "../helpers/contracts-helpers";
import { addresses, initAddresses } from "./common";
import { getMembershipNFT } from "../helpers/contracts-getters";


async function main() {
  const [deployer] = await getEthersSigners();
  const deployerAddress = await deployer.getAddress();

  initAddresses(deployerAddress);
  console.log("Deploying contracts with the account: ", deployerAddress);
  const nftInstance = await getMembershipNFT();

  if (hre.network.name == "rinkeby") {
    console.log("MembershipNFT addresss: ", nftInstance.address);
    console.log("My account3 address: ", addresses.ownkTreasury);
    console.log("my account2 address: ", addresses.signerAddress);

  } else if (hre.network.name == "ethmainnet") {
    console.log("MembershipNFT addresss: ", nftInstance.address);
    console.log("William's address: ", addresses.ownkTreasury);
    console.log("Kelvin's address: ", addresses.signerAddress);
  } else {
    console.log("MembershipNFT addresss: ", nftInstance.address);
    console.log("Ownk Treasury address: ", addresses.ownkTreasury);
    console.log("Ownk signer address: ", addresses.signerAddress);
  }


  const contract = await deployGiftContractV2(nftInstance.address, addresses.ownkTreasury, true, 5);
  console.log("GiftContractV2 deployed to: ", contract.address);

  await (await contract.grantRole(await contract.OWNER_ROLE(), addresses.ownkTreasury)).wait(1);
  await (await contract.grantRole(await contract.MINTER_ROLE(), addresses.signerAddress)).wait(1);
  console.log("Granted GiftContractV2 a Minter role to: ", addresses.signerAddress);
  console.log("Granted GiftContractV2 a Minter role to: ", addresses.ownkTreasury);


  //await nftInstance.setApprovalForAll(contract.address, true, { from: addresses.ownkTreasury });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
