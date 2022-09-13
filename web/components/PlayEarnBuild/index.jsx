import Image from "next/image";
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LogoImage from "../../public/assets/img/logo.jpg";
/*
color: #406d8a
background: #eef6f4
*/
export default function PlayEarnBuild() {
  return (
    <Container
      fluid
      className="contentWrapper PlayEarnBuild section pp-scrollable d-flex h-screen align-items-center justify-content-center">
      <Row className="d-flex align-items-center justify-content-center w-screen pt-3">
        <Row
          className="buildWrapper pb-4 d-flex align-items-center justify-content-center tophold"
          data-aos="fade-right"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
        >
          <Col sm={12} lg={10} xl={8} className="tophold2">

            <div className="tophold-desc">
              
              <ul>
              <h2>MINTING YOUR WATCH</h2>
                <li>Click Connect</li>
                <li>Select your wallet</li>
                <li>Choose the account you would like to use</li>
                <li>Use the dropdown to select your Ape Collection</li>
                <li>Select your ape and fill out the information</li>
              </ul>
            </div>

          </Col>
          {/* <Col sm={12} lg={6} xl={6} className="order-2 order-lg-1">
             <div className="position-relative text-center">
                <div className="video-section">
                  <div className="video-container">
                    <Image src={LogoImage} alt=""/>
                  </div>
                </div>
              </div>
              
            </Col>
            <Col sm={12} lg={6} xl={6} className="order-1 order-lg-2">
              <div className="sec-title">
                <div className="sec-title-bg">CryptoKiddies Minting Time!</div>
                <div className="sec-title-fg">CryptoKiddies Minting Time!</div>
              </div>
              <p className="sec-description">
                {`CryptoKiddies is an ownership token based on ERC721`}
              </p>
              <div className="PlayEarnBuild-button">
                <Button className="action-btn btn btn-lg learnmore">
                  <a href="#">Learn More</a>
                </Button>
              </div>              
            </Col> 
            */}
        </Row>
      </Row>
    </Container>
  );
}
