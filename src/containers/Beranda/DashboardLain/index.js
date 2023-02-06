import { useEffect, useState } from 'react';

// import TableauReport from 'tableau-react';

import BerandaTop from './BerandaTop';
import { TopikDashboard } from '../TopikDashboard';
import styled from 'styled-components';

const TitleBox = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  margin-top: 50px;
  line-height: 23px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 60px;
`;

const WrapperTopik = styled.div`
  position: relative;
  z-index: 2;
  margin-top: -30px;
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
`;

const Dashboard = styled.div`
  margin: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TOPIK_DASHBOARD = [
  {
    title: 'Pertumbuhan Ekonomi',
    content:
      'https://public.tableau.com/views/pertumbuhan_ekonomi/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
  },
  {
    title: 'Tingkat Kemiskinan',
    content:
      'https://public.tableau.com/views/Tingkat_kemiskinan/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
  },
  {
    title: 'Tingkat Pengangguran Terbuka',
    content:
      'https://public.tableau.com/views/tingkat_pengangguran_terbuka/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
  },
  {
    title: 'Rasio Gini',
    content:
      'https://public.tableau.com/views/gini_rasio/GiniRasio2022?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
  },
];

// get item from TopikDashboard
const DashboardLain = (item) => {
  let width;
  let height;
  const [dashboard, setDashboard] = useState({});
  const [active, setActive] = useState('');

  if (dashboard.title === 'Pertumbuhan Ekonomi') {
    width = '1010px';
    height = '830px';
  }
  if (dashboard.title === 'Tingkat Kemiskinan') {
    width = '1105px';
    height = '835px';
  }
  if (dashboard.title === 'Tingkat Pengangguran Terbuka') {
    width = '1210px';
    height = '935px';
  }
  if (dashboard.title === 'Rasio Gini') {
    width = '1205px';
    height = '835px';
  }

  useEffect(() => {
    if (item.location.state) {
      const dash = TOPIK_DASHBOARD.find((dash) => dash.title === item.location.state);
      setDashboard(dash);
      setActive(item.location.state);
    } else {
      setDashboard(TOPIK_DASHBOARD[0]);
      setActive(TOPIK_DASHBOARD[0].title);
    }
  }, [item]);

  return (
    <>
      <BerandaTop />
      <Container>
        <Wrapper>
          <WrapperTopik>
            <TopikDashboard clickedActive={active} />
          </WrapperTopik>
          <TitleBox>{dashboard.title}</TitleBox>
          <Dashboard>
            <div style={{ width: width, height: height }}>
              <iframe
                width="100%"
                height="100%"
                style={{
                  border: ' 1px solid #ccc',
                  borderRadius: '20px',
                }}
                src={dashboard.content}
                allowFullScreen></iframe>
            </div>
          </Dashboard>
        </Wrapper>
      </Container>
    </>
  );
};

export default DashboardLain;
