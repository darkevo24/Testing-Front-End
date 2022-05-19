import { React, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { globalData } from '../App/reducer';
import _ from 'lodash';

import { ReactComponent as BerandaImage } from './BerandaImage.svg';

const BoxImage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 43px;
  align-items: center;
  justify-content: space-around;
  background: #f5f6fa;
`;

const LargeTitle = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
`;

const MediumTitle = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

export const BerandaTop = () => {
  const { records } = useSelector(globalData);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    if (!_.isEmpty(records)) {
      let data = _.groupBy(records, 'code');
      if (!_.isEmpty(data.BANNER[0])) {
        setBanner(data.BANNER[0]?.content?.url);
      }
    }
  }, [records]);

  return (
    <BoxImage>
      <LargeTitle>Data Indonesia, Dalam Satu Portal</LargeTitle>
      <MediumTitle>Temukan data-data Pemerintah dengan mudah!</MediumTitle>
      {/* <BerandaImage /> */}
      <img src={banner} width="80%" />
    </BoxImage>
  );
};
