import { useEffect } from 'react';
import { BeritaGrid, SectionTitle } from '.';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherNews, otherNewsSelector } from './reducer';

const Wrapper = styled.div`
  margin-bottom: 40px;
  position: relative;
`;

const Header = styled.div`
  color: #007aff;
  text-align: right;
  position: absolute;
  top: 26.4px;
  right: 0;
`;

const BeritaItem = styled.div`
  margin-bottom: 16px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #515154;
  margin-top: 12px;
`;

const Topik = styled.div`
  position: absolute;
  width: auto;
  top: 12px;
  left: 12px;
  font-size: 14px;
  color: #2d2627;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
`;

const Populer = (props) => {
  const dispatch = useDispatch();
  const { records, status } = useSelector(otherNewsSelector);

  useEffect(() => {
    if (status === 'idel') {
      dispatch(getOtherNews(3));
    }
  }, [dispatch, status]);

  return (
    <Wrapper>
      <SectionTitle>Populer</SectionTitle>
      <Header>Lihat Semua</Header>
      <BeritaGrid columns={props.columns}>
        {records?.length &&
          records.map((record, i) => {
            const { image, kategori, judul } = record;
            return (
              <BeritaItem key={'populer' + i}>
                <ImageWrapper>
                  <Image src={image} />
                  <Topik>{kategori}</Topik>
                </ImageWrapper>
                <Title>{judul}</Title>
              </BeritaItem>
            );
          })}
      </BeritaGrid>
    </Wrapper>
  );
};

export default Populer;
