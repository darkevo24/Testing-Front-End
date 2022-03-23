import React from 'react';
import { Anchor } from 'components/Custom';
import instagram from 'assets/instagram.png';
import youtube from 'assets/youtube.png';
import facebook from 'assets/facebook.png';
import './footer.scss';

const socialLinks = [
  { key: 'fb', link: 'https://www.facebook.com/datagoidofficial', icon: facebook },
  { key: 'ig', link: 'https://www.instagram.com/data.go.id', icon: instagram },
  { key: 'yt', link: 'https://www.youtube.com/channel/UChxW2SR1NrmF2QU-k0pUP_A', icon: youtube },
];

export const Bottom = () => (
  <div className="sdp-bottom-line w-100 d-flex justify-content-around align-items-center bg-gray">
    <Anchor className="sdp-anchor">Copyright © 2021 Kementerian PPN/Bappenas.</Anchor>
    <div>
      {socialLinks.map((item) => (
        <Anchor key={item.key} className="sdp-anchor justify-content-around" href={item.link} target="_blank">
          <img src={item.icon} alt={item.key} className="m-18" />
        </Anchor>
      ))}
    </div>
  </div>
);
