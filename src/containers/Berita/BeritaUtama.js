import styled from 'styled-components';

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

const konten = {
  imageSrc:
    'https://cdn0-production-images-kly.akamaized.net/vwHy0ejPTOoORGDh-lBV1cUScQM=/640x358/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3532284/original/011004900_1628161432-20210805-Harga-emas-alami-penurunan-ANGGA-3.jpg',
  tanggal: '2 jam lalu',
  judul: 'Harga Emas Antam Turun Lagi, Berikut Daftarnya per 9 November 2021',
  overview:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
};

const BeritaUtama = () => (
  <Wrapper>
    <ImageBerita src={konten.imageSrc} />
    <Tanggal>{konten.tanggal}</Tanggal>
    <Judul>{konten.judul}</Judul>
    <Overview>{konten.overview}</Overview>
  </Wrapper>
);

export default BeritaUtama;
