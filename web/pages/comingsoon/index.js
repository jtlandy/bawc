
import React from 'react';
import { Col, Container, Row} from "react-bootstrap";
import { FaTwitter, FaTelegramPlane, FaDiscord, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import Header from '../../components/layout/header/header';
import dynamic from 'next/dynamic'
const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});

export default function ComingSoon() {
  return (
    <div className="ComingSoon">  
     <AnimatedCursor
        innerSize={8}
        outerSize={24}
        color='0, 168, 255'
        outerAlpha={0.5}
        innerScale={0.7}
        outerScale={2}
      />
        <Header/>
        <Container fluid className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
          <Row className=" justify-content-center">
              <Col lg="6" md="6" sm="12" className="text-center ">
                <h4 className="text-white">COMING SOON</h4>
                <h2 className="sec-title">Follow for news and updates</h2>
                <p className="sec-description">Follow us on social media to stay up to speed on all of our upcoming announcements. Supply of our Membership Tokens is limited and first-come-first-served.</p>
                <div className="col-md-5 d-flex justify-content-around align-items-center m-auto">
                    <a className="social-link" href="https://twitter.com/playestates" target="_blank" rel="noreferrer"><FaTwitter /></a>
                    <a className="social-link" href=" https://t.me/playestates"  target="_blank"><FaTelegramPlane /></a>
                    <a className="social-link" href="https://discord.gg/4pfdez5Z6a" target="_black"><FaDiscord/></a>
                    <a className="social-link" href="https://www.youtube.com/channel/UCzK1nobRnbD0zYa-9hL54Ig" target="_blank" rel="noreferrer"><FaYoutube/></a>
                    <a className="social-link" href="https://www.linkedin.com/company/playestates" target="_blank" rel="noreferrer"><FaLinkedinIn/></a>
                </div>
              </Col>
          </Row>
      </Container>
    </div>
  );
}
