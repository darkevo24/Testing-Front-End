import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TrendingSvg } from 'assets/trending.svg';
import { ReactComponent as PopulerSvg } from 'assets/populer.svg';
import { CardWithDetail } from '../../components/Cards/CardWithDetail';

const Box = styled.div`
  margin: 80px 0;
`;

const FlexBox = styled.div`
  display: flex;
  margin: 16px 0;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const RightBox = styled.div`
  margin-left: auto;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #007aff;
`;

const TitleBox = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
`;

export const Cards = () => (
  <Box>
    <FlexBox>
      <LeftBox>
        <TrendingSvg style={{ margin: '0 10px' }} />
        <TitleBox>Dataset Trending</TitleBox>
      </LeftBox>
      <RightBox>Lihat Semua</RightBox>
    </FlexBox>
    <FlexBox>
      <CardWithDetail
        title={'Banjarnegara Dalam Angka BDA 2021'}
        description={'Pemerintah Kabupaten Banjar Negara'}
        date={'12 Jan 2021'}
        views={232}
      />
      <CardWithDetail
        title={'DIK Kabupaten Karanganyar Tahun 2021'}
        description={'Pemerintah Kabupaten Banjar Negara'}
        date={'12 Jan 2021'}
        views={232}
      />
      <CardWithDetail
        title={'Banjarnegara Dalam Angka BDA 2021'}
        description={'Pemerintah Kabupaten Banjar Negara'}
        date={'12 Jan 2021'}
        views={232}
      />
      <CardWithDetail
        title={'Banjarnegara Dalam Angka BDA 2021'}
        description={'Pemerintah Kabupaten Banjar Negara'}
        date={'12 Jan 2021'}
        views={232}
      />
    </FlexBox>
    <FlexBox style={{ marginTop: '40px' }}>
      <LeftBox>
        <PopulerSvg style={{ margin: '0 10px' }} />
        <TitleBox>Dataset populer</TitleBox>
      </LeftBox>
      <RightBox>Lihat Semua</RightBox>
    </FlexBox>
    <FlexBox>
      <CardWithDetail
        title={'Banjarnegara Dalam Angka BDA 2021'}
        description={'Pemerintah Kabupaten Banjar Negara'}
        date={'12 Jan 2021'}
        views={232}
      />
      <CardWithDetail
        title={'DIK Kabupaten Karanganyar Tahun 2021'}
        description={'Pemerintah Kabupaten Banjar Negara'}
        date={'12 Jan 2021'}
        views={232}
      />
      <CardWithDetail
        title={'Banjarnegara Dalam Angka BDA 2021'}
        description={'Pemerintah Kabupaten Banjar Negara'}
        date={'12 Jan 2021'}
        views={232}
      />
      <CardWithDetail
        title={'Banjarnegara Dalam Angka BDA 2021'}
        description={'Pemerintah Kabupaten Banjar Negara'}
        date={'12 Jan 2021'}
        views={232}
      />
    </FlexBox>
  </Box>
);
