import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import VideoMogul1 from "../../public/assets/video/Mogul1.gif";
import Image from "next/image";
import Link from 'next/link'

export default function MembershipToken() {
  return (
    <Container
      fluid
      className="contentWrapper section pp-scrollable d-flex h-screen align-items-center justify-content-center pt-5 mb-5"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <Row className="d-flex align-items-center justify-content-center">
        <Col sm={11} lg={10} xl={9}>
          <Row
            id="membershipToken"
            className="pb-4 d-flex align-items-center justify-content-center"
          >
            <Col
              sm={12}
              lg={6}
              xl={6}
              data-aos="zoom-in-down"
              data-aos-duration="1500"
            >
              <div className="sec-title">
                <div className="sec-title-bg">Membership token</div>
                <div className="sec-title-fg">Membership token</div>
              </div>
              <p className="sec-description">
                Get a Key while you can! With 9,980 Keys in our Founding
                Membership Token, it unlocks the power of building passive
                income. Each tier within the Founding Members Key provides you
                with different levels of exclusive, lifetime platform discounts,
                earning multipliers, utility token airdrops, rewards from
                Membership Token contests, and the ability to purchase and hold
                CryptoKiddies Fractionalized NFTs.
              </p>
              <div className="Membership-button">
                <Button className="action-btn btn btn-lg membership-learnmore-btn">
                  <Link href="/comingsoon">Buy Membership Token</Link>
                </Button>
              </div>
            </Col>
            <Col
              sm={12}
              lg={6}
              xl={6}
              data-aos="zoom-in-down"
              data-aos-duration="2000"
            >
              <div className="membership-section right-video">
                <div className="video-section">
                  <div className="video-container">
                    <Image src={VideoMogul1} alt=""/>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
