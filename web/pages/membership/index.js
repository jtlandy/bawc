import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'
import Layout from "../../components/layout";
import { Container } from "react-bootstrap";
import BuyMembershipToken from "../../components/BuyMembershipToken";




export default function Landing() {
  
  return (
    <>
      <Layout>
      <div className="d-flex justify-content-center bg-black">
        <video id="video-background" type={"video/mp4"} loop autoPlay muted>
          <source src={"/assets/video/PLAY_ESTATES_WLSALE_v3.mp4"} type="video/mp4" />
        </video>
      </div>
        <div className="membership-header">
            <h2 className="neon">
            Be a Genesis Owner at <span>CryptoKiddies!</span>
            </h2>
        </div>
         <BuyMembershipToken/>         
         <Container fluid className="contentWrapper py-5 Membership"></Container>
      </Layout>      
    </>
  )
}
