import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { useHistory } from 'react-router-dom';

import { LogStatus } from 'components/Sidebars/LogStatus';
import { CMSForm } from 'components';
import bn from 'utils/bemNames';

const bem = bn('content-detail');

const CMSBeritaDetail = props => {
  const idBerita = props.match.params.id;
  // const history = useHistory();
  const dataLog = [
    {
      date: "12 Desember 2021",
      status: "Selesai",
      content: "Dataset sudah dapat di akses di portal data.go.id"
    },
    {
      date: "10 Desember 2021",
      status: "Diproses",
      content: "Dataset sudah dapat di akses di portal data.go.id"
    },
    {
      date: "08 Desember 2021",
      status: "Terkirim",
      content: "Dataset sudah dapat di akses di portal data.go.id"
    },
    {
      date: "08 Desember 2021",
      status: "Dibuat",
      content: "Dataset sudah dapat di akses di portal data.go.id"
    },
  ]

  return (
    <Row className={bem.e('section')}>
      <Col sm={8}>
        <div>
          <div className="d-flex justify-content-between mb-4">
            <div className={bem.e('title')}>
              Edit Detail {idBerita}
            </div>
            <div>
              Saved 1 minutes ago Draft
              <Button className="ml-24" variant="secondary" style={{width: "112px"}}>Preview</Button>
            </div>
          </div>
          <CMSForm data={[]} />
        </div>
      </Col>
      <Col sm={3}>
        <LogStatus data={dataLog} />
      </Col>
    </Row>
  );
};

export default CMSBeritaDetail;
