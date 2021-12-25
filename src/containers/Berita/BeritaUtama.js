import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
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
const content = `<div> 
 <p> JAKARTA, KOMPAS.com - Kalimantan Timur (Kaltim) menjadi wilayah dena kemantapan jalan terendah di Indonesia yaitu hanna 79 persen. Untuk itu, beberapa&nbsp;program strategis penanganan jalan di Kaltim akan berfokus pada penambahan kemantapan jalan di Kaltim akan berfokus pada penambahan kemantapan jalan  </p>
 <br /><img src="https://asset.kompas.com/crops/Sxw21-U6an2dJMBvus_zIHPQGeg=/0x50:600x450/750x500/data/photo/2021/12/24/61c5456f50504.jpg" alt="Kunjungan Komisi V DPR RI dan Kementerian PUPR ke Kalimantan Timur, Selasa (20-21 Desember 2021)." />
 </div>`;
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
          const overviewContent = parse(content);
          const pragraph = overviewContent.props.children.find((child) => child.type === 'p');
          const paragrapData = pragraph.props.children;

          return (
            <div key={index}>
              <ImageBerita src={image} />
              <Tanggal>{moment(tanggalPublis).fromNow()}</Tanggal>
              <Judul onClick={(event) => handleDetail(event, id)}>{judul}</Judul>
              <div className="overview">{paragrapData.substring(0, 300)}</div>
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
