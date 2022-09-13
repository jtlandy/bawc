
import chai from "chai";
import { ethers } from "hardhat";
import { uritoJson } from "../scripts/helpers/cast-utils";
import { makeSuite, TestEnv, SignerWithAddress } from "./helpers/make-suite";
const { expect } = chai;

import { names, classes, uris, counts, DEFAULT_PRICES } from "./helpers/constants";
import { BigNumber } from "ethers";
import { SaleContract } from "../typechain-types";
import { cursorTo } from "readline";

makeSuite("SaleContract: whitelist's buy", (testEnv: TestEnv) => {
    let user: SignerWithAddress, admin: SignerWithAddress, owner: SignerWithAddress, contract: SaleContract;
    before(async () => {
        // for (let i = 0; i < counts.length; i++) {
        //     await testEnv.membershipNFT.mint(testEnv.owner.address, counts[i], i);
        // }
        // console.log("NFT owner address from Env: ", testEnv.owner.address);
        // console.log("NFT owner address from sale contract: ", await testEnv.saleContract.getTokenPool());
        (await testEnv.membershipNFT.setupPool(testEnv.owner.address)).wait(1);
        await testEnv.membershipNFT.mintToPool();

        contract = testEnv.saleContract;
        admin = testEnv.admin;
        owner = testEnv.owner;
        user = testEnv.users[0];

        // NFT token pool account allows SaleContract to be able to transfer NFTs from the pool to users.
        await testEnv.membershipNFT.connect(owner.signer).setApprovalForAll(contract.address, true);
        for (const i of [0, 1])
            await contract.setDefaultPrice(i, ethers.utils.parseEther(DEFAULT_PRICES[i]));

    });

    it("should work with whitelistBuy and whitelistBuyEx", async () => {
        await expect(
            contract.connect(user.signer).whitelistBuy(0, 1)
        ).to.be.revertedWith("NOT_QUALIFIED");

        //Add to whitelist
        await contract.addToWhitelist([user.address]);

        await expect(
            contract.connect(user.signer).whitelistBuy(0, 1, { value: ethers.utils.parseEther("0.1") })
        ).to.be.revertedWith("INSUFFICIENT_PAYMENT");

        // Step 1: Buy 1 token per tier
        await contract.connect(user.signer).whitelistBuy(0, 1, { value: ethers.utils.parseEther("0.75") });
        await contract.connect(user.signer).whitelistBuy(1, 1, { value: ethers.utils.parseEther("0.075") });
        // Check balances
        expect(await testEnv.membershipNFT.balanceOf(user.address)).to.be.equal(2);
        expect(await testEnv.membershipNFT.balanceOf(owner.address)).to.be.equal(parseInt(counts[0])+parseInt(counts[1])-2);
        expect(await contract.balanceOf(user.address, 0)).to.be.equal(1);
        expect(await contract.balanceOf(user.address, 1)).to.be.equal(1);
        // Check total supply per tier
        expect(await contract.totalSupply(0)).to.be.equal(1);
        expect(await contract.totalSupply(1)).to.be.equal(1);

        // Step 2: Buy two tokens more per tier
        await contract.connect(user.signer).whitelistBuy(0, 2, { value: ethers.utils.parseEther("1.5") });
        await contract.connect(user.signer).whitelistBuy(1, 2, { value: ethers.utils.parseEther("0.15") });
        expect(await testEnv.membershipNFT.balanceOf(user.address)).to.be.equal(6);
        expect(await testEnv.membershipNFT.balanceOf(owner.address)).to.be.equal(parseInt(counts[0])+ parseInt(counts[1]) - 6);
        expect(await contract.balanceOf(user.address, 0)).to.be.equal(3);
        expect(await contract.balanceOf(user.address, 1)).to.be.equal(3);
        // Check total supply per tier
        expect(await contract.totalSupply(0)).to.be.equal(3);
        expect(await contract.totalSupply(1)).to.be.equal(3);

        //Step 3: Buy 1 token more per tier
        await expect(
            contract.connect(user.signer).whitelistBuyEx([0, 1], [1, 1], { value: ethers.utils.parseEther("0.9") })
        ).to.be.revertedWith("EXCEED_ALLOC");
        await expect(
            contract.connect(user.signer).whitelistBuy(1, 1, { value: ethers.utils.parseEther("0.075") })
        ).to.be.revertedWith("EXCEED_ALLOC");
    });

});