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
import { TopikDashboard } from './TopikDashboard';
import { Chat } from 'containers/Chat';
import TicketModal from 'containers/Chat/TicketModal';
import bn from 'utils/bemNames';

const bem = bn('beranda');

const Container = styled.div`
  width: 1280px;
  height: 100%;
  margin: 0 auto;
`;

const TitleBox = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
`;
const Wrapper = styled.div`
  padding: 0 20px;
  margin-top: 50px;
  height: 60vh;
`;

const Section = styled.div`
  margin: 30px 0px;
`;

const BerandaPage = () => {
  const dispatch = useDispatch();
  const { /* error, */ loading, result } = useSelector(datasetSelector);
  // const { keycloak } = useKeycloak();
  // const isLoggedIn = !!keycloak.authenticated;
  const [file, setFile] = React.useState('');

  useEffect(() => {
    dispatch(getDataSet(getInitialParams()));
  }, [file]);

  // const data = useMemo(() => result?.results || [], [result]);
  // const trendingData = take(data, 4);
  // const popularData = take(data, 4);
  return (
    <>
      <BerandaTop />
      <Container className={bem.b()}>
        <SearchBeranda />
        <Wrapper>
          <Section>
            <TitleBox className="mt-6 mb-10">Topik Data</TitleBox>
            <BerandaTopic />
          </Section>

          <Section>
            <TitleBox className="mt-6 mb-10">Topik Dashboard</TitleBox>
            <TopikDashboard />
          </Section>
          {loading && <Loader fullscreen />}
        </Wrapper>
      </Container>
      <Chat setFile={setFile} />
      {file && (
        <TicketModal backgroundColor="#FFF" width="w-75 h-100">
          <div className="p-16 max-h-screen">
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
