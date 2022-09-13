import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import hre from "hardhat";
import { initializeMakeSuite } from './helpers/make-suite';
import { getEthersSigners } from "../scripts/helpers/contracts-helpers";
import { deployGiftContractV2, deployMembershipNFT, deploySaleContract } from "../scripts/helpers/contracts-deployments";
import {names, classes, uris, counts} from "./helpers/constants";


const buildTestEnv = async (deployer: Signer, tokenPool: Signer) => {

  const poolAddress = await tokenPool.getAddress();
  const nftInstance = await deployMembershipNFT(
    [
      names,
      classes,
      uris,
      counts
    ]
  );

  await deployGiftContractV2(nftInstance.address, poolAddress);

  await deploySaleContract(nftInstance.address, poolAddress);
}


before(async () => {
  const [deployer, admin, owner] = await getEthersSigners();
  console.log('-> Deploying test environment...');
  await buildTestEnv(deployer, owner);
  
  console.log('--> Deploying test environment...\n');
  await initializeMakeSuite();
  console.log('\n--> Setup finished...\n');
});
