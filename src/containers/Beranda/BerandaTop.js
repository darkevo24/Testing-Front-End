import { React, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { globalData } from '../App/reducer';
import _ from 'lodash';

import { ReactComponent as BerandaImage } from './BerandaImage.svg';

const BoxImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
  position: relative;
  height: 310px;
`;

const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const LargeTitle = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  z-index: 1;
`;

const MediumTitle = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  z-index: 1;
`;

const ImageBanner = styled.img`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  @media only screen and (max-width: 768px) {
    width: 250%;
  }
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
      {/* <LargeTitle>Data Indonesia, Dalam Satu Portal</LargeTitle>
      <MediumTitle>Temukan data-data Pemerintah dengan mudah!</MediumTitle> */}
      {/* <BerandaImage /> */}
      <ContainerContent>
        <LargeTitle>Data Indonesia, Dalam Satu Portal</LargeTitle>
        <MediumTitle>Temukan data-data Pemerintah dengan mudah!</MediumTitle>
      </ContainerContent>
      <ImageBanner src={banner} />
    </BoxImage>
  );
};
