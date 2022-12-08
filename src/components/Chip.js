import React from 'react';
import styled from 'styled-components';
const ChipWrap = styled.span`
  display: flex;
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  height: 30px;
  width: 70px;
  align-items: center;
  align-content: center;
  justify-content: center;
  &.active {
    background-color: #15a55f1f;
    color: #15a55f;
  }
  &.inactive {
    background-color: #ff3e3e1f;
    color: #ff3e3e;
  }
`;

const Chip = (props) => {
  return <ChipWrap {...props}>{props.children}</ChipWrap>;
};

export default Chip;
