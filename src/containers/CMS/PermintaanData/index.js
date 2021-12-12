import React, { useEffect, useMemo, useState } from 'react';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getPermintaanData, permintaanDataSelector } from './reducer';
import { Search } from '../../../components/Icons';
import { CMSTable } from '../../../components';
import bn from '../../../utils/bemNames';

const bem = bn('content-table');

const CMSPermintaanData = () => {
  const [instansiId, setIntansiId] = useState();
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const result = useSelector(permintaanDataSelector);
  const pageCount = Math.ceil(result?.totalPages);
  const fetchDataset = () => {
    let obj = {
      size: 10,
      page: page,
    };
    if (instansiId) obj['instansiId'] = Number(instansiId);
    if (query) obj['q'] = query;
    return dispatch(getPermintaanData(obj));
  };
  const data = useMemo(() => result?.records || [], [result]);
  useEffect(() => {
    fetchDataset();
  }, [instansiId, query, page]);

  const updateInstansi = (val) => {
    setIntansiId(val);
  };

  const updateQuery = _.debounce((val) => {
    setQuery(val);
  }, 1000);

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={bem.e('title')}>Permintaan Data</div>
        <Row className="justify-content-between">
          <Col xs={2}></Col>
          <Col xs={5} className="d-flex align-items-center">
            <div className="mr-10">Instansi</div>
            <div className="mr-10">
              <Form.Select aria-label="Default select example" onChange={(e) => updateInstansi(e.target.value)}>
                <option value="0">Kosong</option>
                <option value="1">Badan Pusat</option>
                <option value="2">Badan Pusat 2</option>
              </Form.Select>
            </div>
            <InputGroup>
              <Form.Control
                variant="normal"
                type="text"
                placeholder="Cari Permintaan Data"
                onChange={(e) => updateQuery(e.target.value)}
              />
              <Search />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <CMSTable
        customWidth={[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 7]}
        header={[
          'ID',
          'Nama Peminta',
          'Instansi',
          'Unit Kerja',
          'Deskripsi Data',
          'Target Waktu',
          'Produsen Data',
          'Jenis Data',
          'Tanggal Permintaan',
          'Status',
        ]}
        data={data.map((item) => {
          let value = {
            data: [
              item.id,
              item.user.name,
              item.instansi.nama,
              item.instansi.unitKerja[0],
              item.deskripsi,
              item.tanggalTarget,
              item.produsen,
              item.jenisData,
              item.tanggalPermintaan,
              item.status,
            ],
            action: '/cms/permintaan-data/' + item.id,
          };
          return value;
        })}
        pageCount={pageCount}
        onPageIndexChange={(event) => setPage(event.selected + 1)}
      />
    </div>
  );
};

export default CMSPermintaanData;
