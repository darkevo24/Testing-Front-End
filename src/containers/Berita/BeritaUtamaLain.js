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

const Wrapper = styled.div`
  margin-bottom: 80px;
`;

const BeritaUtamaLain = (props) => {
  const dispatch = useDispatch();
  const { records, status } = useSelector(latestNewsSelector);

  useEffect(() => {
    if (status === 'idel') {
      dispatch(getLatestNews(3));
    }
  }, [dispatch, status]);

  return (
    <Wrapper>
      <SectionTitle>Berita Utama Lainnya</SectionTitle>
      <BeritaGrid columns={props.columns}>
        {records.length &&
          records.map((value, i) => {
            const { image, slug, judul } = value;
            return (
              <BeritaCard key={i}>
                <BeritaCardImageWrapper>
                  <BeritaCardImage src={image} />
                </BeritaCardImageWrapper>
                <BeritaCardContent>
                  <BeritaCardTanggal>{slug}</BeritaCardTanggal>
                  <BeritaCardJudul>{judul}</BeritaCardJudul>
                </BeritaCardContent>
              </BeritaCard>
            );
          })}
      </BeritaGrid>
    </Wrapper>
  );
};

export default BeritaUtamaLain;
