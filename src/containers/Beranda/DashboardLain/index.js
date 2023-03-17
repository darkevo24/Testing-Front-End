import { useEffect, useState } from 'react';
import BerandaTop from './BerandaTop';
import CarouselTopik from './CarouselTopik';
import styled from 'styled-components';
import { TOPIC_DASHBOARD } from './constants';

const TitleBox = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  margin-top: 50px;
  line-height: 23px;
  width: 100%;
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
  align-items: center;
`;

const WrapperTopik = styled.div`
  position: relative;
  z-index: 2;
  margin-top: -30px;
  width: 1100px;
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
  margin-top: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const DashboardLain = (item) => {
  const [dashboard, setDashboard] = useState({});
  const [active, setActive] = useState('');

  useEffect(() => {
    if (item.location.state) {
      const dash = TOPIC_DASHBOARD.find((dash) => dash.title === item.location.state);
      setDashboard(dash);
      setActive(item.location.state);
    } else {
      setDashboard(TOPIC_DASHBOARD[0]);
      setActive(TOPIC_DASHBOARD[0].title);
    }
  }, [item]);

  return (
    <>
      <Container>
        <BerandaTop dashboard={dashboard} />
        <Wrapper>
          <CarouselTopik clickedActive={active} />
          <TitleBox>{dashboard.title}</TitleBox>
          <Dashboard>
            <div style={{ width: dashboard.width, height: dashboard.height }}>
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
