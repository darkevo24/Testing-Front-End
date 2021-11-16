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
      "id": 1,
      "name": "Portal SDI",
      "dateStart": "01-11-2021",
      "dateEnd": "04-11-2021",
      "place": "Online",
      "speaker": "Online",
      "subjects": "Teknologi ; Ekonomi ; Geologi",
      "status": "Approved"
    },
    {
      "id": 2,
      "name": "Portal SDI",
      "dateStart": "28-11-2021",
      "dateEnd": "30-11-2021",
      "place": "Online",
      "speaker": "Online",
      "subjects": "Teknologi ; Ekonomi ; Geologi",
      "status": "Approved"
    },
    {
      "id": 3,
      "name": "Portal SDI",
      "dateStart": "15-12-2021",
      "dateEnd": "16-12-2021",
      "place": "Online",
      "speaker": "Online",
      "subjects": "Teknologi ; Ekonomi ; Geologi",
      "status": "Approved"
    },
  ];

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-4')}>Jadwal Bimbingan Teknis</div>
        <Row className="justify-content-between">
          <Col xs={2}>
            <Button
              variant="info"
              className="text-center"
              onClick={() => history.push('/cms/bimtek-jadwal/baru')}>
              <Plus /> Buat Jadwal
            </Button>
          </Col>
          <Col xs={4}>
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
        customWidth={[ 13, 10, 12, 10, 10, 15, 8, 7]}
        header={[
          'Nama Bimbingan',
          'Tanggal Mulai',
          'Tanggal Berakhir',
          'Tempat',
          'Pembicara',
          'Materi',
          'Status'
        ]}
        data={dataBimtek.map((item) => {
          let value = {
      			data: [item.name, item.dateStart, item.dateEnd, item.place, item.speaker, item.subjects, item.status],
      			action: "/cms/bimtek-jadwal/"+item.id
      		}
      		return value
        })}
      />
    </div>
  );
};

export default CMSBimtekPermintaan;
