import { hasValues } from "../helpers/cast-utils";
import { tEthereumAddress } from "../helpers/types";

export interface Addresses {
    deployerAddress: tEthereumAddress;
    ownkTreasury: tEthereumAddress;
    owndTreasury: tEthereumAddress;
    signerAddress: tEthereumAddress;
    ethersAddress: tEthereumAddress;
  }

// Mainnet
// export const addresses: Addresses = {
//     deployerAddress: {} as tEthereumAddress,
//     ownkTreasury: "0x14220ef0a3D29553ad73829E036Fab6707c33Fc0", // Will's Live account
//     signerAddress: "0x3aC0e043AD218a854D7Fda76CEC09Cf932da56Ec", // Kel's Live account
//     owndTreasury: "0x7aE3D1377EFe811428D0D5522807FEd6A41DbF26",
//     ethersAddress: "0xDbA31A76eA8D99329Df0adA09B6668Ad17f0639D",
//   }

// Testnet
export const addresses: Addresses = {
  deployerAddress: {} as tEthereumAddress,
  ownkTreasury: "0x08B9695cf8CC444f776D874BfF90A96492430074", // my testnet account 3
  signerAddress: "0xc069A80c69f6C1A991498cA74c3c9072c4659e8b", // My testnet account 2
  owndTreasury: "0x7aE3D1377EFe811428D0D5522807FEd6A41DbF26",
  ethersAddress: "0xDbA31A76eA8D99329Df0adA09B6668Ad17f0639D",
}
/**
 *
  NFT treasury: 0x14220ef0a3D29553ad73829E036Fab6707c33Fc0

  ERC20 treasury: 0x7aE3D1377EFe811428D0D5522807FEd6A41DbF26
  Amount: 1,000,000,000
  Name: OWNED
  Symbol:OWND
  Ethers: 0xDbA31A76eA8D99329Df0adA09B6668Ad17f0639D
 */

export const initAddresses = (defaultAddress: tEthereumAddress) => {

  if(!hasValues(addresses.deployerAddress))
    addresses.deployerAddress = defaultAddress;
  
  if(!hasValues(addresses.ownkTreasury))
    addresses.ownkTreasury = defaultAddress;
  
  if(!hasValues(addresses.owndTreasury))
    addresses.owndTreasury = defaultAddress;
  
  if(!hasValues(addresses.signerAddress))
    addresses.signerAddress = defaultAddress;
    
  if(!hasValues(addresses.ethersAddress))
    addresses.ethersAddress = defaultAddress;
  
}
