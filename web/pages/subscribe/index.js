import { Container, Row, Form, Modal} from "react-bootstrap";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Header from "../../components/layout/header/header";
import Layout from "../../components/layout";
import axios from 'axios'
import { isAddress } from 'web3-utils';



export default function Subscribe() {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const [wallet_addr, setWallet_addr] = useState('');
  const [nick_name, setNick_name] = useState('');
  const [email_addr, setEmail_addr] = useState('');
  const [content, setContent] = useState('');

  const form = useRef();

  const handleReset = () => {
    form.current.reset();
    setValidated(false);
  };

  const sendSubscribe = (e) => {
    e.preventDefault();
    const result = isAddress(wallet_addr);
    if(result == false) {
      setContent("The wallet address is incorrect.");
      setShow(true);
      return;
    }
    const data = {
      wallet_addr: wallet_addr,
      nick_name : nick_name,
      email_addr: email_addr
    };
    axios.post(`http://localhost:5000/api/subscribe/create`, data)
    .then(res => {
      if(res.data.success !== false) {
        setEmail_addr('');
        setNick_name('');
        setWallet_addr('');
      }
      setContent(res.data.message);
      setShow(true);
    });
  };
  return (
    <div className="ComingSoon">
      <Layout>
      <Container fluid className="mt-5 max-800">
        <Row className="mt-5 justify-content-center">
          <h1 className="text-center text-white">Subscribe for Our Newsletter</h1>
          <div className="card shadow-sm border-0 px-3 rounded-2 py-4 mx-auto mt-5 bg-form text-white">            
            <div className="card-body">
              <Form action="/" ref={form} validated={validated} onSubmit={sendSubscribe} encType="multipart/form-data" autoComplete="off">
                <div className="form-group row mb-3">
                  <div className="col-12">
                    <label className="mb-0">Wallet Address<span className="text-danger">*</span></label>
                    <input name="wallet_addr" type="text" value={wallet_addr} onChange={e => setWallet_addr(e.target.value)} className="form-control" placeholder="Wallet Address" required/>
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <div className="col-12">
                    <label className="mb-0">Name/Nickname<span className="text-danger">*</span></label>
                    <input name="nick_name" type="text" value={nick_name} onChange={e => setNick_name(e.target.value)} className="form-control" placeholder="Name/Nickname" required/>
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <div className="col-12">
                    <label className="mb-0">Email Address<span className="text-danger">*</span></label>
                    <input name="email_addr" type="email" value={email_addr} onChange={e => setEmail_addr(e.target.value)} className="form-control" placeholder="Email Address" required/>
                  </div>
                </div>                
                <p className="text-right mt-5">
                  <input type="submit" className="action-btn btn btn-lg joinList lazy btn btn-primary text-uppercase" value="Submit Now" />
                </p>
              </Form>
            </div>
          </div>
        </Row>
      </Container>
      <Modal className="subscribe-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{content}</p>
        </Modal.Body>
      </Modal>
      </Layout>
      
    </div>
  );
}
