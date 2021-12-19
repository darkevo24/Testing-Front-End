import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'components/Icons';
import { CMSTable } from 'components';
import { getStrukturOrganisasi, strukturDatasetSelector } from './reducer';

import { ReactComponent as Plus } from 'assets/plus.svg';
import { useHistory } from 'react-router-dom';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-table');

const CMSStrukturOrganisasi = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, page, records } = useSelector(strukturDatasetSelector);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = (params) => {
    return dispatch(getStrukturOrganisasi(params));
  };

  useEffect(() => {
    fetchData({
      page: page,
      q: searchQuery,
    });
  }, [searchQuery]);

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-3')}>Struktur Organisasi</div>
        <Row className="justify-content-between">
          <Col xs={2}>
            <Button variant="info" className="text-center" onClick={() => history.push('/cms/struktur-baru')}>
              <Plus /> Buat Bidang
            </Button>
          </Col>
          <Col xs={4}>
            <InputGroup>
              <Form.Control
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="normal"
                type="text"
                placeholder="Cari Bidang"
              />
              <Search />
            </InputGroup>
          </Col>
        </Row>
      </div>
      {!loading ? (
        <CMSTable
          customWidth={[20, 30, 20, 23, 7]}
          header={['Kode', 'Nama', 'Level', 'Status']}
          data={records.map((item) => {
            let value = {
              data: [item.kode, item.nama, item.level, item.status],
              action: '/cms/struktur-detail/' + item.id,
              classValue: [null, null, null, item.status.toLowerCase()],
            };
            return value;
          })}
        />
      ) : null}
    </div>
  );
};

export default CMSStrukturOrganisasi;
