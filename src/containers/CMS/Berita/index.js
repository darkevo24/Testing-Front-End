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

const CMSBerita = () => {
  const history = useHistory();

  const dataBerita = [
    {
      "id": 1,
      "title": "Kemenhub Berbagi Pengalaman Penanganan Covid-19 Sektor Transportasi Di Forum ASEAN-Republik Korea ke-11",
      "datePublish": "28-11-2021",
      "status": "Published",
      "createBy": "Sigmund Freud"
    },
    {
      "id": 2,
      "title": "Kemenhub Berbagi Pengalaman Penanganan Covid-19 Sektor Transportasi Di Forum ASEAN-Republik Korea ke-12",
      "datePublish": "-",
      "status": "Draft",
      "createBy": "Sigmund Freud"
    }
  ];

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-4')}>Berita</div>
        <Row className="justify-content-between">
          <Col xs={2}>
            <Button
              variant="info"
              className="text-center"
              onClick={() => history.push('/admin/berita-baru')}>
              <Plus/> Buat Berita
            </Button>
          </Col>
          <Col xs={4}>
            <InputGroup>
              <Form.Control
                variant="normal"
                type="text"
                placeholder="Cari Berita"
              />
              <Search />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <CMSTable
        customWidth={[ 50, 12, 9, 11, 11, 7]}
        header={[
          'Judul Berita',
          'Tanggal Publish',
          'Status',
          'Author',
          'Editor'
        ]}
        data={dataBerita.map((item) => {
          let value = {
      			data: [item.title, item.datePublish, item.status, item.createBy, item.createBy],
      			action: "/admin/berita-detail/"+item.id
      		}
      		return value
        })}
      />
  </div>
  );
};

export default CMSBerita;
