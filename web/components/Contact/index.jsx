import React from "react";
import { Container } from "react-bootstrap";
import Image1 from "../../public/assets/images/team/avatars/1.png";
import Image2 from "../../public/assets/images/team/avatars/2.png";
import Image3 from "../../public/assets/images/team/avatars/3.png";
import Image4 from "../../public/assets/images/team/avatars/4.png";
import Image5 from "../../public/assets/images/team/avatars/5.png";
import Image6 from "../../public/assets/images/team/avatars/6.png";
import Image7 from "../../public/assets/images/team/avatars/7.png";
import Image8 from "../../public/assets/images/team/avatars/8.png";
import Image9 from "../../public/assets/images/team/avatars/9.png";
import Image10 from "../../public/assets/images/team/avatars/10.png";
import Image11 from "../../public/assets/images/team/avatars/11.png";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const Contact = () => {
  const items = [
    {
      name: "William Guo",
      role: "CEO/founder",
      image: Image8,
      url: "https://www.linkedin.com/in/william-guo1/",
    },
    {
      name: "Zhimin(kelvin) Gao",
      role: "Technical Cofounder",
      image: Image9,
      url: "https://www.linkedin.com/in/zhimin-gao-63268421",
    },
    {
      name: "Mohsen Tavakoli",
      role: "CTO",
      image: Image3,
      url: "https://www.linkedin.com/in/mohsen-blockchain-guru/",
    },
    {
      name: "Marc Leon",
      role: "Marketing/Community Manager",
      image: Image6,
      url: "https://www.linkedin.com/in/marcleon/",
    },
    {
      name: "Genevieve Daylusan",
      role: "Administration",
      image: Image1,
      url: "https://www.linkedin.com/in/genevievedaylusan/",
    },
    {
      name: "Emanuel Orlando",
      role: "Compliance",
      image: Image5,
      url: "https://www.linkedin.com/in/emanuelorlando/",
    },
    {
      name: "James Shockley",
      role: "Marketing",
      image: Image4,
      url: "https://www.linkedin.com/in/james-shockley-2a5102b5/",
    },
    {
      name: "John Huggins",
      role: "NFT Art Designer",
      image: Image2,
      url: "https://www.linkedin.com/in/john-huggins-b89956162",
    },
    {
      name: "Amy Suto",
      role: "Copy/Content Writer",
      image: Image7,
      url: "https://www.linkedin.com/in/amy-suto-46194842/",
    },
    {
      name: "Nicholas Shekerdemian",
      role: "Advisor",
      image: Image10,
      url: "https://www.linkedin.com/in/nshekerdemian/",
    },
    {
      name: "Gina Kirch",
      role: "Advisor",
      image: Image11,
      url: "https://www.linkedin.com/in/ginakirch/",
    },
  ];
  return (
    <Container
      className="contact-section contentWrapper section pp-scrollable flex-column d-flex h-screen align-items-center justify-content-center pt-5 mt-5"
      id="Team"
      data-aos="fade-up"
    >
      <div className="d-flex align-items-center gap-5 contact-header flex-wrap"
           data-aos="flip-up" data-aos-duration="2000"
      >
        <div className="sec-title">
          <div className="sec-title-bg">Join The Team</div>
          <div className="sec-title-fg">Join The Team</div>
        </div>
      </div>
      <p className="contact-introduction"
         data-aos="fade-up" data-aos-duration="2000"
      >
        A diverse group of real estate, gaming, crypto and web3 professionals.
        CryptoKiddies is expanding! Shoot us an email to inquire about some of our
        upcoming openings.
      </p>

      <div className="row">
        {items.map((item, index) => (
          <div
            className="col-md-6 mb-4"
            key={index}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-right"}
            data-aos-easing="linear"
            data-aos-duration={100 * index}
          >
            <div className="team-section">
            <div className="teammember-avatar text-right">
                <Image src={item.image} alt="avatar"/>
              </div>
              <div className="teammember-info">
                <h5>{item.name}</h5>
                <p>{item.role}</p>
              </div>
              
              <div className="social-contact">
                <a
                  className="linkedin-icon"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Contact;
