import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { truncate } from 'lodash';
import 'moment/locale/id';
import parse from 'html-react-parser';
import { useHistory } from 'react-router-dom';
import { gethighlightedNews, highlightedNewsSelector } from './reducer';
import './berita.scss';

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
  cursor: pointer;
`;
const BeritaUtama = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  moment.locale('id');
  const { records, status } = useSelector(highlightedNewsSelector);

  useEffect(() => {
    if (status === 'idel') dispatch(gethighlightedNews('latest/category'));
  }, [dispatch, status]);

  const handleDetail = (event, title) => {
    event.preventDefault();
    history.push(`/berita/${title}`);
  };
  return (
    <Wrapper>
      {records.length > 0 &&
        records.map((value, index) => {
          const { image, judul, partContent, tanggalPublis, id } = value;
          const truncatedParagrapData = truncate(partContent, {
            length: 200,
            separator: ' ',
          });
          return (
            <div key={index}>
              <ImageBerita src={image} />
              <Tanggal>{moment(tanggalPublis).fromNow()}</Tanggal>
              <Judul onClick={(event) => handleDetail(event, id)}>{judul}</Judul>
              <div className="overview">{parse(truncatedParagrapData)}</div>
              <a className="read-more-link" onClick={(event) => handleDetail(event, id)}>
                <h6>Read More</h6>
              </a>
            </div>
          );
        })}
    </Wrapper>
  );
};

export default BeritaUtama;
