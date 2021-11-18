import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import CMSStrukturForm from './Form.js';

import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';
import { LogStatus } from 'components/Sidebars/LogStatus';
import bn from 'utils/bemNames';

const bem = bn('content-detail');

const CMSStrukturDetail = (props) => {
  // const id = props.match.params.id;
  const history = useHistory();
  const dataLog = [
    {
      date: '12 Desember 2021',
      status: 'Selesai',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '10 Desember 2021',
      status: 'Diproses',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '08 Desember 2021',
      status: 'Terkirim',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '08 Desember 2021',
      status: 'Dibuat',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
  ];
  const dataDummy = {
    'kode': 'XXX',
    nama: 'Coba',
    level: 1,
    status: 'Waiting Approval'
  }

  return (
    <Row className={bem.e('section')}>
      <Col sm={9}>
        <div>
          <div className="d-flex justify-content-between mb-4">
            <div className={bem.e('title')}>Bidang Detail</div>
            <div>
              <Button variant="secondary"><DeleteIcon /></Button>
              <Button onClick={() => history.goBack()}  className="ml-10 bg-white sdp-text-grey-dark border-gray-stroke" variant="secondary" style={{ width: '112px' }}>Batal</Button>
              <Button className="ml-10" variant="info" style={{ width: '112px' }}>Simpan</Button>
            </div>
          </div>
          <CMSStrukturForm data={dataDummy} />
        </div>
      </Col>
      <Col sm={3}>
        <LogStatus data={dataLog} />
      </Col>
    </Row>
  );
};

export default CMSStrukturDetail;
