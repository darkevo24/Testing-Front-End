import React, { useEffect, useState } from 'react';
import { Anchor } from 'components/Custom';
import { globalData } from 'containers/App/reducer';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import instagram from 'assets/instagram.png';
import youtube from 'assets/youtube.png';
import facebook from 'assets/facebook.png';
import './footer.scss';

export const Bottom = () => {
  const { records } = useSelector(globalData);
  const [facebookUrl, setFacebookUrl] = useState(null);
  const [instagramUrl, setInstagramUrl] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState(null);
  const socialLinks = [
    { key: 'fb', link: facebookUrl, icon: facebook },
    { key: 'ig', link: instagramUrl, icon: instagram },
    { key: 'yt', link: youtubeUrl, icon: youtube },
  ];

  useEffect(() => {
    if (!_.isEmpty(records)) {
      let data = _.groupBy(records, 'contentType');
      let data2 = _.groupBy(data.SOCIALMEDIA, 'code');
      setFacebookUrl(data2.FACEBOOK_URL[0].content.url);
      setInstagramUrl(data2.INSTAGRAM_URL[0].content.url);
      setYoutubeUrl(data2.YOUTUBE_URL[0].content.url);
    }
  }, [records]);

  return (
    <div className="sdp-bottom-line w-100 d-flex justify-content-around align-items-center bg-gray">
      <Anchor className="sdp-anchor">Copyright © 2021 Kementerian PPN/Bappenas.</Anchor>
      <div>
        {socialLinks.map((item) => (
          <Anchor key={item.key} className="sdp-anchor justify-content-around" href={item.link} target="_blank">
            {item.link ? <img src={item.icon} alt={item.key} className="m-18" /> : ''}
          </Anchor>
        ))}
      </div>
    </div>
  );
};
