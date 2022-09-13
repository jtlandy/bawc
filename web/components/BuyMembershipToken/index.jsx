import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, InputGroup, FormControl, Form} from 'react-bootstrap';
import VideoMogul1 from '../../public/assets/video/Mogul1.gif';
// import VideoInvestor1 from '../../public/assets/video/04-CryptoKiddies-FMT-Investor.gif';
import axios from 'axios'
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';

function MyVerticallyCenteredModal(props) {
  const [code, setCode] = useState("");
  const handleSubmit = (evt) => {
      evt.preventDefault();
      const coupon_code = {
        code: code
      };
      console.log(coupon_code)
      axios.post(`http://localhost:5000/api/token/buy`, coupon_code)
      .then(res => {
        alert(res.data.message);
      });
  }
  
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      className='buy-token-modal'
    >
      <Modal.Body className='text-center' closeButton>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="basic-url">Coupon code</Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={e => setCode(e.target.value)}
            value={code}
          />
        </InputGroup>       
        <div>
          <Button className='w-100' type='submit' onClick={props.onHide}>Buy</Button>
        </div>
      </Form>
      
      </Modal.Body>
    </Modal>
  );
}

export default function BuyMembershipToken() {
  const options = [1, 2, 3];
  const [selected, setSelected] = useState(1);
  const [isShow, setShow] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const handleClick = value => {
    setSelected(value);
  };

  const buyToken = () => {    
    setShow(true);
  };

  return (
    <Container className="contentWrapper section py-5" data-aos="fade-up" data-aos-duration="2000">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      
      <Row className="d-flex align-items-center justify-content-center">
        <Col sm={12}>
          <Row id="membershipToken" className="mt-5 pb-4">
            <Col sm={12} lg={6} xl={6} data-aos="zoom-in-down" data-aos-duration="1500">
              <h1 className="sec-title">Mogul</h1>
              <p className="sec-description">
                {`Buy the Key to Become a Genesis Owner. It's invite only for now and the discounts
                applied only for limited period of time. Be hurry!`}
              </p>
              <div className="mogule-list">
                <p>Numbers to Buy:</p>
                {options.map((option, index) => (
                  <Button
                    size="sm"
                    key={index}
                    variant={option === selected ? 'primary' : 'outline-primary'}
                    onClick={() => handleClick(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <Button
                className="action-btn btn btn-lg membership-learnmore-btn"
                onClick={() => setModalShow(true)}
              >
                Buy Genesis Owner Key
              </Button>
            </Col>
            <Col sm={12} lg={6} xl={6} data-aos="zoom-in-down" data-aos-duration="2000">
              <div className="membership-section d-flex justify-content-end">
                <div className="video-section">
                  <div className="video-container">
                    <Image alt = "" src={VideoMogul1} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={12}>
          <Row id="membershipToken" className="mt-5 pb-4">
            <Col sm={12} lg={6} xl={6} data-aos="zoom-in-down" data-aos-duration="2000">
              <div className="membership-section d-flex justify-content-start">
                <div className="video-section">
                  <div className="video-container">
                    {/* <Image alt="" src={VideoInvestor1} /> */}
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} lg={6} xl={6} data-aos="zoom-in-down" data-aos-duration="1500">
              <h1 className="sec-title">Investor</h1>
              <p className="sec-description">
                {`Buy the Key to Become a Genesis Owner. It's invite only for now and the discounts
                applied only for limited period of time. Be hurry!`}
              </p>
              <div className="mogule-list">
                <p>Numbers to Buy:</p>
                {options.map((option, index) => (
                  <Button
                    size="sm"
                    key={index}
                    variant={option === selected ? 'primary' : 'outline-primary'}
                    onClick={() => handleClick(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <Button
                className="action-btn btn btn-lg membership-learnmore-btn"
                onClick={() => buyToken()}
              >
                Buy Genesis Owner Key
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
