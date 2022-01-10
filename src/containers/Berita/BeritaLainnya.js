import { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SectionTitle } from '.';
import { getMonthlyNews, monthlyNewsSelector } from './reducer';

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

const BeritaLainnya = () => {
  const dispatch = useDispatch();
  const { records, status } = useSelector(monthlyNewsSelector);
  const history = useHistory();

  useEffect(() => {
    if (status === 'idel') {
      dispatch(getMonthlyNews('/perbulan'));
    }
  }, [dispatch, status]);

  const handleDetail = (event, date) => {
    event.preventDefault();
    history.push(`/berita/perbulan/${date}`);
  };

  return (
    <Wrapper>
      <SectionTitle>Berita Lainnya</SectionTitle>
      {records.length
        ? records.map((value, index) => (
            <TopikItem key={index}>
              <span
                style={{ color: 'var(--blue)', cursor: 'pointer' }}
                onClick={(e) => handleDetail(e, `${value.month}-${value.year}`)}>
                {value.bulan}
              </span>
              <span>–</span>
              <span>{value.year}</span>
              <span style={{ color: 'var(--gray)' }}>({value.jumlah})</span>
            </TopikItem>
          ))
        : null}
    </Wrapper>
  );
};

export default BeritaLainnya;
