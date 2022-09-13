import React, { useState, useEffect } from "react";
import PreloadImg from "../../public/assets/images/entrance.gif";
import PreloadImgMobile from '../../public/assets/images/MobileVersion.gif';
import {Button, Nav} from "react-bootstrap";
import Image from "next/image";




const Entrance = ({ setCurrentPage }) => {
  const hasWindow = typeof window !== 'undefined';
  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }
  const [windowWidth, setWindowWidth] = useState(getWindowDimensions());
  const imageUrl = windowWidth.width >= 992 ? PreloadImg : PreloadImgMobile;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleWindowResize);

    return () => {
        window.removeEventListener('resize', handleWindowResize);
    }
    }
     
  }, []);

  return (
    <div className="loader-container" >
      
      <Image src={imageUrl} alt="preloader"/>
      <Button className="action-btn btn btn-lg joinList lazy position-absolute" id="explore-button"
      >
        <Nav.Link href="#first_section">Explore The Project</Nav.Link>
      </Button>
    </div>
  );
};

export default Entrance;