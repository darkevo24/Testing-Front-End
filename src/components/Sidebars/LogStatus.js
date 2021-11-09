import React from 'react';
import styled from 'styled-components';

const LogStatusTitle = styled.div`
  font-family: Myriad Pro;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
`;

export const LogStatus = ({data}) => (
  <div>
    <LogStatusTitle>Log Status</LogStatusTitle>
    {!data ? "" : data.map((item) => (
      <div>{item.date}</div>
    ))}
  </div>
);
