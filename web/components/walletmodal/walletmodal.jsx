import * as React from "react";
import styled from "styled-components";
import Web3 from "web3";
import { convertUtf8ToHex } from "@walletconnect/utils";
import Web3Modal from "web3modal";
// @ts-ignore
import WalletConnectProvider from "@walletconnect/web3-provider";
// @ts-ignore
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import Button from "./components/Button";
import Column from "./components/Column";
import Wrapper from "./components/Wrapper";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ModalResult from "./components/ModalResult";
import AccountAssets from "./components/AccountAssets";
import ConnectButton from "./components/ConnectButton";
import { apiGetAccountAssets } from "./helpers/api";
import { hashPersonalMessage, recoverPublicKey, recoverPersonalSignature, formatTestTransaction, getChainData } from "./helpers/utilities";
import { fonts } from "./styles";
import { openBox, getProfile } from "./helpers/box";
import { ETH_SEND_TRANSACTION, ETH_SIGN, PERSONAL_SIGN, BOX_GET_PROFILE, DAI_BALANCE_OF, DAI_TRANSFER } from "./constants";
import { callBalanceOf, callTransfer } from "./helpers/web3";
import { createGlobalStyle } from "styled-components";
import { globalStyle } from "./styles";
const GlobalStyle = createGlobalStyle `
  ${globalStyle}
`;

const SLayout = styled.div `
  position: relative;
  width: 100%;
  text-align: center;
`;
const SContent = styled(Wrapper) `
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;
const SContainer = styled.div `
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: break-word;
`;
const SLanding = styled(Column) `
`;

const SModalContainer = styled.div `
  width: 100%;
  position: relative;
  word-wrap: break-word;
`;
const SModalTitle = styled.div `
  margin: 1em 0;
  font-size: 20px;
  font-weight: 700;
`;
const SModalParagraph = styled.p `
  margin-top: 30px;
`;
// @ts-ignore
const SBalances = styled(SLanding) `
  height: 100%;
  & h3 {
    padding-top: 30px;
  }
