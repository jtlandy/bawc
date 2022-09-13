import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Earn from "../../public/assets/images/card.svg";
import Play from "../../public/assets/images/play.svg";
import Connect from "../../public/assets/images/connect.svg";
import Build from "../../public/assets/images/bar-chart.svg";
import { useSpring, animated } from 'react-spring'
import Image from "next/image";


const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10 - 200}px,${y / 10 - 100}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8 - 400}px,${y / 8 + 250}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 + 600}px,${y / 6 + 300}px,0)`
const trans4 = (x, y) => `translate3d(${x / 4 + 400}px,${y / 3.5 - 100}px,0)`
const trans5 = (x, y) => `translate3d(${x / 6 + 300}px,${y / 6 + 300}px,0)`
const trans6 = (x, y) => `translate3d(${x / 4 + 200}px,${y / 3.5 - 100}px,0)`

export default function PlayToBuild() {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  return (
    <Container
      fluid
      className="PlayToBuild-Section contentWrapper section pp-scrollable d-flex h-screen align-items-center justify-content-center pt-5 pb-5">
      <Row
        className="buildWrapper pb-4 d-flex align-items-center justify-content-center"
        data-aos="fade-right"
        data-aos-duration="1500"
        data-aos-easing="ease-in-sine"
      >
        <Col sm={11} lg={10} xl={9}>
          <Row className="d-flex align-items-center justify-content-center" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
            <Col
              sm={12}
              lg={6}
              xl={6}
              className="PlayToBuild position-relative"
            >
              <animated.div className="card1" style={{ transform: props.xy.interpolate(trans1) }} />
              <animated.div className="card2" style={{ transform: props.xy.interpolate(trans2) }} />
              <animated.div className="card3" style={{ transform: props.xy.interpolate(trans3) }} />
              <animated.div className="card4" style={{ transform: props.xy.interpolate(trans4) }} />
              <animated.div className="card5" style={{ transform: props.xy.interpolate(trans5) }} />
              <animated.div className="card6" style={{ transform: props.xy.interpolate(trans6) }} />
              <div className="sec-title">
                <div className="sec-title-bg">Together, we Play to Build</div>
                <div className="sec-title-fg">Together, we Play to Build</div>
              </div>
              <p className="sec-description">
                {`You've heard of Play to Earn, but what about Play to Build? The
                more currency you earn via our games, the more opportunities you
                have to purchase your portion of real estate. With complete
                transparency, you will know all the details about the property
                you have fractional ownership of (location, ROI, rental income,
                etc.) You no longer have to game for free!`}
              </p>
              <div className="steps d-flex flex-no-wrap align-items-center justify-content-between mb-3">
                <div className="step1 d-flex align-items-center">
                      <span className="icon me-2">
                        <Image 
                           src={Play} alt="Play Icon" />
                      </span>
                  Play
                </div>
                <div className="step2 d-flex align-items-center">
                      <span className="icon me-2">
                        <Image 
                          src={Earn} alt="Play Icon" />
                      </span>
                  Earn
                </div>
                <div className="step3 d-flex align-items-center">
                      <span className="icon me-2">
                        <Image 
                           src={Connect} alt="Play Icon" />
                      </span>
                  Connect
                </div>
                <div className="step4 d-flex align-items-center">
                      <span className="icon me-2">
                        <Image
                           src={Build} alt="Play Icon" />
                      </span>
                  Build
                </div>
              </div>
              <div className="progressBar position-relative">
                <span className="progress" style={{ width: "100%" }}></span>
              </div>
              <div className="blurBG"></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
