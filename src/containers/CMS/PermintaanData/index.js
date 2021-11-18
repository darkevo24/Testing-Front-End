import React, { useEffect, useMemo } from 'react';
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
  const dispatch = useDispatch();
  const result = useSelector(permintaanDataSelector);
  const fetchDataset = () => {
    return dispatch(getPermintaanData());
  };
  const data = useMemo(() => result?.results || [], [result]);
  useEffect(() => {
    fetchDataset();
  }, []);

  // const dataPermintaan = [
  //   {
  //     id: 'PD000123',
  //     namaPeminta: 'Ibrahim Hanifa',
  //     instansi: 'Bapenas',
  //     unitKerja: 'SDI',
  //     deskripsi: 'Data Penduduk DKI',
  //     tanggalPermintaan: '28-11-2021 08:33',
  //     targetWaktu: '28-11-2021 09:00',
  //     produsen: 'Kementerian Dalam Negeri',
  //     jenisData: 'Statistik',
  //     status: 'Approved',
  //   },
  // ];

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={bem.e('title')}>Permintaan Data</div>
        <Row className="justify-content-between">
          <Col xs={2}></Col>
          <Col xs={5} className="d-flex align-items-center">
            <div className="mr-10">Instansi</div>
            <div className="mr-10">
              <Form.Select aria-label="Default select example">
                <option value="1">Badan Pusat</option>
              </Form.Select>
            </div>
            <InputGroup>
              <Form.Control variant="normal" type="text" placeholder="Cari Permintaan Data" />
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
              item.namaPeminta,
              item.instansi,
              item.unitKerja,
              item.deskripsi,
              item.targetWaktu,
              item.produsen,
              item.jenisData,
              item.tanggalPermintaan,
              item.status,
            ],
            action: '/cms/permintaan-data/' + item.id,
          };
          return value;
        })}
      />
    </div>
  );
};

export default CMSPermintaanData;
