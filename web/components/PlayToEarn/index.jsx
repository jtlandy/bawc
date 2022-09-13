import React from "react";
import { Container, Row, Col } from "react-bootstrap";
export default function PlayToEarn() {  
  return (
    <div
      className="py-5 contentWrapper section pp-scrollable d-flex flex-column h-screen align-items-center justify-content-center grid-mix-background mb-5"
      data-aos="fade-up"
      data-aos-duration="3000"
    >
      <Container id="playtoearn" fluid className="pt-5 position-relative ">
        
        <Row className="d-flex align-items-center justify-content-center">
          <Col sm={11} lg={10} xl={9}>
            <Row className="d-flex align-items-center justify-content-center">
              <div className="sec-title">
                <div className="sec-title-bg">How It Works</div>
                <div className="sec-title-fg">How It Works</div>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      <iframe src="/hologram/index.html" width="100%" height="550" title="Earth"></iframe>
    </div>
  );
}
