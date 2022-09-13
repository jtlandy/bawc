
import chai from "chai";
import { ethers } from "hardhat";
import { makeSuite, TestEnv, SignerWithAddress } from "./helpers/make-suite";
const { expect } = chai;
import { GiftContractV2 } from "../typechain-types";
import { counts } from "./helpers/constants";
import { BigNumber } from "ethers";

makeSuite("GiftContractV2", (testEnv: TestEnv) => {
    let admin: SignerWithAddress, owner: SignerWithAddress, minter: SignerWithAddress, contract: GiftContractV2;
    before(async () => {

        (await testEnv.membershipNFT.setupPool(testEnv.owner.address)).wait(1);
        await testEnv.membershipNFT.mintToPool();

        contract = testEnv.giftContractV2;
        admin = testEnv.admin;
        owner = testEnv.owner;
        minter = testEnv.minter;


        // NFT token pool account allows SaleContract to be able to transfer NFTs from the pool to users.
        await testEnv.membershipNFT.connect(owner.signer).setApprovalForAll(contract.address, true);

    });
    it("0. Should set up admins", async () => {
        const ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
        const OWNER_ROLE = await contract.OWNER_ROLE();
        const MINTER_ROLE = await contract.MINTER_ROLE();
        await contract.grantRole(ADMIN_ROLE, admin.address);
        await contract.grantRole(OWNER_ROLE, owner.address);
        await contract.grantRole(MINTER_ROLE, minter.address);
    });

    // Submit funciton 
    it("1. Submit: should revert with invalid tier and token", async () => {
        const user: SignerWithAddress = testEnv.users[0];
        console.log(await testEnv.membershipNFT.defaultTiers(0));
        console.log(await testEnv.membershipNFT.defaultTiers(1));
        //GIFT_INVALID_TIER
        await expect(contract.connect(admin.signer).submit(user.address, 0, parseInt(counts[0]) + 1, "0x00")).to.be.revertedWith("GIFT_INVALID_TIER");
        await expect(contract.connect(admin.signer).submit(user.address, 0, parseInt(counts[0]) + parseInt(counts[1]), "0x00")).to.be.revertedWith("GIFT_INVALID_TIER");
        await expect(contract.connect(admin.signer).submit(user.address, 1, 1, "0x00")).to.be.revertedWith("GIFT_INVALID_TIER");
        await expect(contract.connect(admin.signer).submit(user.address, 1, parseInt(counts[0]), "0x00")).to.be.revertedWith("GIFT_INVALID_TIER");
        //GIFT_RESERVE_LIMITED
        await contract.setGiftReserve([0, 0]);
        await expect(contract.connect(admin.signer).submit(user.address, 0, 1, "0x00")).to.be.revertedWith("GIFT_RESERVE_LIMITED");
        //GIFT_INVALID_TOKENID
        await expect(contract.connect(admin.signer).submit(user.address, 0, parseInt(counts[0]) + parseInt(counts[1]) + 1, "0x00")).to.be.reverted;

    });

    it("2. Submit: should revert with GIFT_SUBMITTED_ALREADY", async () => {
        const user: SignerWithAddress = testEnv.users[0];
        await contract.setGiftReserve([2, 2]);
        let tokenId = 1;
        await contract.connect(admin.signer).submit(user.address, 0, tokenId, "0x00");
        await expect(contract.connect(admin.signer).submit(user.address, 0, tokenId, "0x00")).to.be.revertedWith("GIFT_SUBMITTED_ALREADY");
        expect(await contract.getTransactionCount()).to.be.equal(1);

        expect((await contract.getTransaction(0)).tokenId).to.be.equals(tokenId);
        expect((await contract.getTransaction(0)).numConfirmations).to.be.equals(0);

        tokenId = parseInt(counts[0]) + 1;
        await contract.connect(admin.signer).submit(user.address, 1, tokenId, "0x00");
        await expect(contract.connect(admin.signer).submit(user.address, 1, tokenId, "0x00")).to.be.revertedWith("GIFT_SUBMITTED_ALREADY");
        expect(await contract.getTransactionCount()).to.be.equal(2);

        expect((await contract.getTransaction(1)).tokenId).to.be.equals(tokenId);
        expect((await contract.getTransaction(1)).numConfirmations).to.be.equals(0);

    });
    it("3. Confirm: should confirm a transaction", async () => {
        await contract.connect(admin.signer).confirm(0);
        const txn = await contract.getTransaction(0);
        expect(txn.numConfirmations).to.be.equals(1);
    });
    it("4. Confirm: should revert with tx already confirmed", async () => {
        await expect(contract.connect(admin.signer).confirm(0)).to.be.revertedWith("tx already confirmed");
    });
    it("5. Confirm: should be confirmed by the other", async () => {
        await contract.connect(owner.signer).confirm(0);
        const txn = await contract.getTransaction(0);
        expect(txn.numConfirmations).to.be.equals(2);
        expect(txn.executed).to.be.equals(false);
    });
    it("6. Execute: should be done", async () => {
        await contract.connect(owner.signer).execute(0);
        const txn = await contract.getTransaction(0);
        expect(txn.executed).to.be.equals(true);
    });
    it("7. Execute: should revert with tx already executed", async () => {
        await expect(contract.connect(admin.signer).execute(0)).to.be.revertedWith("tx already executed");
    });
    it("8. Submit: should revert with GIFT_NOT_EXIST", async () => {
        const user: SignerWithAddress = testEnv.users[0];
        let tokenId = "1";
        await expect(contract.connect(admin.signer).submit(user.address, 0, tokenId, "0x00")).to.be.revertedWith("GIFT_NOT_EXIST");
    });
    it("9. Execute: should revert with GIFT_NOT_CONFIRMED", async () => {
        const user: SignerWithAddress = testEnv.users[0];
        await expect(contract.connect(admin.signer).execute(1)).to.be.revertedWith("GIFT_NOT_CONFIRMED");
    });
    it("10. Revoke: should revert with tx already executed", async () => {
        const user: SignerWithAddress = testEnv.users[0];
        await expect(contract.connect(admin.signer).revoke(0)).to.be.revertedWith("tx already executed");
    });
    it("11. Revoke: should be reverted", async () => {
        await contract.connect(admin.signer).confirm(1);
        await contract.connect(owner.signer).confirm(1);

        let txn = await contract.getTransaction(1);
        expect(txn.numConfirmations).to.be.equals(2);
        expect(txn.executed).to.be.equals(false);

        await contract.connect(admin.signer).revoke(1);
        txn = await contract.getTransaction(1);
        expect(txn.numConfirmations).to.be.equals(1);
        await expect(contract.connect(admin.signer).revoke(1)).to.be.revertedWith("tx not confirmed");

        await contract.connect(owner.signer).revoke(1);
        txn = await contract.getTransaction(1);
        expect(txn.numConfirmations).to.be.equals(0);
        await expect(contract.connect(owner.signer).revoke(1)).to.be.revertedWith("tx already reverted");
        expect(txn.executed).to.be.equals(false);
        expect(txn.reverted).to.be.equals(true);
    });
    it("12. Confirm: should be reverted with tx already reverted", async () => {
        await expect(contract.connect(admin.signer).confirm(1)).to.be.revertedWith("tx already reverted");
    });
    it("13. Submit, Confirm, Exectue with reverted token", async () => {
        const user: SignerWithAddress = testEnv.users[0];
        let tokenId = parseInt(counts[0]) + 1;
        await contract.connect(admin.signer).submit(user.address, 1, tokenId, "0x00");
        await contract.connect(owner.signer).confirm(2);
        await contract.connect(minter.signer).confirm(2);
        await contract.connect(admin.signer).execute(2);
    });
    it("14. should check reserve", async () => {
        await contract.setGiftReserve([1, 1]);
        const user: SignerWithAddress = testEnv.users[0];
        await expect(contract.connect(admin.signer).submit(user.address, 0, 2, "0x00")).to.be.revertedWith("GIFT_RESERVE_LIMITED");

        await contract.setGiftReserve([2, 0]);
        await contract.setGiftLimit(0, 3);
        await contract.connect(admin.signer).submit(user.address, 0, 2, "0x00");
        await expect(contract.connect(admin.signer).submit(user.address, 0, 3, "0x00")).to.be.revertedWith("GIFT_RESERVE_LIMITED");

        const user1: SignerWithAddress = testEnv.users[1];
        await contract.setGiftReserve([4, 0]);
        await contract.setGiftLimit(0, 1);
        console.log("GiftLimit: ", await contract.giftLimit(0));
        console.log("giftSubmitList[user1][0]: ", await contract.giftSubmitList(user1.address, 0));
        await contract.connect(owner.signer).submit(user1.address, 0, 3, "0x00")
        await expect(contract.connect(owner.signer).submit(user1.address, 0, 4, "0x00")).to.be.revertedWith("GIFT_EXCEED_ALLOC");
    });

    it("15. should submit and confirm a transaction", async () => {

        await contract.setGiftReserve([4, 0]);
        await contract.setGiftLimit(0, 1);
        const user: SignerWithAddress = testEnv.users[2];

        await contract.connect(owner.signer).submitAndConfirm(user.address, 0, 4, "0x00");
        
        const txnCount = (await contract.getTransactionCount()).toNumber();
        console.log("Total Txns Number = ", txnCount);

        await expect(contract.connect(owner.signer).confirm(txnCount - 1)).to.be.revertedWith("tx already confirmed");

        const txn = await contract.getTransaction(txnCount - 1);
        expect(txn.numConfirmations).to.be.equals(1);
        expect(txn.executed).to.be.equals(false);
    });
    it("16. should confirm and execute a transaction", async () => {
        const txnCount = (await contract.getTransactionCount()).toNumber();
        await contract.connect(minter.signer).confirmAndExecute(txnCount - 1);
        await expect(contract.connect(minter.signer).confirm(txnCount - 1)).to.be.revertedWith("tx already executed");

        const txn = await contract.getTransaction(txnCount - 1);
        expect(txn.numConfirmations).to.be.equals(2);
        expect(txn.executed).to.be.equals(true);
    });
    it("17. Gifted Token Ids", async () => {
        console.log("Gifted tokens: ", await contract.getGiftedList());
        console.log("Total Supply: [%s, %s]", await contract.totalSupply(0),await contract.totalSupply(1));
        
    });

});