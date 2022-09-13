import { hardhatArguments } from "hardhat";
import { string } from "hardhat/internal/core/params/argumentTypes";
import { GiftContractV2__factory, MembershipNFT__factory, OwndToken__factory, SaleContract__factory } from "../../typechain-types";
import { getEthersSigners } from "./contracts-helpers";
import { getDb } from "./misc-utils";
import { eContractid, tEthereumAddress } from "./types";
import hre from "hardhat";


export const getFirstSigner = async () => (await getEthersSigners())[0];

export const getMembershipNFT = async (address?: tEthereumAddress) =>
    await MembershipNFT__factory.connect(
        address ||
        (
            await getDb().get(`${eContractid.MembershipNFT}.${hre.network.name}`).value()
        ).address,
        await getFirstSigner()
    );
export const getGiftContractV2 = async (address?: tEthereumAddress) =>
    await GiftContractV2__factory.connect(
        address ||
        (
            await getDb().get(`${eContractid.GiftContractV2}.${hre.network.name}`).value()
        ).address,
        await getFirstSigner()
    );
export const getSaleContract = async (address?: tEthereumAddress) =>
    await SaleContract__factory.connect(
        address ||
        (
            await getDb().get(`${eContractid.SaleContract}.${hre.network.name}`).value()
        ).address,
        await getFirstSigner()
    );
export const getOWNDContract = async (address?: tEthereumAddress) =>
    await OwndToken__factory.connect(
        address ||
        (
            await getDb().get(`${eContractid.OwndContract}.${hre.network.name}`).value()
        ).address,
        await getFirstSigner()
    );    