import React, {useState, useEffect, useRef, useCallback, Fragment} from "react";
import Header from "./header/header";
import Footer from "./footer/index";
import { FaAngleUp } from "react-icons/fa";
// import AnimatedCursor from 'react-animated-cursor'
import Aos from "aos";
import dynamic from 'next/dynamic'

// const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
//     ssr: false
//   });

const Layout = ({children}) => {    
    const [currentPage, setCurrentPage] = useState(0);
    const [scroll, setScroll] = useState(0);
    const [showTopBtn, setShowTopBtn] = useState(false);
    const pageChanged = (number) => {
      setCurrentPage(number)
      
      const aos_inits = document.querySelectorAll('.aos-init');
      for (const box of aos_inits) {
        box.classList.add('aos-animate');
      }
    }
    useEffect(() => {
  
      let progressBarHandler = () => {
          
          const totalScroll = document.documentElement.scrollTop;
          const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scroll = `${totalScroll / windowHeight}`;
  
          setScroll(scroll);
      }
  
      window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    });
  
      window.addEventListener("scroll", progressBarHandler);
  
      return () => window.removeEventListener("scroll", progressBarHandler);
    });
    const goToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
    };
   
  
    useEffect(() => {
      Aos.init();
      Aos.refresh();
    }, []);
  return (
    <div className="Layout">
        {/* <AnimatedCursor
        innerSize={8}
        outerSize={24}
        color='0, 168, 255'
        outerAlpha={0.5}
        innerScale={0.7}
        outerScale={2}
      /> */}
      <div id="progressBarContainer">
            <div id="progressBar" style={{transform: `scale(${scroll}, 1)`, opacity: `${scroll}`}} />
        </div>
        <div className="top-to-btm">
        {" "}
        {showTopBtn && (
            <FaAngleUp
                className="icon-position icon-style"
                onClick={goToTop}
            />
        )}{" "}
        </div>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;
