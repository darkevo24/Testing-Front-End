import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import take from 'lodash/take';
import { useKeycloak } from '@react-keycloak/web';
import { Loader } from 'components';
import { datasetSelector, getDataSet, getInitialParams } from './reducer';
import { BerandaTop } from './BerandaTop';
import { SearchBeranda } from './SearchBeranda';
import { BerandaTopic } from './BerandaTopic';
import { BerandaCards } from './BerandaCards';
import bn from 'utils/bemNames';

const bem = bn('beranda');

const Container = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
const BerandaPage = () => {
  const dispatch = useDispatch();
  const { /* error, */ loading, result } = useSelector(datasetSelector);
  const { keycloak } = useKeycloak();
  const isLoggedIn = !!keycloak.authenticated;

  useEffect(() => {
    dispatch(getDataSet(getInitialParams()));
  }, []);

  const data = useMemo(() => result?.results || [], [result]);
  const trendingData = take(data, 4);
  const popularData = take(data, 4);
  return (
    <>
      <BerandaTop />
      <Container className={bem.b()}>
        <SearchBeranda />
        <BerandaTopic />
        <BerandaCards bem={bem} isLoggedIn={isLoggedIn} trendingData={trendingData} popularData={popularData} />
        {loading && <Loader fullscreen />}
      </Container>
    </>
  );
};

export default BerandaPage;
