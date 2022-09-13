import { Container, Button, Navbar, Nav, ListGroup } from "react-bootstrap";
import Logo from "../../../public/assets/images/logo.png";
import React from "react";
import { handleSignificantDecimals, convertAmountFromRawNumber } from 'components/walletmodal/helpers/bignumber';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import {
  FaTwitter,
  FaTelegramPlane,
  FaDiscord,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Image from "next/image";
import Link from 'next/link'


// ** Hook Import
import { useCallback, useEffect, useReducer } from 'react'
import { reducer, initialState, getWeb3Modal, getChainInfo, initWeb3 } from "components/web3wallet"
import { providers } from 'ethers'
import { useSettings } from 'src/@core/hooks/useSettings'

export default function Header() {

  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, web3, address, chainId } = state
  const web3Modal = getWeb3Modal();
  const {settings, saveSettings} = useSettings();
  settings.connectState = state;
  saveSettings(settings);

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider)
    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()
    const network = await web3Provider.getNetwork()
    const prodChainId = process.env.NEXT_PUBLIC_CHAIN_ID;
    console.log("prodChainId: ", prodChainId);
    console.log("network.chainId: ", network.chainId);
    console.log("NEXT_PUBLIC_FORTMATIC_KEY: ", process.env.NEXT_PUBLIC_FORTMATIC_KEY);
    if(network.chainId && prodChainId != network.chainId) {
      toast("Network not matched!");
      return;
    }
    subscribeProvider(provider);
    const web3 = initWeb3(provider);
    
    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      web3,
      address,
      chainId: network.chainId,
    })
  }, [])

  const disconnect = useCallback(
    async function () {
      if (web3 && web3.currentProvider && web3.currentProvider.close) {
        await web3.currentProvider.close();
      }
      await web3Modal.clearCachedProvider()
      console.log("disconnected");
      if (provider && provider.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider, web3, web3Modal]
  )
  const subscribeProvider = (provider) => {
    if (!provider || !provider.on) {
      return;
    }
    const handleAccountsChanged = (accounts) => {
      console.log('accountsChanged', accounts)
      if(accounts.length != 0)  {
  
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        });
      } else {
        disconnect();
      }
    }
    const handleChainChanged = (_hexChainId) => {
      window.location.reload()
    }
  
    const handleDisconnect = (error) => {
      console.log('disconnect', error)
      disconnect()
    }
    provider.on("close", handleDisconnect)
    provider.on('disconnect', handleDisconnect)
    provider.on('accountsChanged', handleAccountsChanged)
    provider.on('chainChanged', handleChainChanged)
  
    // Subscription Cleanup
    return () => {
      if (provider.removeListener) {
        provider.removeListener('accountsChanged', handleAccountsChanged)
        provider.removeListener('chainChanged', handleChainChanged)
        provider.removeListener('disconnect', handleDisconnect)
        provider.removeListener('close', handleDisconnect)
      }
    }
  }
  
  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    subscribeProvider(provider);
  }, [provider, disconnect])

  const chainData = getChainInfo(chainId)
  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  return (
    <Navbar expand="lg" className="header pt-0 pb-0">
      <Container fluid>
        <div className="flex-grow-1 navbar-brand">
          <Navbar.Brand>
            <a id="brand" href="#" target="_self" className="navbar-brand">Bored Ape Watch Club</a>
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {web3Provider ? (
            <Button variant="btn action-btn ms-auto join-community" onClick={disconnect}>
              Disconnect
            </Button>
          ) : (
            <Button variant="btn action-btn ms-auto join-community" onClick={connect}>
              Connect
            </Button>
          )}
          <ToastContainer />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
