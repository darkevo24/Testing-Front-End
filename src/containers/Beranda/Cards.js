import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import uniqBy from 'lodash/uniqBy';
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

export const Cards = ({ trendingData = [], popularData = [] }) => {
  const renderDataSet = (data) => {
    // const dataSetUrl = `/data/dataset/${data.name}`;
    const numberOfMaxFormats = 2;
    const uniqFormats =
      uniqBy(
        data.resources.filter((r) => !!r.format),
        'format',
      ) || [];
    const formatesToShow = uniqFormats.slice(0, numberOfMaxFormats);
    const hiddenFormats = uniqFormats.length - formatesToShow.length;
    return (
      <CardWithDetail
        title={data.title}
        description={data.notes}
        count={data.num_resources}
        formats={formatesToShow}
        hiddenFormats={hiddenFormats}
        date={moment(new Date(data.metadata_created)).format('DD MMM YYYY')}
        views={232}
      />
    );
  };
  return (
    <Box>
      <FlexBox>
        <LeftBox>
          <TrendingSvg style={{ margin: '0 10px' }} />
          <TitleBox>Dataset Trending</TitleBox>
        </LeftBox>
        <RightBox>Lihat Semua</RightBox>
      </FlexBox>
      <FlexBox>{trendingData.map(renderDataSet)}</FlexBox>
      <FlexBox style={{ marginTop: '40px' }}>
        <LeftBox>
          <PopulerSvg style={{ margin: '0 10px' }} />
          <TitleBox>Dataset populer</TitleBox>
        </LeftBox>
        <RightBox>Lihat Semua</RightBox>
      </FlexBox>
      <FlexBox>{popularData.map(renderDataSet)}</FlexBox>
    </Box>
  );
};
