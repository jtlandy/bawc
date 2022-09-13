import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Layout from '../layout';
import NftCard from '../NFTCard';
import { useSettings } from 'src/@core/hooks/useSettings'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getEtherContract } from 'components/web3wallet/helpers/contract';

import { networks } from 'abi/conf';
import baycAbi from 'abi/BAYC.json';
import maycAbi from 'abi/MAYC.json';
import mintAbi from 'abi/MINT.json';

import { ethers } from "ethers";

import { parseNFT } from "libs/moralis_helper";

import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from 'axios'

import { uritoJson, ipfsToHttp } from "../../libs/utils"

import LoadingSpinner from "components/Loading";

// Latest version - v3.0.0 with Tree Shaking to reduce bundle size
import { Country, State, City } from 'country-state-city';
// Import Interfaces`
import { ICountry, IState, ICity } from 'country-state-city';

import Select from 'react-select';


/*
currency: "EUR"
flag: "🇦🇽"
isoCode: "AX"
latitude: "60.11666700"
longitude: "19.90000000"
name: "Aland Islands"
phonecode: "+358-18"
timezones: Array(1)
0:
abbreviation: "EET"
gmtOffset: 7200
gmtOffsetName: "UTC+02:00"
tzName: "Eastern European Time"
zoneName: "Europe/Mariehamn"
[[Prototype]]: Object
length: 1
[[Prototype]]: Array(0)
[[Prototype]]: Object

countryCode: "MT"
isoCode: "22"
latitude: "36.04479390"
longitude: "14.22506050"
name: "Kerċem"
*/
const countries = (Country.getAllCountries()).map(function (ele) {
  ele.label = ele.name;
  ele.value = ele.isoCode;
  return ele;
});
let strCountry = "", strState = "";
const customStyles = {
  control: (base, state) => ({
    ...base, 
    background: "#fff",
    // match with the menu
    borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "yellow" : "green",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "red" : "blue"
    }
  }),
  menu: base => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0
  }),
  menuList: base => ({
    ...base,
    color: "#333",
    // kill the white space on first and last option
    padding: 0
  })
};
const OrderForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);

  const [states, setStates] = useState([]);

  const countryChanged = (e) => {

    console.log("Country Changed: ", e)

    let countryObject = Country.getCountryByCode(e.isoCode);
    setCountry(countryObject);
    strCountry = countryObject.name;
    const tmp_states = State.getStatesOfCountry(e.isoCode);
    const tmp_states2 = tmp_states.map(function (ele) {
      ele.label = ele.name;
      ele.value = ele.isoCode;
      return ele;
    });
    setStates(tmp_states2);
    if (tmp_states2.length > 0)
      setState(tmp_states2[0]);
    else
      setState(null);
    console.log(tmp_states2);
  }

  const stateChanged = (e) => {

    console.log("State Changed: ", e)
    setState(e);
    strState = e.name;
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // useEffect(() => {

  // }, [country, states]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name <span style={{ color: "red" }}>*</span></Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your full name"
          value={name}
          name="name"
          {...register('name', { required: true })}
          onChange={(e) => setName(e.target.value)}

        />
        {errors.name && <span style={{ color: "red" }}>This field is required</span>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address <span style={{ color: "red" }}>*</span></Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          {...register('email', { required: true })}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span style={{ color: "red" }}>This field is required</span>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="address1">
        <Form.Label>Address 1 <span style={{ color: "red" }}>*</span></Form.Label>
        <Form.Control
          type="text"
          name="address1"
          placeholder="Address 1"
          value={address1}
          {...register('address1', { required: true })}
          onChange={(e) => setAddress1(e.target.value)}
        />
        {errors.address1 && <span style={{ color: "red" }}>This field is required</span>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="address2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control
          type="text"
          name="address2"
          placeholder="Address 2"
          value={address2}
          {...register('address2', { required: false })}
          onChange={(e) => setAddress2(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="country">
        <Form.Label>Country <span style={{ color: "red" }}>*</span></Form.Label>
        {/* <Form.Control
          type="text"
          name="country"
          placeholder=""
          value={country}
          {...register('country', { required: true })}
          onChange={(e) => setCountry(e.target.value)}
        />
        {errors.country && <span style={{ color: "red" }}>This field is required</span>} */}
        <Select name="country" 
          options={countries}
          styles = {customStyles}
          onChange={(e) => countryChanged(e)}
          defaultValue={countries[0]}
          value={country}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="state">
        <Form.Label>State</Form.Label>
        {/* <Form.Control
          type="text"
          name="state"
          placeholder=""
          value={state}
          {...register('state', { required: true })}
          onChange={(e) => setState(e.target.value)}
        />
        {errors.state && <span style={{ color: "red" }}>This field is required</span>} */}
        <Select name="state" 
          options={states}
          styles = {customStyles}
          onChange={(e) => stateChanged(e)}
          defaultValue={states[0]}
          value={state}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="city">
        <Form.Label>City <span style={{ color: "red" }}>*</span></Form.Label>
        <Form.Control
          type="text"
          name="city"
          placeholder=""
          value={city}
          {...register('city', { required: true })}
          onChange={(e) => setCity(e.target.value)}
        />
        {errors.city && <span style={{ color: "red" }}>This field is required</span>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="postalcode">
        <Form.Label>Postal Code <span style={{ color: "red" }}>*</span></Form.Label>
        <Form.Control
          type="text"
          name="postal"
          placeholder=""
          value={postal}
          {...register('postal', { required: true })}
          onChange={(e) => setPostal(e.target.value)}
        />
        {errors.postal && <span style={{ color: "red" }}>This field is required</span>}
      </Form.Group>

      <Button variant="primary" type="submit" block="true">
        Order My Watch
      </Button>
    </Form>
  );
};


let interval;
export const Nft = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { settings, saveSettings } = useSettings()

  const [collectionType, setCollectionType] = useState('BAYC');
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [nfts, setNFTs] = useState([]);

  //let provider, web3Provider, web3, address, chainId;
  //settings.connectState

  useEffect(() => {
    if (!address)
      loadWalletData();

    if (address) {
      clearInterval(interval);
    }
  }, [address]);

  useEffect(() => {
    const fetchNFTs = async () => {
      setIsLoading(true);
      const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
      if (!provider) return;

      const contract = getEtherContract(provider, networks[chainId].BAYC, baycAbi);
      const symbol = await contract.symbol();
      if (collectionType == symbol)
        await fetchBAYC();
      else
        await fetchMAYC();
      setIsLoading(false);
    }
    fetchNFTs();
  }, [provider, collectionType]);

  function loadWalletData() {
    clearInterval(interval);
    interval = setInterval(() => {
      if (!settings.connectState || !settings.connectState.provider) {
        return;
      }
      setProvider(settings.connectState.provider);
      setAddress(settings.connectState.address);
    }, 1000);
  }

  const handleChange = (event) => {
    const target = event.target;
    if (target.name == "collectionType") {
      setCollectionType(target.value);
    }
  };
  async function fetchTokenDataForBAYC(url) {
    const api = axios.create({
      baseURL: url,
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const response = await api.get();
    const { data } = response;
    console.log("Fetch Result", data);
    return data;
  }
  async function fetchTokenDataForMAYC(tokenId) {
    const response = await axios.post('/api/mayc', { tokenId: tokenId });
    console.log("fetchTokenDataForMAYC: ", response.data);
    return response.data;
  }

  async function fetchBAYC() {
    const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
    const contract = getEtherContract(provider, networks[chainId].BAYC, baycAbi);
    const name = await contract.name();
    const symbol = await contract.symbol();
    //console.log("BAYC name:", name)
    const tokenAmount = await contract.balanceOf(address);
    //console.log("Token Balance: ", tokenAmount)
    const _tokens = new Array();
    for (let i = 0; i < tokenAmount; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(address, i);
      //console.log("tokenId: ", tokenId)
      let tokenUri = await contract.tokenURI(tokenId);
      //console.log("tokenURI: ", tokenUri)
      const tokenURL = ipfsToHttp(tokenUri)
      //console.log("tokenURL: ", tokenURL)
      const tokenData = await fetchTokenDataForBAYC(tokenURL).then((res) => res).catch((e) => console.log(e));
      //console.log("tokenData: ", tokenData)
      _tokens.push({
        name: name,
        image: ipfsToHttp(tokenData.image),
        type: symbol,
        metadata_name: name,
        token_id: Number(tokenId),
        token_hash: '',
      });
    }
    setNFTs(_tokens);
  }
  async function fetchMAYC() {
    const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
    const contract = getEtherContract(provider, networks[chainId].MAYC, maycAbi);
    const name = await contract.name();
    const symbol = await contract.symbol();

    const tokenAmount = await contract.balanceOf(address);
    const _tokens = new Array();
    for (let i = 0; i < tokenAmount; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(address, i);
      const tokenURI = await contract.tokenURI(tokenId);
      const tokenURL = ipfsToHttp(tokenURI)
      const tokenData = await fetchTokenDataForMAYC(tokenId.toNumber());
      _tokens.push({
        name: name,
        image: ipfsToHttp(tokenData.image),
        type: symbol,
        metadata_name: name,
        token_id: Number(tokenId),
        token_hash: '',
      });
    }
    setNFTs(_tokens);
  }
  const [show, setShow] = useState(false);
  const [pickedIndex, setPickedIndex] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setShow(true);
    setPickedIndex(index);
    console.log(nfts[index])
  }

  const onOrderSubmit = async(e) => {

    if (strCountry == "") {
      toast("Country is not selected");
      return;
    }
    e.country = strCountry;
    e.state = strState;

    strCountry = strState = "";
    console.log(e)
    //e.name, e.email, e.shipping
    console.log("pickedIndex: ", pickedIndex);
    e.own = nfts[pickedIndex];
    const bMinted = await OrderMint(e);
    if (bMinted == true) {
      console.log("Successfully minted")
      SendMail(e);
    }
    handleClose();
  };


  const OrderMint = async (e) => {

    try{
      const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
      const contract = getEtherContract(provider, networks[chainId].MINT, mintAbi);
      const name = await contract.name();
      const symbol = await contract.symbol();
      console.log("MINT name:", name);
      console.log("MINT symbol:", symbol);
      //type: BAYC, token_id=4
      console.log("e.own:", e.own.type, e.own.token_id);
      const orderTokenType = e.own.type == "BAYC" ? 1 : 2;
      const payout = await contract.buyPrice(1);
      const options = {value: payout};
      await contract.buyOrder(1, orderTokenType, e.own.token_id, options);
      return true;
    } catch(e) {
      console.log("Error while minting...", e);
      toast("An error occurred: Insufficient Balance or Already ordered");
      return false;
    }

  }

  const SendMail = async (data) => {
    axios.post('/api/email',
      {
        email: data.email,
        name: data.name,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        postal: data.postal,
        country: data.country,
        own: data.own,
        mint: data.mint,
      }
    )
      .then(
        (res) => {
          alert('Send Mail To You')
          console.log(res)
        }
      ).catch(
        (e) => {
          console.log("Axios Sending Error: ", e)
        }
      )
  }

  return (
    <>
      <ToastContainer />
      <Container className="nft-container">
        <Row className="d-flex justify-content-between">
          <Col md={12}>
            <div className="sec-title">
              <div className="sec-title-bg">My CryptoKiddies:</div>
              <div className="sec-title-fg">My CryptoKiddies:</div>
            </div>
          </Col>
          <Col md={12}>
            <div className="header-box">
              <Form.Group className="mb-3 text-gray" controlId="select-item-box">
                <Form.Label>Collection Type</Form.Label>
                <Form.Select
                  name="collectionType"
                  aria-label="select-item-box"
                  className="filter-box"
                  onChange={handleChange}
                >
                  <option disabled>Select Item</option>
                  <option value="BAYC">BAYC</option>
                  <option value="MAYC">MAYC</option>
                </Form.Select>
              </Form.Group>
            </div>
          </Col>
          {
            isLoading ? <LoadingSpinner /> :
              (<div>
                <Col md={12} className="mt-5">
                  <h3 className="text-gray">{nfts.length > 0 ? `You have ${nfts.length} of ${collectionType} NFTs.` : `You have no ${collectionType} NFT.`}</h3>
                </Col>
                <Col md={12} className="d-flex justify-content-between flex-wrap mt-2">
                  {
                    nfts && nfts.length > 0 && nfts.map((nft, index) =>
                      <div key={index} onClick={() => handleShow(index)}>
                        <NftCard
                          key={index}
                          image={nft.image}
                          type={collectionType}
                          name={nft.name}
                          metadata_name={nft.metadata_name}
                          token_id={nft.token_id}
                          token_hash={nft.token_hash}
                        />
                      </div>)
                  }
                </Col>
              </div>)
          }
        </Row>
        <Row className="justify-content-center">
          <Modal show={show} onHide={handleClose} dialogClassName="modal-view">
            <Modal.Header closeButton>
              <Modal.Title>Order my Watch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <OrderForm onSubmit={onOrderSubmit} />
            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close Modal
              </Button>
            </Modal.Footer> */}
          </Modal>
        </Row>
      </Container>
    </>
  );
};

export default Nft;
