import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FlipCountdown from '@rumess/react-flip-countdown';
import Image from "next/image";
import SecureLogo from '../../public/assets/images/serure_logo.png'
import Link from "next/link";

const scriptToInject = `<script type="text/javascript">
  var pave = new Pave("background", {

    //dimensions
      BRICK_SIZE: 100, //positive number; measured in pixels
      BRICK_SPACING: 6, //positive number; measured in pixels
      CAMERA_ANGLE: 30, //number between 20 and 90; measured in degrees

    //mouse settings
      MOUSE_IMPACT_FACTOR: -220, //any number; measured in pixels
      MOUSE_IMPACT_RADIUS: 450, //positive number; measured in pixels

    //brick color settings
      BRICK_COLOR: "rgba(4, 33, 55)", //any color code like "green", "#e4f2c4", "rgb(249, 250, 251)" or "hsl(120, 75%, 50%)"
      BRICK_COLOR_RANDOMIZATION: 0, //number between 0 and 1
      BRICK_COLOR_HUE_RANDOMIZATION: 1, //number between 0 and 1
      BRICK_COLOR_SATURATION_RANDOMIZATION: 1, //number between 0 and 1
      BRICK_COLOR_LIGHTNESS_RANDOMIZATION: 1, //number between 0 and 1
      BRICK_COLOR_HUE_OFFSET: 0, //any number; measured in degrees
      BRICK_COLOR_SATURATION_OFFSET: 0, //any number; measured as a percentage
      BRICK_COLOR_LIGHTNESS_OFFSET: 0, //any number; measured as a percentage

    //shadow settings
      SHADOW_COLOR_HUE_OFFSET: 0, //any number; measured in degrees
      SHADOW_COLOR_SATURATION_OFFSET: 0, //any number; measured as a percentage
      SHADOW_COLOR_LIGHTNESS_OFFSET: 0, //any number; measured as a percentage
      SHADOW_CONTRAST: 0.6, //number between 0 and 1
      USE_MOVING_SHADOW: true, //allowable values: true and false
      MOVING_SHADOW_SIZE_RATIO: 3, //positive number

    //brick swinging settings
      SWING_TYPE: "sine", //allowable values: "sine", "pulse" and "linear"
      SWING_DISTRIBUTION: "random", //allowable values: "random" and "wave"
      SWING_AMPLITUDE: 0, //any number; measured in pixels
      SWING_FREQUENCY: 0.3, //positive number; considered as a number of oscillations per second
      SWING_FREQUENCY_RANDOMIZATION: 0.2, //positive number
      SWING_WAVE_DIRECTION: "bottom-right", //allowable values: "left", "right", "bottom", "top", "bottom-right", "bottom-left", "top-right" and "top-left"
      SWING_WAVE_LENGTH: 15, //positive number; measured in bricks

    //brick releasing settings
      BRICK_RELEASE_TYPE: "bounce", //allowable values: "normal", "elastic" and "bounce"
      BRICK_RELEASE_TIME: 1.5, //positive number; measured in seconds
      BRICK_RELEASE_NORMAL_CURVE: 3, //positive number
      BRICK_RELEASE_ELASTIC_CURVE: 4, //positive number
      BRICK_RELEASE_ELASTIC_FREQUENCY: 11, //positive number
      BRICK_RELEASE_BOUNCE_CURVE: 0.25, //number between 0 and 1
      BRICK_RELEASE_BOUNCE_FREQUENCY: 5 //positive number
  });
</script>
`;


// const InjectScript = React.memo(({ script }) => {
//   const divRef = React.useRef(null);

//   React.useEffect(() => {
//     if (divRef.current === null) {
//       return;
//     }
//     const doc = document.createRange().createContextualFragment(script);
// // 
//     divRef.current.innerHTML = "";
//     divRef.current.appendChild(doc);
//   });

//   return <div ref={divRef} />;
// });

export default function FirstSection() {
  return (
    <Container
      fluid
      id="first_section"
      className="contentWrapper overflow-hidden section pp-scrollable d-flex h-screen align-items-center justify-content-center"
    >
      <div
        id="background"
        style={{
          position: "absolute",
          width: "100%",
          height: "150%",
          zIndex: -1000,
        }}
      ></div>
      <Row className="d-flex align-items-center justify-content-center w-screen pt-9">
        <Col sm={11} lg={10} xl={9}>          
          <Row
            className="bannerWrapper pb-4 d-flex align-items-center justify-content-center"
          >
            {/* <div className="timer">
              
              <h1 className="timer-section-title text-center">
              Whitelist Closing In
              </h1>
              <FlipCountdown
                    hideYear
                    hideMonth
                    endAt={'2022-06-01 20:00:00'} // Date/Time
                />
            </div> */}
            <Col sm={12} lg={6} xl={6} className="bannerContent text-center-mobile">
              <div className="sec-title">
                <div className="sec-title-bg">Game your way to own IRL Real Estate</div>
                <div className="sec-title-fg">Game your way to own IRL Real Estate</div>
              </div>
              <h2>
                <span></span>
                <div className="message">
                  <div className="word1">Play games.</div>
                  <div className="word2">Earn tokens.</div>
                  <div className="word3">Own IRL real estate.</div>
                </div>
              </h2>
              <Button className="action-btn btn btn-lg joinList lazy">
                <a
                  href="https://discord.gg/4pfdez5Z6a"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join Our Community
                </a>
              </Button>
              <h2 className="subsection-title mt-4 text-white row align-items-center"><strong className="col-md-4 col-sm-12">Secured By</strong><strong className="col-md-6 col-sm-6 me-auto"><Image className="w-100 me-auto"  src={SecureLogo}  alt="scureblock"/></strong></h2>
              <div className="audit-report"><Link className="audit-report mt-3" href="https://secureblock.io/reports/ee7ebdcd-a5b9-4fbc-ae91-68eb5726737e.pdf">Audit Report</Link></div>
              
            </Col>
            <Col sm={12} lg={6} xl={6}
                 data-aos="zoom-in" data-aos-duration="2000"
            >
              <div className="GlobeImg position-relative text-center">
                <div className="backgroundShadow"></div>

                <iframe
                  src="/earth.htm"
                  width="100%"
                  height="550"
                  title="Earth"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <InjectScript script={scriptToInject} /> */}
    </Container>
  );
}
