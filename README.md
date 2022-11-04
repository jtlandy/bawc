# About the project


## How to deploy the MINT smart contract
The detailed guide is described at [README.md](./contracts/README.md) in [contracts](./contracts) directory.

## How to deploy dApp in the local environment

The detailed guide is described at [README.md](./web/README.md) in [contracts](./web) directory.


## How to launch the production version

### Deploy the smart contract for MINT token to the mainnet.

Follow the guide in contracts directory.

### Update the web source file with the address

Get the contract address deployed and updated the dapp source code on the repo like below

Go to the [conf.js](./web/abi/conf.js)
```
 ...
 '1' : {
   "name": "Ethereum Mainnet",
   "BAYC": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
   "MAYC": "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
   "MINT": "contract address",
 },
 ...
```
