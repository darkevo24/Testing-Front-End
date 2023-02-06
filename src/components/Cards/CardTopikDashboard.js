import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Box = styled.div`
  margin: 0 5px;
  display: flex;
  padding: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 110px;
  background: 'transparent';
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #f5f6fa;
    border-radius: 4px;
  }
`;
const Active = styled.div`
  display: flex;
  padding: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 110px;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  background: #f5f6fa;
  border: 1.5px solid #ed1c24;
`;

const Icon = styled.div`
  margin-bottom: 5px;
`;

const Title = styled.p`
  color: #515154;
  font-size: 11px;
  text-align: center;
  width: 120px;
`;

const CardTopikDashboard = ({ item, onClick, id, onActive }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (onActive === item.title) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [onActive]);

  return (
    <>
      {active ? (
        <Active>
          <Icon>{item.icon}</Icon>
          <Title>{item.title}</Title>
        </Active>
      ) : (
        <Box key={id} onClick={() => onClick(item)}>
          <Icon>{item.icon}</Icon>
          <Title>{item.title}</Title>
        </Box>
      )}
    </>
  );
};

export default CardTopikDashboard;
