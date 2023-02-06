import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import chunk from 'lodash/chunk';
import styled from 'styled-components';
import CardTopikDashboard from 'components/Cards/CardTopikDashboard';
import PertumbuhanEkonomi from 'assets/icons/Dashboard/PertumbuhanEkonomi.png';
import TingkatKemiskinan from 'assets/icons/Dashboard/TingkatKemiskinan.png';
import TingkatPengangguranTerbuka from 'assets/icons/Dashboard/TingkatPengangguranTerbuka.png';
import RasioGini from 'assets/icons/Dashboard/RasioGini.png';

const Box = styled.div`
  margin-top: 16px;
  display: inline-flex;
`;

const BoxFlex = styled.div`
  display: flex;
`;

const TOPIC_DASHBOARD = [
  { title: 'semua' },
  {
    title: 'Pertumbuhan Ekonomi',
    items: ['Ekonomi'],
    icon: <img style={{ width: '50px' }} src={PertumbuhanEkonomi} alt="Pertumbuhan Ekonomi" />,
  },
  {
    title: 'Tingkat Kemiskinan',
    items: ['Kemiskinan'],
    icon: <img style={{ width: '50px' }} src={TingkatKemiskinan} alt="Tingkat Kemiskinan" />,
  },
  {
    title: 'Tingkat Pengangguran Terbuka',
    items: ['Pengangguran'],
    icon: <img style={{ width: '50px' }} src={TingkatPengangguranTerbuka} alt="Tingkat Pengangguran Terbuka" />,
  },
  {
    title: 'Rasio Gini',
    items: ['Rasio Gini'],
    icon: <img style={{ width: '50px' }} src={RasioGini} alt="Rasio Gini" />,
  },
];

export const TopikDashboard = ({ clickedActive }) => {
  const [selectedTopik, setSelectedTopik] = useState('');
  const dashboardList = [...TOPIC_DASHBOARD];
  dashboardList.shift(); // Removing the first element (Semua Entry)
  const list = chunk(dashboardList, 5);
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
        {list.map((subList, index) => (
          <BoxFlex key={index}>
            {subList.map((item, itemIndex) => {
              const id = index + 'card' + itemIndex;
              return <CardTopikDashboard item={item} onClick={handleGoNext} key={id} id={id} onActive={selectedTopik} />;
            })}
          </BoxFlex>
        ))}
      </Box>
    </>
  );
};
