import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/id';
import parse from 'html-react-parser';
import { latestNewsSelector, getLatestNews } from './reducer';

const Wrapper = styled.div`
  margin-bottom: 80px;
`;

const ImageBerita = styled.img`
  width: 100%;
  margin-bottom: 24px;
`;

const Tanggal = styled.div`
  font-size: 14px;
  color: #515154;
  margin-bottom: 16px;
`;

const Judul = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  color: #2d2627;
  margin-bottom: 16px;
`;

const Overview = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #515154;
`;

const BeritaUtama = () => {
  const dispatch = useDispatch();
  moment.locale('id');
  const { records: dataLatestNews } = useSelector(latestNewsSelector);

  useEffect(() => {
    try {
      dispatch(getLatestNews('latest/category'));
    } catch (e) {}
  }, []);
  return (
    <Wrapper>
      {dataLatestNews.length > 0 &&
        dataLatestNews.map((value) => {
          const { image, judul, partContent, tanggalPublis } = value;
          return (
            <>
              <ImageBerita src={image} />
              <Tanggal>{moment(tanggalPublis).fromNow()}</Tanggal>
              <Judul>{judul}</Judul>
              <Overview>{parse(partContent)}</Overview>
            </>
          );
        })}
    </Wrapper>
  );
};

export default BeritaUtama;
