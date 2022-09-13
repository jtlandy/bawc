import React from "react";
import { Container, Accordion } from "react-bootstrap";

const FAQ = () => {
  const accordians1 = [
    {
      header: "What is a DAO?",
      title:
        "A DAO is a Decentralized Autonamous Organization.  DAO are fully transparent and autonomous, community-driven entities with no central authority.  If you can understand the concept of open-source development when it related to software, apply similar principals to an organization, with the use of blockchain technology..   ",
    },
    {
      header: "What is a membership key?",
      title:
        "Membership keys are collectibles, also powerful NFT providing players the ultimate way to maximize their earning potential and keep track of their player stats in the CryptoKiddies ecosystem.  Members will benefit from exclusive lifetime platform discounts, earning multipliers, token airdrops, and membership rewards both online and offline.  Holders can also purchase and hold CryptoKiddies Fractional Ownership NFTs.  ",
    },
    {
      header: "What is a crypto-wallet and why do I need it?",
      title:
        "A crypto wallet is a piece of software that is the liaison between the user and the blockchain.  This wallet holds your public and private keys which are needed to access your cryptocurrency.  The main reason you will need a crypto-wallet is to keep track of your transactions and tokens you earn.  We recommend using a Web3 enabled wallet such as MetaMask.  This will allow you to interact with the CryptoKiddies platform.",
    },
    {
      header: 'What is CryptoKiddies, and what does "backed by real asset" mean?',
      title:
        "CryptoKiddies is an ecosystem where games can be played to earn tokens.  Backed by real assets means their value derives from tangible real estate investments.",
    },
    {
      header:
        "CryptoKiddies is based in the U.S., do I have to be in the same geographic location to be able to join CryptoKiddies and use the properties?",
      title:
        "Being a Web3 platform, you can participate from anywhere in the world.  As a fractional owner, you do not have property use right but you will receive all the benefits of having the asset in your investment portfolio.",
    },
  ];
  const accordians2 = [
    {
      header:
        'CryptoKiddies mentions "blockchain" and "crypto". Do I have to know anything about these to participate?',
      title:
        "You only need a basic knowledge of how to use a Web 3 enabled crypto-wallet.",
    },
    {
      header: "How do I stay updated about CryptoKiddies future updates?",
      title:
        "Follow us on Twitter and join the Discord where we will send updates and announcements about upcoming events and contests.",
    },
    {
      header:
        'What does "fractional ownership" mean? What are fractional ownership NFTs',
      title:
        "Fractional ownership is the method of owning a share or percentage of an asset such as real estate.  Fractional ownership NFTs are a tokenized representation of property which are divided into tokens that represent a share of ownership.  Each property purchased by the platforms DAO treasury is represented by fractional NFTs that can be purchased by members.",
    },
    {
      header:
        "Will I be able to see the properties/assets that are purchased by the CryptoKiddies DAO Treasury?",
      title:
        "CryptoKiddies will post quarterly reports of all real estate projects so you can see how much revenue is generated and how the asset appreciates in value.",
    },
  ];
  return (
    <Container
      className="faq-section contentWrapper section pp-scrollable flex-column d-flex h-screen align-items-center justify-content-center pt-5 mt-5"
      id="FAQ"
      data-aos="fade-down"
    >
      <div
        className="d-flex align-items-center gap-5 faq-section-header flex-wrap"
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <div className="sec-title">
          <div className="sec-title-bg">Frequently Asked Questions</div>
          <div className="sec-title-fg">Frequently Asked Questions</div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 d-flex flex-column gap-3 mt-3">
          {accordians1.map((item, index) => (
            <Accordion
              key={index}
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration={100 * index}
            >
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{item.header}</Accordion.Header>
                <Accordion.Body>{item.title}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </div>

        <div className="col-md-6 d-flex flex-column gap-3 mt-3">
          {accordians2.map((item, index) => (
            <Accordion
              key={index}
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration={100 * index}
            >
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{item.header}</Accordion.Header>
                <Accordion.Body>{item.title}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FAQ;
