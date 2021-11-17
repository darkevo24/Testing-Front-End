import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'components/Icons';
import { CMSTable } from 'components';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Plus } from 'assets/plus.svg';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-table');

const CMSBimtekPermintaan = () => {
  const history = useHistory();

  const dataBimtek = [
    {
      id: 1,
      name: 'Portal SDI',
      date: '01-11-2021',
      place: 'Online',
      speaker: 'Marilyn Lipshutz',
      subjects: 'Teknologi ; Ekonomi ; Geologi',
      status: 'Published',
    },
    {
      id: 2,
      name: 'Portal SDI',
      date: '02-11-2021',
      place: 'Online',
      speaker: 'Marilyn Lipshutz',
      subjects: 'Teknologi ; Ekonomi ; Geologi',
      status: 'Published',
    },
    {
      id: 3,
      name: 'Portal SDI',
      date: '03-11-2021',
      place: 'Online',
      speaker: 'Marilyn Lipshutz',
      subjects: 'Teknologi ; Ekonomi ; Geologi',
      status: 'Published',
    },
  ];

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-4')}>Dokumentasi Bimbingan Teknis</div>
        <Row className="justify-content-between">
          <Col xs={3}>
            <Button variant="info" className="text-center" onClick={() => history.push('/cms/bimtek-dokumentasi/baru')}>
              <Plus /> Buat Dokumentasi
            </Button>
          </Col>
          <Col xs={4}>
            <InputGroup>
              <Form.Control variant="normal" type="text" placeholder="Cari Bimbingan Teknis" />
              <Search />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <CMSTable
        customWidth={[20, 15, 9, 11, 16, 7, 7]}
        header={['Nama Bimbingan Teknis', 'Tanggal Pelaksanaan', 'Tempat', 'Pembicara', 'Materi', 'Status']}
        data={dataBimtek.map((item) => {
          let value = {
            data: [item.name, item.date, item.place, item.speaker, item.subjects, item.status],
            action: '/cms/bimtek-dokumentasi/' + item.id,
          };
          return value;
        })}
      />
    </div>
  );
};

export default CMSBimtekPermintaan;
