import { BeritaGrid, SectionTitle } from '.';
import styled from 'styled-components';

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
  return (
    <Wrapper>
      <SectionTitle>Populer</SectionTitle>
      <Header>Lihat Semua</Header>
      <BeritaGrid columns={props.columns}>
        {Array.apply(null, { length: props.jumlah }).map((e, i) => (
          <BeritaItem>
            <ImageWrapper>
              <Image src="https://cdn0-production-images-kly.akamaized.net/qCtvfeEWHK-aiReMuuZFBm7y-3Q=/300x172/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3626876/original/071959500_1636427539-IMG-20211109-WA0003.jpg" />
              <Topik>Megapolitan</Topik>
            </ImageWrapper>
            <Title>
              Kemenhub Berbagi Pengalaman Penanganan Covid-19 Sektor Transportasi Di Forum ASEAN-Republik Korea ke-11
            </Title>
          </BeritaItem>
        ))}
      </BeritaGrid>
    </Wrapper>
  );
};

export default Populer;
