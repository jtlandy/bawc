import React from "react";
import { Container } from "react-bootstrap";
import "react-html5video/dist/styles.css";
import ReactPlayer from "react-player/youtube";

const Introducing = () => {
  return (
    <Container
      className="contentWrapper section pp-scrollable flex-column community-section d-flex h-screen align-items-center justify-content-center pt-5"
      data-aos="fade-up"
    >
      <div
        className="video-container py-4"
      >
        <ReactPlayer url="https://youtu.be/xEiCYo56KRk" />
      </div>
    </Container>
  );
};

export default Introducing;
