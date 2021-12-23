import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import { DatePicker, Input, Modal, Table } from 'components';
import { bimtekListSelector, getDokumentasiList } from './reducer';
import { bimtekJadwalDetailSelector, getJadwalBimtekDetail } from 'containers/CMS/BimtekJadwal/reducer';

import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSJadwalBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [BimtekId, setBimtekId] = useState(0);

  const { records } = useSelector(bimtekListSelector);
  const DetailBimtek = useSelector(bimtekJadwalDetailSelector);

  const fetchDokumentasiList = () => {
    return dispatch(getDokumentasiList());
  };

  const dataListBimtek = useMemo(() => records || {}, [records]);
  const dataDetailBimtek = useMemo(() => DetailBimtek || {}, [DetailBimtek]);
  const materiBimtek = useMemo(() => DetailBimtek.records.materi || [], [DetailBimtek]);
  const pembicaraBimtek = useMemo(() => DetailBimtek.records.pembicara || [], [DetailBimtek]);
  console.log(materiBimtek);
  console.log(dataDetailBimtek);

  useEffect(() => {
    fetchDokumentasiList();
  }, []);

  useEffect(() => {
    return dispatch(getJadwalBimtekDetail(BimtekId));
  }, [BimtekId]);

  useEffect(() => {
    reset(dataDetailBimtek.records);
  }, [dataDetailBimtek]);

  const schema = yup
    .object({
      // name: yup.string().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...dataDetailBimtek,
    },
  });

  const onProses = (data) => {
    console.log(data);
  };

  const columnsMateri = [
    {
      Header: 'Materi',
      accessor: 'nama',
    },
    {
      Header: 'Lampiran',
      accessor: 'fileType',
    },
  ];

  const columnsPembicara = [
    {
      Header: 'Nama Pembicara',
      accessor: 'nama',
    },
    {
      Header: 'Tanggal',
      accessor: 'tanggalMulai',
    },
    {
      Header: 'Sesi',
      accessor: 'sesi',
    },
  ];

  const tableConfigMateri = {
    className: 'cms-bimtek-permintaan',
    columns: columnsMateri,
    data: materiBimtek,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };

  const tableConfigPembicara = {
    className: 'cms-bimtek-permintaan',
    columns: columnsPembicara,
    data: pembicaraBimtek,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };

  return (
    <div className={bem.e('section cms-bimtek-permintaan-detail')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          Dokumentasi Bimbingan Teknis Baru
          <Button onClick={() => history.goBack()} className="ml-24" variant="secondary" style={{ width: '112px' }}>
            Batal
          </Button>
          <Button className="ml-10" variant="info" style={{ width: '112px' }}>
            Simpan
          </Button>
        </div>
        <div>Saved 1 minutes ago Draft</div>
      </div>
      <div className={bem.e('body')}>
        <Form className="sdp-form" onSubmit={handleSubmit(onProses)}>
          <Form.Group className="mb-15">
            <Form.Label>Nama Bimtek</Form.Label>
            {dataListBimtek && (
              <Form.Select onChange={(e) => setBimtekId(e.target.value)}>
                <option value="0"> PILIH BIMTEK </option>
                {dataListBimtek.map((data, index) => {
                  return (
                    <option value={data.id} key={index}>
                      {data.namaBimtek}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Form.Group>
          <Row className="align-items-end">
            <Col>
              <DatePicker
                group
                readOnly
                label="Tanggal Mulai Pelaksanaan Disetujui"
                // name="tanggalMulaiDisetujui"
                control={control}
                rules={{ required: false }}
                error={errors.publishedDate?.message}
              />
            </Col>
            <Col>
              <Input
                group
                readOnly
                className="m-0"
                type="time"
                label=""
                name=""
                control={control}
                rules={{ required: false }}
                error={errors.publishedTime?.message}
              />
            </Col>
          </Row>
          <Row className="align-items-end">
            <Col>
              <DatePicker
                group
                readOnly
                label="Tanggal Selesai Pelaksanaan Disetujui"
                name=""
                control={control}
                rules={{ required: false }}
                error={errors.publishedDate?.message}
              />
            </Col>
            <Col>
              <Input
                group
                readOnly
                className="m-0"
                type="time"
                label=""
                name=""
                control={control}
                rules={{ required: false }}
                error={errors.publishedTime?.message}
              />
            </Col>
          </Row>
          <Input
            group
            readOnly
            className="m-0"
            type="text"
            label=""
            name="tempat"
            control={control}
            rules={{ required: false }}
            error={errors.publishedTime?.message}
          />
          <Table {...tableConfigPembicara} />
          <Table {...tableConfigMateri} />
        </Form>
      </div>
    </div>
  );
};

export default CMSJadwalBaru;
