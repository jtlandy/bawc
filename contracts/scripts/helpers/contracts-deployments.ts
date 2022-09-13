
import { MembershipNFT__factory, OwndToken__factory, SaleContract__factory, GiftContractV2__factory } from "../../typechain-types";
import { getFirstSigner } from "./contracts-getters";
import { withSaveAndVerify } from "./contracts-helpers";
import { eContractid, tEthereumAddress } from "./types";

export const deployMembershipNFT = async (
  args: [string[], string[], string[], string[]],
  verify?: boolean,
  confirms: number = 1
) => {
  const instance = await withSaveAndVerify(
    await new MembershipNFT__factory(await getFirstSigner()).deploy(...args),
    eContractid.MembershipNFT,
    [args[0], args[1], args[2], args[3]],
    verify,
    confirms
  );
  return instance;
};

export const deployGiftContractV2 = async (token: tEthereumAddress, pool: tEthereumAddress, verify?: boolean, confirms: number = 1) => {
  const instance = await withSaveAndVerify(
    await new GiftContractV2__factory(await getFirstSigner()).deploy(),
    eContractid.GiftContractV2,
    [],
    verify,
    confirms
  );
  await instance.initialize(token, pool);
  return instance;
}
export const deploySaleContract = async (token: tEthereumAddress, pool: tEthereumAddress, verify?: boolean, confirms: number = 1) => {
  const instance = await withSaveAndVerify(
    await new SaleContract__factory(await getFirstSigner()).deploy(),
    eContractid.SaleContract,
    [],
    verify,
    confirms
  );
  await instance.initialize(token, pool);
  return instance;
}
export const deployOwndContract = async (verify?: boolean, confirms: number = 1) => {
  const instance = await withSaveAndVerify(
    await new OwndToken__factory(await getFirstSigner()).deploy(),
    eContractid.OwndContract,
    [],
    verify,
    confirms
  );
  return instance;
}