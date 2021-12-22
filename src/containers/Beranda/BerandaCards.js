import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import cx from 'classnames';
import moment from 'moment';
import { convertTitleToSlug, getDatasetUrl } from 'utils/helper';
import truncate from 'lodash/truncate';
import { ReactComponent as TrendingSvg } from 'assets/trending.svg';
import { ReactComponent as PopulerSvg } from 'assets/populer.svg';
import { CardWithDetail } from 'components/Cards/CardWithDetail';
import { safeParse } from 'utils/helper';
import {
  getDatasetPopular,
  getDatasetTrending,
  datasetTrendingSelector,
  datasetPopularSelector,
  logHomeTrendingOrPopular,
} from './reducer';

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

export const BerandaCards = ({ bem, isLoggedIn }) => {
  const history = useHistory();
  const linkToRedirect = isLoggedIn ? '/dataset' : '/topic-detail';
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDatasetTrending('trending'));
    dispatch(getDatasetPopular('populer'));
  }, []);

  const logToTrendingAPI = useCallback(
    (param, dispatch) => () => {
      const { dataSetDate, description, fileType, title, totalFile } = param;
      const slug = convertTitleToSlug(title);
      const href = getDatasetUrl(slug);
      dispatch(
        logHomeTrendingOrPopular({
          title: title,
          fileType: JSON.parse(fileType),
          dataSetDate: moment(dataSetDate).format('YYYY-MM-DD'),
          description: description,
          totalFile: totalFile,
          url: href,
        }),
      ).then((result) => {
        if (!result.error) {
          history.push({
            pathname: `/dataset/${slug}`,
          });
        }
      });
    },
    [],
  );

  const renderDataSet = (group) => (data, index) => {
    return (
      <Col
        key={`CardWithDetail-${group}-${index}`}
        xs={12}
        sm={6}
        lg={3}
        className={cx('d-flex justify-content-center', bem.e('card-box'))}>
        <CardWithDetail
          LogForClick={logToTrendingAPI(data, dispatch)}
          formats={safeParse(data.fileType)}
          key={`${group}-${data.id}`}
          title={truncate(data.title, { length: 60 })}
          description={truncate(data.description, { length: 80 })}
          count={data.totalFile}
          date={moment(new Date(data.dataSetDate)).format('DD MMM YYYY')}
          views={data.viewCount}
        />
      </Col>
    );
  };
  const { records: dataTrending } = useSelector(datasetTrendingSelector);
  const { records: dataPopular } = useSelector(datasetPopularSelector);
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
      <Row>{dataTrending.length > 0 && dataTrending.map(renderDataSet('trending'))}</Row>
      <FlexBox className="px-16 mt-40">
        <LeftBox>
          <PopulerSvg style={{ marginRight: '10px' }} />
          <TitleBox>Dataset populer</TitleBox>
        </LeftBox>
        <a title="Lihat Semua" href={linkToRedirect} className="sdp-link-blue">
          <RightBox>Lihat Semua</RightBox>
        </a>
      </FlexBox>
      <Row>{dataPopular.length > 0 && dataPopular.map(renderDataSet('popular'))}</Row>
    </Box>
  );
};
