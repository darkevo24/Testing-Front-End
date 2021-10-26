import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ReactComponent as DropDownArrawSvg } from 'assets/drop-down-arraw.svg';

const menuItem = [
  'Industri',
  'Perdagangan',
  'Pertanian',
  'Perkebunan',
  'Peternakan',
  'Perikanan',
  'BUMN',
  'Investasi',
  'Koperasi',
  'Usaha Kecil dan Menengah',
  'Pariwisata',
];
export const TopicDetail = () => {
  return (
    <Container>
      <Row>
        <Col xs={4}>
          <div style={{ display: 'flex' }}>
            <div className={'drop-down-icon-wrapper'}>
              <DropDownArrawSvg />
            </div>
            <div className={'menu-title'}>Ekonomi dan Industri</div>
          </div>
          {menuItem.map((item) => (
            <div className={'menu-item'}>{item}</div>
          ))}
        </Col>
        <Col>Col 2</Col>
      </Row>
    </Container>
  );
};
