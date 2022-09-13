import Web3 from "web3";
import { providers } from 'ethers'

import WalletConnectProvider from '@walletconnect/web3-provider'
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import WalletLink from 'walletlink'

import Web3Modal from 'web3modal'

import { ellipseAddress, getChainData } from './lib/utilities'
import { useCallback, useEffect, useReducer } from 'react'

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.INFURA_ID, // required
    },
  },
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet (not Coinbase App)',
    },
    options: {
      appName: 'Coinbase', // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options
      const walletLink = new WalletLink({
        appName,
      })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
      await provider.enable()
      return provider
    },
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
}

let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}
export const getWeb3Modal=() => {
  return web3Modal;
} 
export const initialState = {
  provider: null,
  web3Provider: null,
  web3:null,
  address: null,
  chainId: null,
}
export const getChainInfo = (chainid) => {
  return getChainData(chainid);
}
export const getShortAddress = (address) => {
  return ellipseAddress(address);
}

export function initWeb3(provider) {
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

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        web3: action.web3,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      throw new Error()
  }
}