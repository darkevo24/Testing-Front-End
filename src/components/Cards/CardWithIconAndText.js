import styled from 'styled-components';
import { isSdiProduction } from 'utils/constants';

const Box = styled.div`
  background: 'transparent';
  border-radius: 4px;
  cursor: pointer;
  ${!isSdiProduction &&
  `align-items: center;
  width: 120px;
  text-align: center;
  margin: 0 2px;
  display: flex;
  flex-direction: column;`}
  ${isSdiProduction &&
  `&:hover {
    background: #f5f6fa;
    //svg icon color
    path {
      fill: #ed1c24;
    }
  }`}
`;

const Icon = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 10px;
  height: 60px;
  width: 110px;
  border: 1px solid #e1e2ea;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #f5f6fa;
    //svg icon color
    path {
      fill: #ed1c24;
    }
  }
`;

export const CardWithIconAndText = ({ item, onClick, id }) => (
  <Box
    key={id}
    onClick={() => onClick(item)}
    style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '5px',
      borderRadius: '4px',
      cursor: 'pointer',
      opacity: item.disabled ? 0.5 : 1,
      ...(isSdiProduction
        ? {
            background: 'trasparent',
            width: '237px',
            height: '61px',
          }
        : []),
    }}>
    {isSdiProduction ? (
      <Box style={{ height: '16px', width: '16px', marginBottom: '5px' }}>{item.icon}</Box>
    ) : (
      <Icon>{item.icon}</Icon>
    )}
    <Box
      style={{
        color: '#515154',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '17px',
        margin: '10px 0px',
        width: isSdiProduction ? 'auto' : '110px',
      }}>
      {item.title}
    </Box>
  </Box>
);
