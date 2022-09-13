import React from "react";
import { Container } from "react-bootstrap";
import Logo1 from "../../public/assets/images/team/logo1.png";
import Logo2 from "../../public/assets/images/team/logo2.png";
import Logo3 from "../../public/assets/images/team/logo3.jpg";
import { FaTwitter, FaTelegramPlane, FaDiscord, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

const Social = () => {
  return (
    <Container className="contact-section contentWrapper section pp-scrollable flex-column d-flex h-screen align-items-center justify-content-center pt-5 mb-5"
      data-aos="fade-down" data-aos-duration="2000">
      <div className="social-section mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="sec-title">
              <div className="sec-title-bg">&nbsp;{`The Story`}&nbsp;</div>
              <div className="sec-title-fg">&nbsp;{`The Story`}&nbsp;</div>
            </div>
            <p>
              {`Many years ago, in a barn somewhere in the woods of North Idaho, on a snowy winter night, a lonely goat committed a repulsive act with a long-forgotten copy of Megahex. Crypto Kiddies were conceived that very night.

CryptoKiddies have been wandering aimlessly through the ether looking for good homes. On a particulaly cold and lonely night they met a kindly old woman who invited the Kids to her barn, full of dry straw, delicious hay, and all the compost scraps they could eat. The Kids were giddy with delight. After millenia of wandering, they were all a bit peckish.

When they arrived at the old woman's barn, they discovered that the "barn" she described was actually a portal to beautiful infinite meadow where the sun always shone and there were cool, flowing streams that stretched beyond the horizon. They also suspected that this may be the legendary portal of Muerehte.

The old woman stood at the wide-open door as the Kiddies lined up to enter. She rustled through the folds in her ankle-length skirt and the Kiddies strained their necks to get a better look through the door. One caught a brief glimpse of what looked like an ape in sunglasses wandering in the distance and another saw what she swore was a sneaky-looking vampire.

The woman pulled a large gem from her pocket and lifted it toward a small gap in the jamb of the doorway. The gem fit perfectly into the gap and as soon as she seated it there, a flat wall of mint green light appeared and the woman gestured gracefully for the Kiddies to enter. They began walking through the gate, but pretty soon they were all leaping and bucking with joy as they made their way into the beautiful "barn."

As each of the Kiddies passed through the wall of light, they felt a pleasant jolt of energy and an extra spring in their step. They knew their days of wandering were over and it was only a matter of time...`}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Social;
