import { SectionTitle, BeritaGrid } from '.';
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

const berita = [
  {
    imageSrc:
      'https://cdn1-production-images-kly.akamaized.net/lP8__Nqt_F5z3Wl1vxaeHXDYeUM=/0x0:1080x608/190x110/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3623450/original/002995100_1636071626-172176025_3929982530372174_4839663386672368783_n.jpg',
    tanggal: '42 menit lalu',
    judul: 'Kemenhub Berbagi Pengalaman Penanganan Covid-19 Sektor Transportasi Di Forum ASEAN-Republik Korea ke-11',
  },
  {
    imageSrc:
      'https://cdn1-production-images-kly.akamaized.net/7VkCxDMu3Vy1g5yBuvvPMCV_ZqQ=/190x110/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3616176/original/060248000_1635423093-20211028-Pemberlakuan-Sanksi-Tilang-Pelanggar-Ganjil-Genap-IQBAL-5.jpg',
    tanggal: '46 menit lalu',
    judul: 'Kemenhub Berbagi Pengalaman Penanganan Covid-19 Sektor Transportasi Di Forum ASEAN-Republik Korea ke-11',
  },
  {
    imageSrc:
      'https://cdn0-production-images-kly.akamaized.net/Rvkpnn6Zqzxd6g7_DU3svwtGmH8=/190x110/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3147844/original/052877300_1591689580-200609_liga_Serie_A.jpg',
    tanggal: '1 jam lalu',
    judul: 'Kemenhub Berbagi Pengalaman Penanganan Covid-19 Sektor Transportasi Di Forum ASEAN-Republik Korea ke-11',
  },
];

const KegiatanSatuData = (props) => {
  return (
    <Wrapper>
      <SectionTitle>Kegiatan Satu Data Indonesia</SectionTitle>
      <BeritaGrid columns={props.columns}>
        {Array.apply(null, { length: props.jumlah }).map((e, i) => (
          <BeritaCard key={'ksdi' + i}>
            <BeritaCardImageWrapper>
              <BeritaCardImage src={berita[i % 3].imageSrc} />
            </BeritaCardImageWrapper>
            <BeritaCardContent>
              <BeritaCardTanggal>{berita[i % 3].tanggal}</BeritaCardTanggal>
              <BeritaCardJudul>{berita[i % 3].judul}</BeritaCardJudul>
            </BeritaCardContent>
          </BeritaCard>
        ))}
      </BeritaGrid>
    </Wrapper>
  );
};

export default KegiatanSatuData;
