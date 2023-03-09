import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import BerandaBanner from './BerandaTop.svg';
import Bendera from './Bendera.svg';
import { useSelector } from 'react-redux';
import { globalData } from '../App/reducer';
import _ from 'lodash';

import { ReactComponent as BerandaImage } from './BerandaImage.svg';
import { isSdiProduction } from 'utils/constants';

const BoxImage = styled.div`
  display: flex;
  justify-content: center;
  ${isSdiProduction
    ? `flex-direction: column;
    align-items: center;
    background: #f5f6fa;
  position: relative;
  height: 310px;`
    : `background: #fef8f5;
  flex-direction: row;`}
`;

const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${isSdiProduction &&
  `align-items: center;
  position: absolute;`}
`;

const LargeTitle = styled.p`
  font-weight: bold;
  font-size: ${isSdiProduction ? '24px' : '40px'};
  line-height: 30px;
  z-index: 1;
`;

const MediumTitle = styled.p`
  font-weight: normal;
  font-size: ${isSdiProduction ? '14px' : '18px'};
  line-height: 17px;
  z-index: 1;
  ${!isSdiProduction && 'margin-bottom: 0;'}
`;

const MediumWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
      <ContainerContent>
        {isSdiProduction ? (
          <>
            <LargeTitle>Data Indonesia, Dalam Satu Portal</LargeTitle>
            <MediumTitle>Temukan data-data Pemerintah dengan mudah!</MediumTitle>
          </>
        ) : (
          <>
            <LargeTitle>
              Data <span style={{ color: '#ed1c24' }}>Indonesia,</span>
            </LargeTitle>
            <LargeTitle>
              Dalam Satu <span style={{ color: '#ed1c24' }}>Portal</span>
            </LargeTitle>
            <MediumWrapper>
              <img src={Bendera} style={{ width: '30px', marginRight: '10px' }} />
              <MediumTitle>Temukan data-data Pemerintah dengan mudah!</MediumTitle>
            </MediumWrapper>
          </>
        )}
      </ContainerContent>
      {isSdiProduction ? (
        <ImageBanner src={banner} />
      ) : (
        <>
          <div></div>
          <div>
            <ImageBanner src={BerandaBanner} />
          </div>
        </>
      )}
    </BoxImage>
  );
};

export default BerandaTop;
