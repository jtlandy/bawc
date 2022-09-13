import React, {useState, useEffect, useRef, useCallback, Fragment} from "react";
import Header from '../components/layout/header/header'
import  '../styles/Home.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import FirstSection from '../components/firstSection';
import PlayEarnBuild from '../components/PlayEarnBuild'
import PlayToBuild from "../components/PlayToBuild";
import PlayToEarn from "../components/PlayToEarn";
import MembershipToken from "../components/MembershipToken";
import Community from "../components/Community";
import Introducing from "../components/Introducing";
import LoadMap from "../components/LoadMap";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Social from "../components/Social";
import Footer from '../components/layout/footer'
import Entrance from "../components/Entrance";
import dynamic from 'next/dynamic'
import Preloader from '../components/layout/preload';
import Aos from "aos";
import 'aos/dist/aos.css'
import { FaAngleUp } from "react-icons/fa";

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});


export default function Landing() {
  const [isLoading, setLoading] = useState(true)
  const [mount, setMount] = useState(false)
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
    if (isLoading) {
      new Promise(resolve => setTimeout(() => resolve(), 6000)).then(() => {
        setLoading(!isLoading);
      });
    }
    setMount(true)
  }, [isLoading]);

  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  if (isLoading) {
    return (<><Preloader/></>)
  } else {
  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={24}
        color='0, 168, 255'
        outerAlpha={0.5}
        innerScale={0.7}
        outerScale={2}
      />
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
      <Entrance/>
      <FirstSection/>
      <PlayEarnBuild/>
      <PlayToBuild/>
      <PlayToEarn/>
      <MembershipToken/>
      <Community/>
      <Introducing/>
      <LoadMap/>
      <Contact/>
      <FAQ/>
      <Social/>
      <Footer/>
    </>
  )
}
}
