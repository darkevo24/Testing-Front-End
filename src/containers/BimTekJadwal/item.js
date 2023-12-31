import React, { useState } from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { ReactComponent as ChevronUp } from 'assets/chevron-up.svg';
import { ReactComponent as ChevronDown } from 'assets/chevron-down.svg';
import { ReactComponent as LocationTag } from 'assets/location-tag.svg';
import { ReactComponent as Download } from 'assets/download-red.svg';
import { apiUrls, get } from 'utils/request';

const CustomToggle = ({ children, eventKey, callback }) => {
  const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));
  return <div onClick={decoratedOnClick}>{children}</div>;
};

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

const Button = styled.div`
  background: #f5f6fa;
  border-radius: 4px;
  padding: 12px;
  display: inline-block;
  font-family: Myriad Pro;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0px;
  text-align: left;
  cursor: pointer;
`;

const nonSDI = 'Pengusulan Bimtek (K/L/D Sebagai Penyelenggara)';

const BimTekJadwalItem = ({
  title,
  startDate,
  endDate,
  city,
  location,
  speaker,
  id,
  materi,
  jenisPermintaan,
  namaInstansi,
}) => {
  const [collapse, setCollapse] = useState(false);
  const downloadMateri = async (file) => {
    try {
      await get(`${apiUrls.bimtekMateriDownload}/${file}`);
    } catch (e) {}
  };
  return (
    <Card className="bimtek-jadwal-card">
      <Accordion>
        <Row className="mb-3">
          <Col xs={9} className="bimtek-jadwal-title">
            {title}
          </Col>
          <Col className={collapse ? 'bimtek-collapse-btn show' : 'bimtek-collapse-btn'}>
            <CustomToggle eventKey="0" callback={() => setCollapse(!collapse)}>
              {collapse ? 'Sembunyikan Detail' : 'Lihat Detail'}
              <ChevronUp className="chevron-up ml-10" />
              <ChevronDown className="chevron-down ml-10" />
            </CustomToggle>
          </Col>
        </Row>
        <div>
          <div>
            <DateBox>{startDate}</DateBox> - <DateBox>{endDate}</DateBox>
          </div>
          <div className="mt-3">
            <LocationTag className="mr-10" /> {city}
          </div>
        </div>
        <Accordion.Collapse eventKey="0" className="mt-3">
          <div>
            <div className="mb-3">{location}</div>
            <div className="mb-3">
              <div className="bimtek-jadwal-title">Penyelenggara</div>
              <div className="mt-2">{jenisPermintaan === nonSDI ? namaInstansi : 'Sekretariat SDI'}</div>
            </div>
            <div className="mb-3">
              <div className="bimtek-jadwal-title">Pembicara</div>
              <div>
                <ol type="1" className="bimtek-jadwal-title-ol">
                  {speaker?.map((item, key) => (
                    <li key={key}>{item.nama}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div>
              <div className="bimtek-jadwal-title">Materi</div>
              <div>
                <ol type="1" className="bimtek-jadwal-title-ol">
                  {materi?.map((item, key) => (
                    <li key={key}>{item.nama}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="text-end mt-2">
              <Button onClick={() => downloadMateri(id)}>
                <Download className="mr-10" /> Download Materi
              </Button>
            </div>
          </div>
        </Accordion.Collapse>
      </Accordion>
    </Card>
  );
};

export default BimTekJadwalItem;
