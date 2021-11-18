import styled from 'styled-components';
import { BeritaGrid } from '.';

const Wrapper = styled.div`
  border-top: 4px solid #ff0000;
  padding-top: 32px;
`;

const BeritaItem = styled.div`
  padding: 32px 0;
  border-bottom: 1px solid #e1e2ea;
`;

const Topik = styled.div`
  font-size: 14px;
  color: #007aff;
  background: rgba(0, 122, 255, 0.12);
  border-radius: 4px;
  padding: 8px 12px;
  display: inline-block;
`;

const Judul = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #2d2627;
  margin: 12px 0;
`;

const Konten = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: #515154;
`;

const Image = styled.img`
  width: 100%;
`;

const ButtonLoadMore = styled.button`
  background: #f5f6fa;
  border-radius: 4px;
  font-size: 14px;
  color: #2d2627;
  padding: 16px 24px;
  margin: 32px 0;
  border: 0;
`;

const ListBerita = (props) => {
  return (
    <Wrapper>
      <BeritaGrid columns={props.columns}>
        {Array.apply(null, { length: props.jumlah }).map((e, i) => (
          <BeritaItem className="row" key={'lb' + i}>
            <div className="col-lg-4" style={{ paddingRight: '24px' }}>
              <Image src="https://cdn0-production-images-kly.akamaized.net/gIDRPzEs3mEphuPi_b90S6FVvvs=/200x112/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3611600/original/089535000_1635120005-20211025-Fabio-Quartararo-6.jpg" />
            </div>
            <div className="col-lg-8">
              <Topik>Kesehatan</Topik>
              <Judul>
                Kemenhub Berbagi Pengalaman Penanganan Covid-19 Sektor Transportasi Di Forum ASEAN-Republik Korea ke-11
              </Judul>
              <Konten>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </Konten>
            </div>
          </BeritaItem>
        ))}
      </BeritaGrid>
      <ButtonLoadMore>Muat Lebih Banyak</ButtonLoadMore>
    </Wrapper>
  );
};

export default ListBerita;
