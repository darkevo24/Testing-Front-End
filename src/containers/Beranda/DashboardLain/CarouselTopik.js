import React, { useEffect, useState } from 'react';
import { TOPIC_DASHBOARD } from './constants';
import CardTopikDashboardLain from 'components/Cards/CardTopikDashboardLain';
import { useHistory } from 'react-router-dom';

const CarouselTopik = ({ clickedActive }) => {
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
    <div style={{ display: 'flex', overflowX: 'auto', overflowY: 'hidden' }}>
      {TOPIC_DASHBOARD.map((topic, id) => (
        <CardTopikDashboardLain onClick={handleGoNext} item={topic} key={id} id={id} onActive={selectedTopik} />
      ))}
    </div>
  );
};

export default CarouselTopik;
