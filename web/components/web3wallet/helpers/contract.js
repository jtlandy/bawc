import { ethers, providers } from "ethers";
import { initWeb3 } from "..";
export function getEtherContract(provider, contractAddress, abi) {
    const web3Provider = new providers.Web3Provider(provider);
    let signer = web3Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
}
export function getWeb3Contract(provider, contractAddress, abi) {
    const web3 = initWeb3(provider);
    const contract = new web3.eth.Contract(abi, contractAddress);
    return contract;
}