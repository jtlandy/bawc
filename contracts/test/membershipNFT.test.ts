
import chai from "chai";
import { ethers } from "hardhat";
import { uritoJson } from "../scripts/helpers/cast-utils";
import { makeSuite, TestEnv, SignerWithAddress } from "./helpers/make-suite";
const { expect } = chai;

import { names, classes, uris, counts } from "./helpers/constants";
import { any } from "hardhat/internal/core/params/argumentTypes";
import { BigNumber } from "ethers";

makeSuite("MebershipNFT", (testEnv: TestEnv) => {
    let owner: any, holder: any, user: SignerWithAddress, userAddress: string;
    before(async () => {
        [owner, holder] = await ethers.getSigners();
        user = testEnv.users[0];
        userAddress = user.address;
    });
    it("Should be an owner", async () => {
        const deployer = await testEnv.membershipNFT.owner();
        expect(owner.address).to.equal(deployer);
    });
    it("Shouldn't be minted by a user", async () => {
        console.log("User address: %s", userAddress);
        await expect(
            testEnv.membershipNFT.connect(user.signer).mint(userAddress, counts[0], 0)
        ).to.be.revertedWith("Ownable: caller is not the owner");

    });
    it("Should be minted by owner", async () => {
        console.log("Minting %s NFTs for %s...", counts[0], classes[0]);
        await testEnv.membershipNFT.connect(owner).mint(holder.address, counts[0], 0);
        // await expect(
        //     testEnv.membershipNFT.connect(owner).mint(holder.address, counts[0], 0)
        // ).not.to.be.reverted;

        console.log("Minting %s NFTs for %s...", counts[1], classes[1]);
        await testEnv.membershipNFT.connect(owner).mint(holder.address, counts[1], 1);
        // await expect(
        //     testEnv.membershipNFT.connect(owner).mint(holder.address, counts[1], 1)
        // ).not.to.be.reverted;
        console.log("TierSupply 0 = ", await testEnv.membershipNFT.tierSupply(0));
        console.log("TierSupply 1 = ", await testEnv.membershipNFT.tierSupply(1));
        const holderBalance = await testEnv.membershipNFT.balanceOf(holder.address);
        expect(holderBalance).to.be.equal(parseInt(counts[0]) + parseInt(counts[1]));
        console.log("Metadata:", await testEnv.membershipNFT.tokenURI(counts[0]));
    });

    it("Should be transferred", async () => {
        const contract = testEnv.membershipNFT;
        // holder -> owner
        //await contract.connect(holder).approve(owner.address, 1);
        await contract.connect(holder).transferFrom(holder.address, owner.address, 1);
        expect(await contract.balanceOf(owner.address)).to.be.equal(1);
        // owner -> holder
        await contract.connect(owner).approve(holder.address, 1);
        await contract.connect(holder).transferFrom(owner.address, holder.address, 1);
        expect(await contract.balanceOf(owner.address)).to.be.equal(0);

    });
    it("Should be locked", async () => {
        const contract = testEnv.membershipNFT;
        await contract.connect(owner).toggleLock();
        await expect(
            contract.connect(holder).transferFrom(holder.address, owner.address, 1)
        ).to.be.revertedWith("MembershipNFT: can't operate - currently locked");

    });
    it("Should check tokenURI boundary", async () => {
        const contract = testEnv.membershipNFT;
        const t00 = await contract.tokenURI(1);
        const t0n = await contract.tokenURI(parseInt(counts[0]));
        const t10 = await contract.tokenURI(parseInt(counts[0])+1);
        const t1n = await contract.tokenURI(parseInt(counts[0]) + parseInt(counts[1]));

        const j_t00 = uritoJson(t00);
        const j_t0n = uritoJson(t0n);
        const j_t10 = uritoJson(t10);
        const j_t1n = uritoJson(t1n);
        expect(j_t00.attributes[0]["value"]).to.equal(classes[0]);
        expect(j_t10.attributes[0]["value"]).to.equal(classes[1]);
        expect(j_t00.attributes[0]["value"]).to.equal(j_t0n.attributes[0]["value"]);
        expect(j_t10.attributes[0]["value"]).to.equal(j_t1n.attributes[0]["value"]);

        console.log("Sample TokenURI = %s ", JSON.stringify(j_t00))
    });


});