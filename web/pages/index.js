import React, {useState, useEffect, useRef, useCallback, Fragment} from "react";
import  '../styles/Home.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayEarnBuild from '../components/PlayEarnBuild'
import Social from "../components/Social";
import Nft from "../components/Nft"
import Preloader from '../components/layout/preload';
import 'aos/dist/aos.css'
import Layout from "../components/layout";




export default function Landing() {
  const [isLoading, setLoading] = useState(true)
  const [mount, setMount] = useState(false)
  useEffect(() => {
    if (isLoading) {
      new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() => {
        setLoading(!isLoading);
      });
    }
    setMount(true)
  },[isLoading]);

  if (isLoading) {
    return (<><Preloader/></>)
  } else {
  return (
    <>
      <Layout>
        <PlayEarnBuild/>
        <Social/>
        <Nft/>               
      </Layout>      
    </>
  )
}
}
