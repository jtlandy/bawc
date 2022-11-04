# Smart Contract for MINT token

MINT NFT is based on ERC-1155 and the tokens will be minted to users who hold BAYC or MAYC tokens and ordered a watch.

## How to deploy the contract using remix

You can use web based remix IDE to deploy the smart contract.

Reference: https://remix-ide.readthedocs.io/en/latest/create_deploy.html

Make sure you have sufficient ETH to deploy a smart contract. Perhaps you should have 0.5 ETH at maximum.

### Pre requirements

1. Install metamask extension in your chrome browser

2. Deposit sufficient amount of ethereum to deploy a smart contract

3. Open your chrome web browser and nagivate to https://remix.ethereum.org/

You will see following screen:

<img width="889" alt="image" src="https://user-images.githubusercontent.com/21962762/200037173-9423401f-7063-4657-86c9-936abaa77179.png">

### Compile the smart contract

- Create a new file named as CryptoKiddes.sol in contracts directory

<img width="409" alt="image" src="https://user-images.githubusercontent.com/21962762/200037698-a592e7b1-d1e0-4f5a-bf0e-07fa184d65d9.png">


- Copy the contract source code and paste it into the editor opened.

<img width="718" alt="image" src="https://user-images.githubusercontent.com/21962762/200037995-076d2244-f2f6-4142-a9c9-d7ccf369296f.png">


- Go to the compiler panel and click the cick the big blue button

<img width="675" alt="image" src="https://user-images.githubusercontent.com/21962762/200038610-49eddfdf-a44c-472a-9e7d-dbe894117a63.png">

Before clicking the button, make sure you set up the configuration like below:

<img width="474" alt="image" src="https://user-images.githubusercontent.com/21962762/200046409-be88b775-f9e1-4e8c-a80d-96cdb177a9ae.png">


You will see following screen:

<img width="605" alt="image" src="https://user-images.githubusercontent.com/21962762/200038940-450c3bef-cd47-4191-b477-f1c4cd81d7fc.png">

### Deploy the smart contract

- Go to the deployment panel and select a provider and network you would like to deploy the smart contract:

In order to deploy it on mainnet, your metamask should point to mainnet activated

<img width="559" alt="image" src="https://user-images.githubusercontent.com/21962762/200039664-3ac30ff5-7798-4956-87b3-cc584e72b0db.png">

<img width="393" alt="image" src="https://user-images.githubusercontent.com/21962762/200040306-07e67ca9-4b26-4468-8686-8e2642c9344f.png">

- Select the smart contract in the dropdown and click yellow button 'Deploy'

<img width="513" alt="image" src="https://user-images.githubusercontent.com/21962762/200047112-90787283-9757-4c56-be0a-df264f59f801.png">


Then the contract will be deployed by interacting with metamask and deployment fee will be deducted from your wallet balance.

You will see the deployed contract like below:

<img width="581" alt="image" src="https://user-images.githubusercontent.com/21962762/200047439-974844d0-0112-4fe4-a0dd-284ca22c573a.png">

- Cick `copy` button to copy the `contract address` deployed

<img width="352" alt="image" src="https://user-images.githubusercontent.com/21962762/200047674-c261591d-0f3b-43cd-b867-7f92921a5573.png">


## Save the contract address in your favorite way. it will be used in the web dapp later.

# You will successfully get the contract address deployed according to the guidelines above!
