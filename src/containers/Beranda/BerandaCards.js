import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import cx from 'classnames';
import moment from 'moment';
import uniqBy from 'lodash/uniqBy';
import truncate from 'lodash/truncate';
import { ReactComponent as TrendingSvg } from 'assets/trending.svg';
import { ReactComponent as PopulerSvg } from 'assets/populer.svg';
import { CardWithDetail } from 'components/Cards/CardWithDetail';
import { getDatasetUrl } from 'utils/helper';

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

export const BerandaCards = ({ bem, isLoggedIn, trendingData = [], popularData = [] }) => {
  const linkToRedirect = isLoggedIn ? '/dataset' : '/topic-detail';
  const renderDataSet = (group) => (data) => {
    const dataSetUrl = getDatasetUrl(data.name);
    const numberOfMaxFormats = 2;
    const uniqFormats =
      uniqBy(
        data.resources.filter((r) => !!r.format),
        'format',
      ) || [];
    const formatesToShow = uniqFormats.slice(0, numberOfMaxFormats);
    const hiddenFormats = uniqFormats.length - formatesToShow.length;
    return (
      <Col xs={12} sm={6} lg={3} className={cx('d-flex justify-content-center', bem.e('card-box'))}>
        <CardWithDetail
          key={`${group}-${data.id}`}
          dataSetUrl={dataSetUrl}
          title={truncate(data.title, { length: 60 })}
          description={truncate(data.notes, { length: 80 })}
          count={data.num_resources}
          formats={formatesToShow}
          hiddenFormats={hiddenFormats}
          date={moment(new Date(data.metadata_created)).format('DD MMM YYYY')}
          views={232}
        />
      </Col>
    );
  };
  return (
    <Box className={bem.e('cards-wrapper')}>
      <FlexBox className="px-16">
        <LeftBox>
          <TrendingSvg style={{ marginRight: '10px' }} />
          <TitleBox>Dataset Trending</TitleBox>
        </LeftBox>
        <a title="Lihat Semua" href={linkToRedirect} className="sdp-link-blue">
          <RightBox>Lihat Semua</RightBox>
        </a>
      </FlexBox>
      <Row>{trendingData.map(renderDataSet('trending'))}</Row>
      <FlexBox className="px-16 mt-40">
        <LeftBox>
          <PopulerSvg style={{ marginRight: '10px' }} />
          <TitleBox>Dataset populer</TitleBox>
        </LeftBox>
        <a title="Lihat Semua" href={linkToRedirect} className="sdp-link-blue">
          <RightBox>Lihat Semua</RightBox>
        </a>
      </FlexBox>
      <Row>{popularData.map(renderDataSet('popular'))}</Row>
    </Box>
  );
};
