import React, { useMemo } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { DatePicker, Input, Table } from 'components';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';

const CMSDaftarForm = () => {
  const schema = yup
    .object({
      instansi: yup.mixed().required(),
      nama: yup.string().required(),
      idkonsep: yup.number().required(),
      konsep: yup.string().required(),
      jadwalpemutakhiran: yup.mixed().required(),
      definisi: yup.string().required(),
      sumberdefinisi: yup.string().required(),
    })
    .required();
  const { control } = useForm({
    resolver: yupResolver(schema),
  });

  const columns = useMemo(
    () => [
      {
        Header: 'Nama Variabel',
        accessor: 'nama',
      },
      {
        Header: 'ID Konsep',
        accessor: 'idkonsep',
      },
      {
        Header: 'Konsep',
        accessor: 'konsep',
      },
      {
        Header: 'Definisi',
        accessor: 'definisi',
      },
      {
        Header: 'Pengaturan Akses',
        accessor: 'pengaturanakses',
      },
      {
        Header: 'Kode Referensi',
        accessor: 'kodereferensi',
      },
      {
        id: 'actions',
        actions: [
          {
            type: 'edit',
          },
          {
            type: 'cross',
          },
        ],
        Cell: Table.Actions,
      },
    ],
    [],
  );

  const data = [
    {
      nama: 'ID UMKM',
      idkonsep: 123,
      konsep: 'ID',
      definisi: `Contrary to popular belief, Lorem Ipsum is not simply random text.`,
      pengaturanakses: 'akses',
      kodereferensi: 'ref',
    },
    {
      nama: 'ID UMKM',
      idkonsep: 123,
      konsep: 'ID',
      definisi: `Contrary to popular belief,`,
      pengaturanakses: 'akses',
      kodereferensi: 'ref',
    },
  ];

  const tableConfig = {
    columns,
    data,
    variant: 'cms-outline',
    title: 'Data Variabel',
    showSearch: false,
  };

  const level = [1, 2, 3, 4, 5];
  return (
    <div className="mx-32 pb-42 pt-32">
      <Row>
        <Col>
          <label className="sdp-form-label py-8">Instansi</label>
          <SingleSelectDropdown data={level.map((lvl) => ({ value: lvl, label: lvl }))} isLoading={false} noValue={true} />
        </Col>
        <Col>
          <Input group label="Nama Data" name="nama" control={control} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input group label="ID Konsep" name="idkonsep" control={control} />
        </Col>
        <Col>
          <Input group label="Konsep" name="konsep" control={control} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs="6">
          <label className="sdp-form-label py-8">Jadwal Pemutakhiran</label>
          <SingleSelectDropdown data={level.map((lvl) => ({ value: lvl, label: lvl }))} isLoading={false} noValue={true} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input group label="Definisi" name="definisi" control={control} />
        </Col>
        <Col>
          <Input group label="Sumber Definisi" name="sumberdefinisi" control={control} />
        </Col>
      </Row>
      <Row>
        <Col>
          <DatePicker group label="Dibuat" control={control} name="dibuat" />
        </Col>
        <Col>
          <DatePicker group label="Diperbarui" control={control} name="diperbarui" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input group label="Produsen Data" name="produsendata" control={control} />
        </Col>
        <Col>
          <label className="sdp-form-label py-8">Data Induk</label>
          <SingleSelectDropdown data={level.map((lvl) => ({ value: lvl, label: lvl }))} isLoading={false} noValue={true} />
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="sdp-form-label py-8">Format</label>
          <SingleSelectDropdown data={level.map((lvl) => ({ value: lvl, label: lvl }))} isLoading={false} noValue={true} />
        </Col>
        <Col>
          <Input group label="Link Akses" name="linkakses" rightIcon="copy" control={control} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <label className="sdp-form-label py-8">Pilar SDGs</label>
          <SingleSelectDropdown
            data={level.map((lvl) => ({ value: lvl, label: lvl }))}
            placeHolder="-"
            isLoading={false}
            noValue={true}
          />
        </Col>
        <Col>
          <label className="sdp-form-label py-8">Tujuan SDGs</label>
          <SingleSelectDropdown
            data={level.map((lvl) => ({ value: lvl, label: lvl }))}
            placeHolder="-"
            isLoading={false}
            noValue={true}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="sdp-form-label py-8">PN RKP</label>
          <SingleSelectDropdown
            data={level.map((lvl) => ({ value: lvl, label: lvl }))}
            placeHolder="-"
            isLoading={false}
            noValue={true}
          />
        </Col>
        <Col>
          <label className="sdp-form-label py-8">PP RKP</label>
          <SingleSelectDropdown
            data={level.map((lvl) => ({ value: lvl, label: lvl }))}
            placeHolder="-"
            isLoading={false}
            noValue={true}
          />
        </Col>
      </Row>
      <Table {...tableConfig} />
      <Button variant="success">Tambah Variabel</Button>
    </div>
  );
};

export default CMSDaftarForm;
