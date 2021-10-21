import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  background: #ffffff;
  border-radius: 4px;
`;

const Divider = styled.div`
  width: calc(100% + 32px);
  height: 1px;
  background: #e1e2ea;
  margin: 20px -16px 12px;
`;

const FlexBox = styled.div`
  display: flex;
`;

const FlexBoxContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftBox = styled.div`
  margin-right: auto;
  h6 {
    font-size: 13px;
    line-height: 13px;
    margin: 0;
    color: #2d2627;
  }
`;

const RightBox = styled.div`
  margin: 0 5px;
  font-size: 13px;
  line-height: 13px;
  color: #2d2627;
`;

const Button = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #007aff;
  width: 47px;
  height: 25px;
  background: rgba(0, 122, 255, 0.12);
  border-radius: 25px;
  padding: 6px 12px;
  margin: -1px 10px;
`;

export const CardWithDetail = ({ title, description, date, views, onClick }) => (
  <FlexBox
    onClick={onClick}
    style={{
      flexDirection: 'column',
      padding: '16px 16px 12px',
      background: '#FFFFFF',
      borderRadius: '8px',
      boxSizing: 'border-box',
      border: '1px solid #E1E2EA',
      width: '308px',
    }}>
    <Box
      style={{
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '19px',
        color: '#2D2627',
        margin: '5px 0',
        height: 37,
      }}>
      {title}
    </Box>
    <Box
      style={{
        color: '#515154',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '20px',
        margin: '10px 0px 0',
      }}>
      <Box>{description}</Box>
      <Box>{date}</Box>
    </Box>
    <Divider />
    <FlexBoxContent>
      <LeftBox style={{ display: 'flex', alignItems: 'center' }}>
        <h6>1 File</h6>
        <Button>PDF</Button>
      </LeftBox>
      <RightBox>{views} Views</RightBox>
    </FlexBoxContent>
  </FlexBox>
);
