
import chai from "chai";
import { ethers } from "hardhat";
import { uritoJson } from "../scripts/helpers/cast-utils";
import { makeSuite, TestEnv, SignerWithAddress } from "./helpers/make-suite";
const { expect } = chai;

import { names, classes, uris, counts, DEFAULT_PRICES } from "./helpers/constants";
import { BigNumber, Bytes, Signer } from "ethers";
import { SaleContract } from "../typechain-types";
/**
 * Signer
Account #3: 0x90f79bf6eb2c4f870365e785982e1f101e93b906 (10000 ETH)
Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6
 */


makeSuite("SaleContract: signed buy", (testEnv: TestEnv) => {
    let admin: SignerWithAddress, owner: SignerWithAddress, signer: SignerWithAddress, contract: SaleContract;
    before(async () => {
        // for (let i = 0; i < counts.length; i++) {
        //     await testEnv.membershipNFT.mint(testEnv.owner.address, counts[i], i);
        // }
        await testEnv.membershipNFT.setupPool(testEnv.owner.address);
        await testEnv.membershipNFT.mintToPool();

        contract = testEnv.saleContract;
        admin = testEnv.admin;
        owner = testEnv.owner;
        signer = testEnv.signer;

        // NFT token pool account allows SaleContract to be able to transfer NFTs from the pool to users.
        await testEnv.membershipNFT.connect(owner.signer).setApprovalForAll(contract.address, true);
        for (const i of [0, 1])
            await contract.setDefaultPrice(i, ethers.utils.parseEther(DEFAULT_PRICES[i]));

        await contract.setSigner(signer.address);

    });

    const createSignature = async (hashmsg: string | Bytes): Promise<string> => {

        const messageBytes = ethers.utils.arrayify(hashmsg);
        const signature = await signer.signer.signMessage(messageBytes);
        return signature;
    }
    const createHash = (params?: any) => {
        const user = testEnv.users[0] as SignerWithAddress;
        params = { sender: testEnv.users[0].address, quantity: 1, coupon: "0123456789", ...params };
        let messageHash = ethers.utils.solidityKeccak256(
            ["address", "uint256", "string"],
            [params.sender, params.quantity, params.coupon]
        );
        
        /*
        // Testing web3 and ethers for the same hash result : OK
        let msgHash = ethers.utils.id(user.address);
        let msgHash2 = ethers.utils.solidityKeccak256(
            ["string"],
            [params.sender]
        );
        expect(msgHash).to.be.equals(msgHash2);
        */
        return messageHash;
    }
    const tx = async (user: SignerWithAddress, hash: string, cig: string, coupon: string, tier: number, qty: number, price: string) =>
        contract.connect(user.signer).signBuy(hash, cig, coupon, tier, qty, { value: ethers.utils.parseEther(price) });

    it("check signer address", async () => {
        expect(signer.address.toLowerCase()).to.be.equal("0x90f79bf6eb2c4f870365e785982e1f101e93b906");
    })
    it("check contract signer", async () => {
        expect(await contract.getSigner()).to.be.equal(signer.address);
    })
    it("can check signuare", async () => {
        const hash = createHash();
        console.log("Hash of params: ", hash);

        const cig = await createSignature(hash);
        console.log("Hash's Signature: ", cig);
    })
    it("can buy with signature", async () => {
        const user = testEnv.users[0];
        const tierIndex = 0, qty = 1, coupon = "0000000001";
        const hash = createHash({ sender: user.address, quantity: qty, coupon: coupon });
        const cig = await createSignature(hash);

        // Be reverted with wrong hash and signature
        await expect(tx(user, "0x5956cd9289d416e534c927230e2589998d4648d29bfc0588678aab7d2dce989d", 
        "0x0bc84f21ac51eda5f4e513a6a3fcef02bbe4ce806d2820a0e93580728fddd73317f6e2717016c91392ad76406e60fbbdd018d5cf75f4f8db27d0870df11426d41c", 
        coupon, tierIndex, qty, "0.75")).to.be.revertedWith("DIRECT_BUY_DISALLOWED");

        //Be reverted due to whitelist registration 
        await expect(tx(user, hash, cig, coupon, tierIndex, qty, "0.75")).to.be.revertedWith("NOT_QUALIFIED");

        // Processed successfully
        await contract.addToWhitelist([user.address]);
        await tx(user, hash, cig, coupon, tierIndex, qty, "0.75");
        // Check balances
        expect(await testEnv.membershipNFT.balanceOf(user.address)).to.be.equal(1);
        expect(await testEnv.membershipNFT.balanceOf(owner.address)).to.be.equal(parseInt(counts[0])+parseInt(counts[1])-1);
        expect(await contract.balanceOf(user.address, 0)).to.be.equal(1);
        expect(await contract.balanceOf(user.address, 1)).to.be.equal(0);

    })
    it("can't use the same coupon code", async() =>{
        const user = testEnv.users[1];
        const tierIndex = 0, qty = 1, coupon = "0000000001";
        const hash = createHash({ sender: user.address, quantity: qty, coupon: coupon });
        const cig = await createSignature(hash);
        
        await contract.addToWhitelist([user.address]);
        await expect(tx(user, hash, cig, coupon, tierIndex, qty, "0.75")).to.be.revertedWith("HASH_USED");
    })
    it("can't forge params", async() =>{
        const user = testEnv.users[1];
        const tierIndex = 0, qty = 1, coupon = "0000000002";
        const hash = createHash({ sender: user.address, quantity: qty, coupon: coupon });
        const cig = await createSignature(hash);
        
        await contract.addToWhitelist([user.address]);
        await expect(tx(testEnv.users[2], hash, cig, coupon, tierIndex, qty, "0.75")).to.be.revertedWith("HASH_FAIL");
        await expect(tx(user, hash, cig, "100000000", tierIndex, 3, "0.75")).to.be.revertedWith("HASH_FAIL");
    })
    it("can buy in batch with signature", async () => {
        const user = testEnv.users[0];
        const tierIndex = 0, qty = 1, coupon = "0000000003";
        const tierIndex1 = 1, qty1 = 1;
        const hash = createHash({ sender: user.address, quantity: qty + qty1, coupon: coupon });
        const cig = await createSignature(hash);
        await contract.addToWhitelist([user.address]);
        await contract.connect(user.signer).signBuyEx(hash, cig, coupon, [tierIndex, tierIndex1], [qty, qty1], { value: ethers.utils.parseEther("0.9") });
    })

});