import React, { useEffect, useMemo } from 'react';
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
import { Chat } from 'containers/Chat';
import TicketModal from 'containers/Chat/TicketModal';
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
  const [file, setFile] = React.useState('');

  useEffect(() => {
    dispatch(getDataSet(getInitialParams()));
  }, [file]);

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
      <Chat setFile={setFile} />
      {file && (
        <TicketModal backgroundColor="#FFF" width="w-75 h-100">
          <div className="p-16">
            <div className="d-flex justify-content-end cursor-pointer" onClick={() => setFile(null)}>
              &#x2715;
            </div>
            {file?.type === 'image' && <img className="w-100" src={file?.file} alt="file-data" />}
            {file?.type === 'pdf' && (
              <div className="w-100">
                <iframe className="w-100 min-vh-100" src={file?.file} title="pdf file" />
              </div>
            )}
          </div>
        </TicketModal>
      )}
    </>
  );
};

export default BerandaPage;
