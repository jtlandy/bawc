import React from "react";
import PreloadImg from "../../../public/assets/images/animation.gif";
import Image from "next/image";

const Preload = () => {
  return (
    <div className="loader-container">
      <Image src={PreloadImg} alt="preloader" />
    </div>
  );
};

export default Preload;
