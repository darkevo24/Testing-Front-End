import styled from 'styled-components';
import { SectionTitle } from '.';

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const TopikItem = styled.div`
  border-bottom: 1px solid #e1e2ea;
  padding: 16px;

  & span {
    margin-right: 8px;
  }

  &:nth-child(2) {
    border-top: 1px solid #e1e2ea;
  }
`;

const bulan = [
  {
    month: 'Oktober',
    year: 2021,
    news: 232,
  },
  {
    month: 'September',
    year: 2021,
    news: 56,
  },
  {
    month: 'Agustus',
    year: 2021,
    news: 16,
  },
];

const BeritaLainnya = () => (
  <Wrapper>
    <SectionTitle>Berita Lainnya</SectionTitle>
    {bulan.map((el, i) => (
      <TopikItem key={'bl' + i}>
        <span style={{ color: '#007AFF' }}>{el.month}</span>
        <span>–</span>
        <span>{el.year}</span>
        <span style={{ color: '#858A8F' }}>({el.news})</span>
      </TopikItem>
    ))}
  </Wrapper>
);

export default BeritaLainnya;
