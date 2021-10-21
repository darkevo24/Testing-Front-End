import React from 'react';
import styled from 'styled-components';
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

export const Top = () => (
  <BoxImage>
    <LargeTitle>Data Indonesia, Dalam Satu Portal</LargeTitle>
    <MediumTitle>Temukan data-data Pemerintah dengan mudah!</MediumTitle>
    <BerandaImage />
  </BoxImage>
);
