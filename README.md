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
Here '1' means chain id of mainnet.
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

### Connect your repo with vercel to host your dApp

### Set up environment variables on vercel

- Select the project in your vercel account

<img width="495" alt="image" src="https://user-images.githubusercontent.com/21962762/200053841-9d11969e-bba6-4b0f-91d7-06ab7aa02bac.png">

- Go to Project settings -> Environment Variables

<img width="905" alt="image" src="https://user-images.githubusercontent.com/21962762/200054193-db33b523-22ff-4027-ab92-9491540e0f9d.png">

- Add variables and values
  Refer to .env file use in local deployment
  
  <img width="772" alt="image" src="https://user-images.githubusercontent.com/21962762/200054821-6aaf4eb3-4f11-42c5-8a4c-914f204e5924.png">

  Set up following variables and values
```
#General Environment
ADMIN_URL = your_dapp_domain
NEXT_PUBLIC_HTTPS_CONNECTION =1
NEXT_PUBLIC_CHAIN_ID=1

# SMTP Environment
NEXT_PUBLIC_ADMIN_EMAIL=replace_admin_email
NEXT_PUBLIC_SMTP=replace_your_smtp_server_url
NEXT_PUBLIC_PORT=587
NEXT_PUBLIC_EMAIL=replace_smtp_email
NEXT_PUBLIC_PASSWORD=replace_smtp_password
```

Keep in mind that `NEXT_PUBLIC_CHAIN_ID` is `1`, as it's a production version working on mainnet.

If you are using HTTPS for hosting, `NEXT_PUBLIC_HTTPS_CONNECTION` is `1`

SMTP configuration, you should set it up to email end users with their order details.

