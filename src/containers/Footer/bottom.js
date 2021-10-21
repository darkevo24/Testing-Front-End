import React from 'react';
import { Anchor } from 'components/Custom';
import instagram from 'assets/instagram.png';
import youtube from 'assets/youtube.png';
import facebook from 'assets/facebook.png';
import './footer.scss';

export const Bottom = () => (
  <div className="sdp-bottom-line bg-light">
    <Anchor className="sdp-anchor">Copyright © 2021 Kementerian PPN/Bappenas.</Anchor>
    <Anchor className="sdp-anchor sdp-social-media">
      <img src={facebook} alt="fb" />
      <img src={instagram} alt="ig" />
      <img src={youtube} alt="yt" />
    </Anchor>
  </div>
);
