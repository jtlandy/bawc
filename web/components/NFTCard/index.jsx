import React from 'react';
import Image from "next/image";
// import NFTCollection from '../../public/assets/nfts/1.jpg'

const NftCard = (props) => {
  return (
    <div className="nft-card">
      <Image
        src= {props.image}
        // layout='intrinsic'
        // className="w-100"
        width="100"
        height="100"
        alt={props.type}
        loader={(src) => props.image}
      />
      <div className="w-100 p-2">
        <div className="w-100">
          <p className="text-start mb-0 nft-name">{props.name}</p>
          <p className="text-start mb-0 nft-description">{props.metadata_name}</p>
          <p className="text-start mb-0 nft-description">{`Token ID #${props.token_id}`}</p>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
