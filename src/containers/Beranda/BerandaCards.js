import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import cx from 'classnames';
import moment from 'moment';
import truncate from 'lodash/truncate';
import { ReactComponent as TrendingSvg } from 'assets/trending.svg';
import { ReactComponent as PopulerSvg } from 'assets/populer.svg';
import { ReactComponent as CovidSvg } from 'assets/covid.svg';
import { ReactComponent as RoadSvg } from 'assets/road.svg';
import { ReactComponent as KomoditasSvg } from 'assets/komoditas.svg';
import { ReactComponent as BmkgSvg } from 'assets/bmkg.svg';
import { CardWithDetail } from 'components/Cards/CardWithDetail';
import { safeParse } from 'utils/helper';
import {
  // getDatasetPopular,
  // getDatasetTrending,
  // datasetTrendingSelector,
  // datasetPopularSelector,
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
  const linkToRedirect = isLoggedIn ? '/dataset' : '/topic-detail';
  const dispatch = useDispatch();

  const logToTrendingAPI = useCallback(
    (param, dispatch) => () => {
      const { dataSetDate, description, fileType, title, totalFile, url } = param;
      dispatch(
        logHomeTrendingOrPopular({
          title: title,
          fileType: JSON.parse(fileType),
          dataSetDate: moment(dataSetDate).format('YYYY-MM-DD'),
          description: description,
          totalFile: totalFile,
          url: url,
        }),
      ).then((result) => {
        if (!result.error) {
          window.open(url, '_self');
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

  // useEffect(() => {
  //   const divElement = document.getElementById('viz1671172435542');
  //   const vizElement = divElement.getElementsByTagName('object')[0];
  //   if (divElement.offsetWidth > 800) {
  //     vizElement.style.width = '1250px';
  //     vizElement.style.height = '705px';
  //   } else if (divElement.offsetWidth > 500) {
  //     vizElement.style.width = '1250px';
  //     vizElement.style.height = '705px';
  //   } else {
  //     vizElement.style.width = '100%';
  //     vizElement.style.height = '2400px';
  //   }
  //   const scriptElement = document.createElement('script');
  //   scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  //   vizElement.parentNode.insertBefore(scriptElement, vizElement);
  // }, []);
  return (
    <Box className={bem.e('cards-wrapper')}>
      <FlexBox className="px-16 d-none">
        <LeftBox>
          <TrendingSvg style={{ marginRight: '10px' }} />
          <TitleBox>Dataset Trending</TitleBox>
        </LeftBox>
        <a title="Lihat Semua" href={linkToRedirect} className="sdp-link-blue">
          <RightBox>Lihat Semua</RightBox>
        </a>
      </FlexBox>
      {/* <Row className="d-none">{dataTrending.length > 0 && dataTrending.map(renderDataSet('trending'))}</Row> */}
      <FlexBox className="px-16 mt-40 d-none">
        <LeftBox>
          <PopulerSvg style={{ marginRight: '10px' }} />
          <TitleBox>Dataset populer (6 bulan terakhir)</TitleBox>
        </LeftBox>
        <a title="Lihat Semua" href={linkToRedirect} className="sdp-link-blue">
          <RightBox>Lihat Semua</RightBox>
        </a>
      </FlexBox>
      {/* <Row className="d-none">{dataPopular.length > 0 && dataPopular.map(renderDataSet('popular'))}</Row> */}
      <FlexBox className="px-16 mt-40 d-none">
        <LeftBox>
          <CovidSvg style={{ marginRight: '10px' }} />
          <TitleBox>Kasus COVID-19</TitleBox>
        </LeftBox>
      </FlexBox>
      <Row className="mb-12 d-none">
        <Col>
          <iframe
            allowFullScreen
            width="100%"
            height="600px"
            frameBorder="0"
            seamless
            title="Dashboard Covid"
            src="https://analitik.data.go.id/superset/dashboard/104/"></iframe>
        </Col>
      </Row>
      <FlexBox className="px-16 mt-40">
        <LeftBox>
          <CovidSvg style={{ marginRight: '10px' }} />
          <TitleBox>Kemenkes</TitleBox>
        </LeftBox>
      </FlexBox>
      <Row style={{ marginBottom: '100px' }}>
        <Col>
          <div>
            <iframe
              width="100%"
              height="1458px"
              frameBorder="0"
              seamlessframeborder="0"
              seamless="seamless"
              title="Kemenkes"
              src="https://dashboard.kemkes.go.id/views/ProfilTenagaKesehatan/ProfilTenagaKesehatan?%3Aembed=y&%3AisGuestRedirectFromVizportal=y&%3Adisplay_spinner=no&%3Aorigin=viz_share_link&%3Aembed_code_version=3&%3AloadOrderID=0&%3Adisplay_count=n&%3AshowVizHome=n"></iframe>
          </div>
        </Col>
      </Row>
      <FlexBox className="px-16 mt-40 mb-40">
        <LeftBox>
          <RoadSvg style={{ marginRight: '10px' }} />
          <TitleBox>PUPR</TitleBox>
        </LeftBox>
      </FlexBox>
      {/* <Row className="mb-12">
        <Col>
          <iframe
            width="100%"
            height="1300px"
            frameBorder="0"
            seamless
            title="Harga Komoditas Pangan"
            src="http://103.170.104.187:8088/superset/dashboard/105/?native_filters=%28%29"></iframe>
        </Col>
      </Row> */}
      <Row style={{ marginBottom: '100px' }}>
        <Col>
          <iframe
            width="100%"
            height="680px"
            frameBorder="0"
            seamless
            title="Harga Komoditas Pangan"
            src="https://public.tableau.com/views/NeracaDataset_KemantapanJalanNasional_16445845632100/D_KemantapanNAS?:language=en-US&:display_count=n&:origin=viz_share_link9:showVizHome=no&:embed=true"></iframe>
          {/* <div class="tableauPlaceholder" id="viz1671172435542" style={{ position: 'relative' }}>
            <noscript>
              <a href="#">
                <img
                  alt=" "
                  src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ne&#47;NeracaProgramSejutaRumah_16445880332060&#47;Capaian2021&#47;1_rss.png"
                  style={{ border: 'none' }}
                />
              </a>
            </noscript>
            <object class="tableauViz" style={{ display: 'none' }}>
              <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
              <param name="embed_code_version" value="3" />
              <param name="site_root" value="" />
              <param name="name" value="NeracaProgramSejutaRumah_16445880332060&#47;Capaian2021" />
              <param name="tabs" value="yes" />
              <param name="toolbar" value="yes" />
              <param
                name="static_image"
                value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ne&#47;NeracaProgramSejutaRumah_16445880332060&#47;Capaian2021&#47;1.png"
              />
              <param name="animate_transition" value="yes" />
              <param name="display_static_image" value="yes" />
              <param name="display_spinner" value="yes" />
              <param name="display_overlay" value="yes" />
              <param name="display_count" value="yes" />
              <param name="language" value="en-US" />
            </object>
          </div> */}
        </Col>
      </Row>
      <FlexBox className="px-16 mt-40">
        <LeftBox>
          <BmkgSvg style={{ marginRight: '10px' }} />
          <TitleBox>BMKG</TitleBox>
        </LeftBox>
      </FlexBox>
      <Row className="mb-12">
        <Col>
          <iframe
            width="100%"
            height="650px"
            frameBorder="0"
            seamless
            title="Perkiraan Cuaca"
            src="http://103.170.104.187:8088/superset/dashboard/106/?native_filters=%28%29"></iframe>
        </Col>
      </Row>
    </Box>
  );
};
