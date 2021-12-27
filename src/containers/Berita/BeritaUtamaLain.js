import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SectionTitle, BeritaGrid } from '.';
import { getLatestNews, latestNewsSelector } from './reducer';
import {
  BeritaCard,
  BeritaCardImage,
  BeritaCardContent,
  BeritaCardTanggal,
  BeritaCardJudul,
  BeritaCardImageWrapper,
} from './BeritaCard';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
  margin-bottom: 80px;
`;

const BeritaUtamaLain = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { records, status } = useSelector(latestNewsSelector);

  useEffect(() => {
    if (status === 'idel') {
      dispatch(getLatestNews(3));
    }
  }, [dispatch, status]);
  const handleDetail = (event, title) => {
    event.preventDefault();
    history.push(`/berita/${title}`);
  };

  return (
    <Wrapper>
      <SectionTitle>Berita Utama Lainnya</SectionTitle>
      <BeritaGrid columns={props.columns}>
        {records.length
          ? records.map((value, i) => {
              const { image, judul, id } = value;
              return (
                <BeritaCard key={i}>
                  <BeritaCardImageWrapper>
                    <BeritaCardImage src={image} />
                  </BeritaCardImageWrapper>
                  <BeritaCardContent>
                    <BeritaCardJudul onClick={(event) => handleDetail(event, id)}>{judul}</BeritaCardJudul>
                  </BeritaCardContent>
                </BeritaCard>
              );
            })
          : null}
      </BeritaGrid>
    </Wrapper>
  );
};

export default BeritaUtamaLain;
