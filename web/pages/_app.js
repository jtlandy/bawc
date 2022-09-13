import '../styles/globals.css'
import '../styles/responsive.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
      <link rel="shortcut icon" href="/resources/BAWC_Logo.png" />
      <title>Bored Ape Watch Club - Minting your watch</title>
      </Head>
     {/* <MoralisProvider appId={process.env.NEXT_PUBLIC_APP_ID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}> */}
      <Component {...pageProps} />
     {/* </MoralisProvider> */}
    </>
  )
}

export default MyApp
