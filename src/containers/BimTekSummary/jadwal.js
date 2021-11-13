import React from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { ReactComponent as LocationTag } from 'assets/location-tag.svg';

const BimtekSumJadwal = ({ title, startDate, endDate, city }) => {
  const DateBox = styled.div`
    background: #f5f6fa;
    border-radius: 4px;
    padding: 8px 12px;
    display: inline-block;
    font-family: Myriad Pro;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0px;
    text-align: left;
  `;

  return (
    <Card className="bimtek-jadwal-card">
      <div className="bimtek-jadwal-title">{title}</div>
      <div>
        <div>
          <DateBox>{startDate}</DateBox> - <DateBox>{endDate}</DateBox>
        </div>
        <div className="mt-3">
          <LocationTag className="mr-10" /> {city}
        </div>
      </div>
    </Card>
  );
};

export default BimtekSumJadwal;
