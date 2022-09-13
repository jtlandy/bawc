// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { deployMembershipNFT } from "../helpers/contracts-deployments";
import { names, classes, uris, counts } from "../helpers/constants";
import { getEthersSigners } from "../helpers/contracts-helpers";
import { initAddresses, addresses } from "./common";




async function main() {

  const [deployer] = await getEthersSigners();
  const deployerAddress = await deployer.getAddress();
  initAddresses(deployerAddress);
  console.log("Deploying contracts with the account: ", deployerAddress);
  const contract = await deployMembershipNFT(
    [
      names,
      classes,
      uris,
      counts
    ],
    true,
    5
  );
  console.log("MembershipNFT deployed to: ", contract.address);
  console.log("ownkTreasury: ", addresses.ownkTreasury);
  await (await contract.setupPool(addresses.ownkTreasury)).wait(1);
  await (await contract.mintToPool()).wait(1);
  // await contract.mint(addresses.ownkTreasury, counts[0], 0);
  // await contract.mint(addresses.ownkTreasury, counts[1], 1);
  console.log("Finishied minting process");
  //await contract.mintToPool();
  // NFT token pool account allows SaleContract to be able to transfer NFTs from the pool to users.
  // await liveEnv.membershipNFT.connect(owner.signer).setApprovalForAll(liveEnv.saleContract.address, true);
  // await nftInstance.setApprovalForAll(liveEnv.saleContract.address, true, {from: tokenPoolAddress});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
