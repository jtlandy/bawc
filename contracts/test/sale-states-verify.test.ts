
import chai from "chai";
import { ethers } from "hardhat";
import { makeSuite, TestEnv, SignerWithAddress } from "./helpers/make-suite";
const { expect } = chai;

import { DEFAULT_PRICES } from "./helpers/constants";
import { SaleContract } from "../typechain-types";

interface SaleSchedule {
    name: string;
    discount: any;
    startTimestamp: any;
    duration: any;
}


makeSuite("SaleContract: Verify State variables", (testEnv: TestEnv) => {
    let user: SignerWithAddress, admin: SignerWithAddress, owner: SignerWithAddress, contract: SaleContract;
    before(async () => {
        // for (let i = 0; i < counts.length; i++) {
        //     await testEnv.membershipNFT.mint(testEnv.owner.address, counts[i], i);
        // }
        await testEnv.membershipNFT.setupPool(testEnv.owner.address);
        await testEnv.membershipNFT.mintToPool();

        contract = testEnv.saleContract;
        admin = testEnv.admin;
        owner = testEnv.owner;
        user = testEnv.users[0];

        // NFT token pool account allows SaleContract to be able to transfer NFTs from the pool to users.
        await testEnv.membershipNFT.connect(owner.signer).setApprovalForAll(contract.address, true);


    });
    it("should check NFT contract address", async () => {
        expect(await contract.getNftToken()).to.equal(testEnv.membershipNFT.address);
    });
    it("should check token pool account", async () => {
        expect(await contract.getTokenPool()).to.equal(testEnv.owner.address);
    });
    it("Should check discountPrice", async () => {
        const currSchedule: SaleSchedule = await contract.currentSchedule();
        console.dir(currSchedule);
        const discounted = await contract.discountPrice(0, 1);
        console.log("Discounted price:", discounted);
        const defaultPrice0 = await contract.defaultPrices(0);
        const discountPercentage0 = currSchedule.discount;
        const discounted_price0 = defaultPrice0.sub(defaultPrice0.mul(discountPercentage0).div(100));
        expect(discounted).to.be.equal(discounted_price0);
    });
    it("can set default prices", async () => {
        for (const i of [0, 1])
            await contract.setDefaultPrice(i, ethers.utils.parseEther(DEFAULT_PRICES[i]));
    });
    it("can check whitelist", async () => {
        await expect(
            contract.connect(user.signer).whitelistBuy(0, 1)
        ).to.be.revertedWith("NOT_QUALIFIED");

        //Add to whitelist
        await contract.addToWhitelist([user.address]);

        await expect(
            contract.connect(user.signer).whitelistBuy(0, 1, { value: ethers.utils.parseEther("0.1") })
        ).to.be.revertedWith("INSUFFICIENT_PAYMENT");
    });

});