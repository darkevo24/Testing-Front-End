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
        {records.length
          ? records.map((record, i) => (
              <BeritaCard key={i}>
                <BeritaCardImageWrapper>
                  <BeritaCardImage src={record.image} />
                </BeritaCardImageWrapper>
                <BeritaCardContent>
                  <BeritaCardTanggal>{record.slug}</BeritaCardTanggal>
                  <BeritaCardJudul>{record.judul}</BeritaCardJudul>
                </BeritaCardContent>
              </BeritaCard>
            ))
          : null}
      </BeritaGrid>
    </Wrapper>
  );
};

export default BeritaUtamaLain;
