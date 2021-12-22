import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListBerita, beritaCmsListSelector, setPreviewBerita } from '../BeritaBaru/reducer';

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
import { STATUS_DATA_BERITA } from 'utils/constants';

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

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-3')}>Berita</div>
        <Row className="justify-content-between">
          <Col xs={2}>
            <Button
              variant="info"
              className="text-center"
              onClick={() => dispatch(setPreviewBerita({})).then(() => history.push('/cms/berita-baru'))}>
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
            data: [item.judul, formatDate(item.publishDate), STATUS_DATA_BERITA[item.status], item.createBy, item.editorBy],
            action: '/cms/berita-detail/' + item.id,
            classValue: [null, null, STATUS_DATA_BERITA[item.status].toLowerCase(), null, null],
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
