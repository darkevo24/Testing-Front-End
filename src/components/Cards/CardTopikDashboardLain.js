import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Box = styled.div`
  margin: 5px;
  display: flex;
  padding: 10px;
  width: 220px;
  background: #f5f6fa;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #f5f6fa;
    border-radius: 4px;
  }
`;
const Active = styled.div`
  margin: 5px;
  display: flex;
  padding: 10px;
  width: 220px;
  background: #fff;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #e1e2ea;
`;

const Icon = styled.div``;

const Title = styled.p`
  color: #515154;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
  align-items: center;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  display: flex;
`;

const CardTopikDashboardLain = ({ item, onClick, id, onActive }) => {
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

export default CardTopikDashboardLain;
