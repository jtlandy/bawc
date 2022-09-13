import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "react-html5video/dist/styles.css";

const Community = () => {
  return (
    <Container
      className="contentWrapper section pp-scrollable flex-column community-section d-flex h-screen align-items-center justify-content-center pt-5 mb-5"
      data-aos="fade-down"
    >
      <div className="community-content">
        <div className="row px-2 justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column gap-5 pr-50 mt-5 justify-content-center align-items-center">
            <div className="community-header">
              <div className="sec-title">
                <div className="sec-title-bg">Community</div>
                <div className="sec-title-fg">Community</div>
              </div>
              <p>
                We as a community are taking control of how real estate is
                owned. By becoming a member you can maximize your return on
                investment and participate in DAO governance.
              </p>
            </div>
            {/* <div
              className="community-card"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="500"
            >
              OWNED airdrops, IRL activities including hotels, travel packages,
              etc.
            </div>
            <div
              className="community-card"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="700"
            >
              Exclusive access to fractional ownership of real-life properties
            </div> */}
          </div>
        </div>
        <Row className="justify-content-around mt-5">
            <Col sm={12} md={3} lg={3}>
            <div className="service">
                <h3>OWNED Airdrop</h3>
                <p>
                    Receive OWNED token airdrop!
                </p>
            </div>
            </Col>
            <Col sm={12} md={3} lg={3}>
            <div className="service">
                <h3>IRL Activities</h3>
                <p>
                    Hotels, Travel Packages and Many More
                </p>
            </div>
            </Col>
            <Col sm={12} md={4} lg={4}>
            <div className="service">
                <h3>Exclusive access</h3>
                <p>
                Access to Fractional Ownership of Real-Life Properties
                </p>
            </div>
            </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Community;
