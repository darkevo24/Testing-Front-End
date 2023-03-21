import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
import CardTopikDashboard from 'components/Cards/CardTopikDashboard';
import { TOPIC_DASHBOARD } from './DashboardLain/constants';
const Box = styled.div`
  margin-top: 16px;
  display: inline-flex;
`;

const BoxFlex = styled.div`
  display: flex;
`;

export const TopikDashboard = ({ clickedActive }) => {
  const [selectedTopik, setSelectedTopik] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (clickedActive) {
      setSelectedTopik(clickedActive);
    }
  }, [clickedActive]);

  const handleGoNext = (item) => {
    history.push({
      pathname: '/dashboard-lain',
      state: item.title,
    });
    setSelectedTopik(item.title);
  };

  return (
    <>
      <Box>
        {TOPIC_DASHBOARD.map((item, id) => (
          <CardTopikDashboard onClick={handleGoNext} item={item} key={id} id={id} onActive={selectedTopik} />
        ))}
      </Box>
    </>
  );
};
