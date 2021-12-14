import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListBerita, beritaCmsListSelector } from '../BeritaBaru/reducer';

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
import { formatDate } from 'utils/helper';

const bem = bn('content-table');

const CMSBerita = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchQuery, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { totalPages, records } = useSelector(beritaCmsListSelector);
  const fetchData = (params) => {
    return dispatch(getListBerita(params));
  };

  useEffect(() => {
    fetchData({
      page: page,
      judul: searchQuery,
    });
  }, [page]);

  useEffect(() => {
    fetchData({
      page: 1,
      judul: searchQuery,
    });
  }, [searchQuery]);

  const setStatus = (status) => {
    switch (status) {
      case 0:
        return 'DRAFT';
      case 1:
        return 'MENUNGGU_PERSETUJUAN';
      case 2:
        return 'DISETUJUI';
      case 3:
        return 'DITOLAK';
      default:
        return '';
    }
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-4')}>Berita</div>
        <Row className="justify-content-between">
          <Col xs={2}>
            <Button variant="info" className="text-center" onClick={() => history.push('/cms/berita-baru')}>
              <Plus /> Buat Berita
            </Button>
          </Col>
          <Col xs={4}>
            <InputGroup>
              <Form.Control onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Cari Berita" />
              <Search />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <CMSTable
        customWidth={[45, 14, 12, 11, 11, 7]}
        header={['Judul Berita', 'Tanggal Publish', 'Status', 'Author', 'Editor']}
        data={records.map((item) => {
          let value = {
            data: [item.judul, formatDate(item.publishDate), setStatus(item.status), item.createBy, item.editorBy],
            action: '/cms/berita-detail/' + item.id,
            classValue: [null, null, setStatus(item.status).toLowerCase(), null, null],
          };
          return value;
        })}
        pagination={{ page: page, totalPages: totalPages }}
        handlePageChange={setPage}
      />
    </div>
  );
};

export default CMSBerita;
