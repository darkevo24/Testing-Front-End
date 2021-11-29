import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import take from 'lodash/take';
import { Loader } from 'components';
import { datasetSelector, getDataSet, getInitialParams } from './reducer';
import { Top } from './Top';
import { Search } from './Search';
import { Topic } from './Topic';
import { Cards } from './Cards';

const Container = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
const BerandaPage = () => {
  const dispatch = useDispatch();
  const { /* error, */ loading, result } = useSelector(datasetSelector);

  useEffect(() => {
    dispatch(getDataSet(getInitialParams()));
  }, []);

  const data = useMemo(() => result?.results || [], [result]);
  const trendingData = take(data, 4);
  const popularData = take(data, 4);
  return (
    <>
      <Top />
      <Container>
        <Search />
        <Topic />
        <Cards trendingData={trendingData} popularData={popularData} />
        {loading && <Loader fullscreen />}
      </Container>
    </>
  );
};

export default BerandaPage;
