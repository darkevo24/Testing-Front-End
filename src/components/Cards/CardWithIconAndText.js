import Re7 from 'react';
import styled from 'styled-components';

const Box = styled.div`
  background: 'transparent';
  border-radius: 4px;
  cursor: pointer;
  //change on hover
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
      background: 'trasparent',
      padding: '5px',
      borderRadius: '4px',
      width: '237px',
      height: '61px',
      opacity: item.disabled ? 0.5 : 1,
      cursor: 'pointer',
    }}>
    <Box style={{ height: '16px', width: '16px', marginBottom: '5px' }}>{item.icon}</Box>
    <Box
      style={{
        color: '#515154',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '17px',
        margin: '10px 0px',
      }}>
      {item.title}
    </Box>
  </Box>
);
