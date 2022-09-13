import React from "react";
import { Container } from "react-bootstrap";
import { FaTwitter, FaDiscord, FaYoutube } from "react-icons/fa";
// import Privacy from "assets/pdf/Terms.pdf";
// import Terms from "../../../public/assets/pdf/Terms.pdf";
import Link from "next/link";

const Footer = () => {
  return (
    <Container fluid className="footer">
      <h2 className="footer-title">2022<sup className="sup-text">TM</sup> Bored Ape Watch Club. All rights reserved.</h2>
    </Container>
  );
};

export default Footer;
