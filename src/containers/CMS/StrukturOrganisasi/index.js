import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'components/Icons';
import { CMSTable } from 'components';

import { ReactComponent as Plus } from 'assets/plus.svg';
import { useHistory } from 'react-router-dom';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-table');

const CMSStrukturOrganisasi = () => {
  const history = useHistory();

  const dataBerita = [
    {
      id: 1,
      kode: 'TB3',
      nama: 'Test Bidang 3',
      level: 3,
      status: 'DRAFT',
    },
    {
      id: 2,
      kode: 'TB2',
      nama: 'Test Bidang 2',
      level: 2,
      status: 'DRAFT',
    },
    {
      id: 3,
      kode: 'TB1',
      nama: 'Test Bidang 1',
      level: 1,
      status: 'DRAFT',
    },
  ];

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-4')}>Struktur Organisasi</div>
        <Row className="justify-content-between">
          <Col xs={2}>
            <Button variant="info" className="text-center" onClick={() => history.push('/cms/struktur-baru')}>
              <Plus /> Buat Bidang
            </Button>
          </Col>
          <Col xs={4}>
            <InputGroup>
              <Form.Control variant="normal" type="text" placeholder="Cari Bidang" />
              <Search />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <CMSTable
        customWidth={[20, 30, 20, 23, 7]}
        header={['Kode', 'Nama', 'Level', 'Status']}
        data={dataBerita.map((item) => {
          let value = {
            data: [item.kode, item.nama, item.level, item.status],
            action: '/cms/struktur-detail/' + item.id,
          };
          return value;
        })}
      />
    </div>
  );
};

export default CMSStrukturOrganisasi;
