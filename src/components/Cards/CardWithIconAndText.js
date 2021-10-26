import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  background: #ffffff;
  border-radius: 4px;
  cursor: pointer;
`;

export const CardWithIconAndText = ({ icon, text, onClick }) => (
  <Box
    onClick={onClick}
    style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '5px',
      background: '#FFFFFF',
      borderRadius: '4px',
      width: '237px',
      height: '61px',
    }}>
    <Box style={{ height: '16px', width: '16px', marginBottom: '5px' }}>{icon}</Box>
    <Box
      style={{
        color: '#515154',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '17px',
        margin: '10px 0px',
      }}>
      {text}
    </Box>
  </Box>
);
