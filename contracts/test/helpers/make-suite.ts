import { Signer } from 'ethers';
import chai from 'chai';
import { solidity } from 'ethereum-waffle';
// @ts-ignore
import bignumberChai from 'chai-bignumber';
import { almostEqual } from './almost-equal';
import { tEthereumAddress } from '../../scripts/helpers/types';
import { GiftContractV2, MembershipNFT, SaleContract } from '../../typechain-types';
import { getEthersSigners } from '../../scripts/helpers/contracts-helpers';
import { getGiftContractV2, getMembershipNFT, getSaleContract } from '../../scripts/helpers/contracts-getters';
import { evmRevert, evmSnapshot } from '../../scripts/helpers/misc-utils';

chai.use(bignumberChai());
chai.use(almostEqual());
chai.use(solidity);

/**
 *
Deployer  
Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Admin
Account #1: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Owner
Account #2: 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc (10000 ETH)
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

Signer
Account #3: 0x90f79bf6eb2c4f870365e785982e1f101e93b906 (10000 ETH)
Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6

Minter
Account #4: 0x15d34aaf54267db7d7c367839aaf71a00a2c6a65 (10000 ETH)
Private Key: 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a

User[0]
Account #5: 0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc (10000 ETH)
Private Key: 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba
 */

export interface SignerWithAddress {
    signer: Signer;
    address: tEthereumAddress;
  }

let buidlerevmSnapshotId: string = '0x1';
const setBuidlerevmSnapshotId = (id: string) => {
  buidlerevmSnapshotId = id;
};
export interface TestEnv {
    deployer: SignerWithAddress;
    admin: SignerWithAddress;
    owner: SignerWithAddress;
    minter: SignerWithAddress;
    signer: SignerWithAddress;
    users: SignerWithAddress[];
    membershipNFT: MembershipNFT;
    giftContractV2: GiftContractV2;
    saleContract: SaleContract;
  }
  
  const testEnv: TestEnv = {
    deployer: {} as SignerWithAddress,
    admin: {} as SignerWithAddress,
    owner: {} as SignerWithAddress,
    minter: {} as SignerWithAddress,
    signer: {} as SignerWithAddress,
    users: [] as SignerWithAddress[],
    membershipNFT: {} as MembershipNFT,
    giftContractV2: {} as GiftContractV2,
    saleContract: {} as SaleContract
  }

  export async function initializeMakeSuite() {
    const [_deployer,_admin, _owner, _signer, _minter, ...restSigners] = await getEthersSigners();
    const deployer: SignerWithAddress = {
      address: await _deployer.getAddress(),
      signer: _deployer,
    };
    const admin: SignerWithAddress = {
      address: await _admin.getAddress(),
      signer: _admin,
    };
    const owner: SignerWithAddress = {
      address: await _owner.getAddress(),
      signer: _owner,
    };
    const signer: SignerWithAddress = {
      address: await _signer.getAddress(),
      signer: _signer,
    };
    const minter: SignerWithAddress = {
      address: await _minter.getAddress(),
      signer: _minter,
    };
  
    for (const sg of restSigners) {
      testEnv.users.push({
        address: await sg.getAddress(),
        signer:sg,
      });
    }
    testEnv.deployer = deployer;
    testEnv.admin = admin;
    testEnv.owner = owner;
    testEnv.signer = signer;
    testEnv.minter = minter;
    testEnv.membershipNFT = await getMembershipNFT();
    testEnv.giftContractV2 = await getGiftContractV2();
    testEnv.saleContract =  await getSaleContract();
  }

  const setSnapshot = async () => {
    setBuidlerevmSnapshotId(await evmSnapshot());
  };
  
  const revertHead = async () => {
    await evmRevert(buidlerevmSnapshotId);
  };
  
  export function makeSuite(name: string, tests: (testEnv: TestEnv) => void) {
    describe(name, () => {
      before(async () => {
        await setSnapshot();
      });
      tests(testEnv);
      after(async () => {
        await revertHead();
      });
    });
  }