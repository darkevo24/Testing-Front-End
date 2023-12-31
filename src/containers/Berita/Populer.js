import { useEffect, useState } from 'react';
import { BeritaGrid, SectionTitle } from '.';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherNews, otherNewsSelector } from './reducer';
import { useHistory } from 'react-router-dom';

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
  cursor: pointer;
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
  cursor: pointer;
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
  const history = useHistory();
  const { records } = useSelector(otherNewsSelector);
  const [size] = useState(3);

  useEffect(() => {
    dispatch(getOtherNews(size));
  }, [dispatch, size]);

  const handleDetail = (event, id, slug) => {
    event.preventDefault();
    history.push(`/berita/${id}/${slug}`);
  };
  const handletGetAll = (e) => {
    e.preventDefault();
    history.push(`/berita-populer`);
  };
  return (
    <Wrapper>
      <SectionTitle>Populer</SectionTitle>
      <Header onClick={handletGetAll}>Lihat Semua</Header>
      <BeritaGrid columns={props.columns}>
        {records?.length
          ? records.map((record, i) => {
              const { image, kategori, judul, id, slug } = record;
              return (
                <BeritaItem key={'populer' + i}>
                  <ImageWrapper>
                    <Image src={image} />
                    <Topik>{kategori}</Topik>
                  </ImageWrapper>
                  <Title onClick={(event) => handleDetail(event, id, slug)}>{judul}</Title>
                </BeritaItem>
              );
            })
          : null}
      </BeritaGrid>
    </Wrapper>
  );
};

export default Populer;
