import React from 'react';
import { Anchor } from 'components/Custom';
import instagram from 'assets/instagram.png';
import youtube from 'assets/youtube.png';
import facebook from 'assets/facebook.png';
import './footer.scss';

export const Bottom = () => (
  <div className="sdp-bottom-line w-100 d-flex justify-content-around align-items-center bg-gray">
    <Anchor className="sdp-anchor">Copyright © 2021 Kementerian PPN/Bappenas.</Anchor>
    <Anchor className="sdp-anchor justify-content-around">
      <img src={facebook} alt="fb" className="m-18" />
      <img src={instagram} alt="ig" className="m-18" />
      <img src={youtube} alt="yt" className="m-18" />
    </Anchor>
  </div>
);
