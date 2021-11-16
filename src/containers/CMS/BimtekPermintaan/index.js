import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'components/Icons';
import { CMSTable } from 'components';

import bn from 'utils/bemNames';

const bem = bn('content-table');

const CMSBimtekPermintaan = () => {
  const dataBimtek = [
    {
      "id": 1,
      "name": "Portal SDI",
      "instance": "Bapenas",
      "dateRequest": "28-11-2021 08:33",
      "dateImplement": "28-11-2021 09:00",
      "status": "Approved"
    },
    {
      "id": 2,
      "name": "Portal SDI",
      "instance": "Bapenas",
      "dateRequest": "28-11-2021 09:33",
      "dateImplement": "28-11-2021 10:00",
      "status": "Approved"
    },
    {
      "id": 3,
      "name": "Portal SDI",
      "instance": "Bapenas",
      "dateRequest": "28-11-2021 10:33",
      "dateImplement": "28-11-2021 11:00",
      "status": "Approved"
    },
  ];

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={bem.e('title')}>Permintaan Bimbingan Teknis</div>
        <Row className="justify-content-between">
          <Col xs={2}>
          </Col>
          <Col xs={5} className="d-flex align-items-center">
            <div className="mr-10">Instansi</div>
            <div className="mr-10">
              <Form.Select aria-label="Default select example">
                <option value="1">Badan Pusat</option>
              </Form.Select>
            </div>
            <InputGroup>
              <Form.Control
                variant="normal"
                type="text"
                placeholder="Cari Bimbingan Teknis"
              />
              <Search />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <CMSTable
        customWidth={[ 18, 18, 18, 22, 18, 7]}
        header={[
          'Nama',
          'Instansi',
          'Tanggal Permintaan',
          'Tanggal Pelaksanaan Disetujui',
          'Status'
        ]}
        data={dataBimtek.map((item) => {
          let value = {
      			data: [item.name, item.instance, item.dateRequest, item.dateImplement, item.status],
      			action: "/cms/bimtek-permintaan/"+item.id
      		}
      		return value
        })}
      />
    </div>
  );
};

export default CMSBimtekPermintaan;