`;
const STestButtonContainer = styled.div `
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const STestButton = styled(Button) `
  border-radius: 8px;
  font-size: ${fonts.size.medium};
  height: 44px;
  width: 100%;
  max-width: 175px;
  margin: 12px;
`;
const INITIAL_STATE = {
    fetching: false,
    address: "",
    web3: null,
    provider: null,
    connected: false,
    chainId: 1,
    networkId: 1,
    assets: [],
    showModal: false,
    pendingRequest: false,
    result: null
};
function initWeb3(provider) {
    const web3 = new Web3(provider);
    web3.eth.extend({
        methods: [
            {
                name: "chainId",
                call: "eth_chainId",
                outputFormatter: web3.utils.hexToNumber
            }
        ]
    });
    return web3;
}
class WalletModal extends React.Component {
    constructor(props) {
        super(props);
        this.onConnect = async () => {
            props.connecting();
            const provider = await this.web3Modal.connect();
            await this.subscribeProvider(provider);
            const web3 = initWeb3(provider);
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            const networkId = await web3.eth.net.getId();
            const chainId = await web3.eth.chainId();
            const assets = await apiGetAccountAssets(address, chainId);
            const web3info = {
                _address: address,
                _balance: assets,
                _network: networkId,
                _web3: web3,
            }
            props.getInfoCallback(web3info);
            await this.setState({
                // assets,
                web3,
                provider,
                connected: true,
                address,
                chainId,
                networkId
            });
        };
        this.subscribeProvider = async (provider) => {
            if (!provider.on) {
                return;
            }
            provider.on("close", () => this.resetApp());
            provider.on("accountsChanged", async (accounts) => {
                console.log("accountsChanged");
                await this.setState({ address: accounts[0] });
                await this.getAccountAssets();
            });
            provider.on("chainChanged", async (chainId) => {
                console.log("chainChanged");
                const { web3 } = this.state;
                const networkId = await web3.eth.net.getId();
                await this.setState({ chainId, networkId });
                await this.getAccountAssets();
            });
            provider.on("networkChanged", async (networkId) => {
                console.log("networkChanged");
                const { web3 } = this.state;
                const chainId = await web3.eth.chainId();
                await this.setState({ chainId, networkId });
                await this.getAccountAssets();
            });
        };
        this.getNetwork = () => getChainData(this.state.chainId).network;
        this.getProviderOptions = () => {
            const providerOptions = {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        infuraId: process.env.NEXT_PUBLIC_INFURA_ID
                    }
                },
                torus: {
                    package: Torus
                },
                fortmatic: {
                    package: Fortmatic,
                    options: {
                        key: process.env.NEXT_PUBLIC_FORTMATIC_KEY
                    }
                },
                authereum: {
                    package: Authereum
                },
            };
            return providerOptions;
        };
        this.getAccountAssets = async () => {
            const { address, chainId } = this.state;
            this.setState({ fetching: true });
            try {
                // get account balances
                const assets = await apiGetAccountAssets(address, chainId);
                await this.setState({ fetching: false, assets });
            }
            catch (error) {
                console.error(error); // tslint:disable-line
                await this.setState({ fetching: false });
            }
        };
        this.toggleModal = () => this.setState({ showModal: !this.state.showModal });
        this.testSendTransaction = async () => {
            const { web3, address, chainId } = this.state;
            if (!web3) {
                return;
            }
            const tx = await formatTestTransaction(address, chainId);
            try {
                // open modal
                this.toggleModal();
                // toggle pending request indicator
                this.setState({ pendingRequest: true });
                // @ts-ignore
                function sendTransaction(_tx) {
                    return new Promise((resolve, reject) => {
                        web3.eth
                            .sendTransaction(_tx)
                            .once("transactionHash", (txHash) => resolve(txHash))
                            .catch((err) => reject(err));
                    });
                }
                // send transaction
                const result = await sendTransaction(tx);
                // format displayed result
                const formattedResult = {
                    action: ETH_SEND_TRANSACTION,
                    txHash: result,
                    from: address,
                    to: address,
                    value: "0 ETH"
                };
                // display result
                this.setState({
                    web3,
                    pendingRequest: false,
                    result: formattedResult || null
                });
            }
            catch (error) {
                console.error(error); // tslint:disable-line
                this.setState({ web3, pendingRequest: false, result: null });
            }
        };
        this.testSignMessage = async () => {
            const { web3, address } = this.state;
            if (!web3) {
                return;
            }
            // test message
            const message = "My email is john@doe.com - 1537836206101";
            // hash message
            const hash = hashPersonalMessage(message);
            try {
                // open modal
                this.toggleModal();
                // toggle pending request indicator
                this.setState({ pendingRequest: true });
                // send message
                const result = await web3.eth.sign(hash, address);
                // verify signature
                const signer = recoverPublicKey(result, hash);
                const verified = signer.toLowerCase() === address.toLowerCase();
                // format displayed result
                const formattedResult = {
                    action: ETH_SIGN,
                    address,
                    signer,
                    verified,
                    result
                };
                // display result
                this.setState({
                    web3,
                    pendingRequest: false,
                    result: formattedResult || null
                });
            }
            catch (error) {
                console.error(error); // tslint:disable-line
                this.setState({ web3, pendingRequest: false, result: null });
            }
        };
        this.testSignPersonalMessage = async () => {
            const { web3, address } = this.state;
            if (!web3) {
                return;
            }
            // test message
            const message = "My email is john@doe.com - 1537836206101";
            // encode message (hex)
            const hexMsg = convertUtf8ToHex(message);
            try {
                // open modal
                this.toggleModal();
                // toggle pending request indicator
                this.setState({ pendingRequest: true });
                // send message
                const result = await web3.eth.personal.sign(hexMsg, address);
                // verify signature
                const signer = recoverPersonalSignature(result, message);
                const verified = signer.toLowerCase() === address.toLowerCase();
                // format displayed result
                const formattedResult = {
                    action: PERSONAL_SIGN,
                    address,
                    signer,
                    verified,
                    result
                };
                // display result
                this.setState({
                    web3,
                    pendingRequest: false,
                    result: formattedResult || null
                });
            }
            catch (error) {
                console.error(error); // tslint:disable-line
                this.setState({ web3, pendingRequest: false, result: null });
            }
        };
        this.testContractCall = async (functionSig) => {
            let contractCall = null;
            switch (functionSig) {
                case DAI_BALANCE_OF:
                    contractCall = callBalanceOf;
                    break;
                case DAI_TRANSFER:
                    contractCall = callTransfer;
                    break;
                default:
                    break;
            }
            if (!contractCall) {
                throw new Error(`No matching contract calls for functionSig=${functionSig}`);
            }
            const { web3, address, chainId } = this.state;
            try {
                // open modal
                this.toggleModal();
                // toggle pending request indicator
                this.setState({ pendingRequest: true });
                // send transaction
                const result = await contractCall(address, chainId, web3);
                // format displayed result
                const formattedResult = {
                    action: functionSig,
                    result
                };
                // display result
                this.setState({
                    web3,
                    pendingRequest: false,
                    result: formattedResult || null
                });
            }
            catch (error) {
                console.error(error); // tslint:disable-line
                this.setState({ web3, pendingRequest: false, result: null });
            }
        };
        this.testOpenBox = async () => {
            function getBoxProfile(address, provider) {
                return new Promise(async (resolve, reject) => {
                    try {
                        await openBox(address, provider, async () => {
                            const profile = await getProfile(address);
                            resolve(profile);
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            }
            const { address, provider } = this.state;
            try {
                // open modal
                this.toggleModal();
                // toggle pending request indicator
                this.setState({ pendingRequest: true });
                // send transaction
                const profile = await getBoxProfile(address, provider);
                let result = null;
                if (profile) {
                    result = {
                        name: profile.name,
                        description: profile.description,
                        job: profile.job,
                        employer: profile.employer,
                        location: profile.location,
                        website: profile.website,
                        github: profile.github
                    };
                }
                // format displayed result
                const formattedResult = {
                    action: BOX_GET_PROFILE,
                    result
                };
                // display result
                this.setState({
                    pendingRequest: false,
                    result: formattedResult || null
                });
            }
            catch (error) {
                console.error(error); // tslint:disable-line
                this.setState({ pendingRequest: false, result: null });
            }
        };
        this.resetApp = async () => {
            const web3info = {
                _address: '',
                _balance: [],
                _network: '',
                _web3: null
            }
            props.getInfoCallback(web3info);

            const { web3 } = this.state;
            if (web3 && web3.currentProvider && web3.currentProvider.close) {
                await web3.currentProvider.close();
            }
            await this.web3Modal.clearCachedProvider();
            this.setState({ ...INITIAL_STATE });
        };
        this.render = () => {
            const { connected, showModal, pendingRequest, result } = this.state;
            return (<>

                <SLayout>
                    <Column maxWidth={1000} spanHeight>
                    <SContent>
                        <SLanding center>
                            <ConnectButton connected={connected} onClick={connected ? this.resetApp : this.onConnect}/>
                        </SLanding>
                    </SContent>
                    </Column>
                </SLayout>
            </>
            );
        };
        this.state = {
            ...INITIAL_STATE
        };
        if (typeof window !== 'undefined') { 

            this.web3Modal = new Web3Modal({
                network: this.getNetwork(),
                cacheProvider: true,
                providerOptions: this.getProviderOptions()
            });
        }
        console.log("HELLO");
    }
    componentDidMount() {
        if (this.web3Modal.cachedProvider) {
            this.onConnect();
        } else {
            
        }
    }
}
export default WalletModal;
