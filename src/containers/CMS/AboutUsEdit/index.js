import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { useHistory } from 'react-router-dom';

import { LogStatus } from 'components/Sidebars/LogStatus';
import { Input, TextEditor } from 'components';
import bn from 'utils/bemNames';
import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';

import { useSelector, useDispatch } from 'react-redux';
import { getAboutUs, getAboutUsLogs } from './reducer';

const bem = bn('content-detail');

const schema = yup
  .object({
    title: yup.string().required(),
    category: yup.mixed().required(),
    thumbnail: yup.mixed().required(),
  })
  .required();

const CMSAboutUsEdit = (props) => {
  let dispatch = useDispatch();
  let id = props.match.params.id;
  let data = useSelector((state) => state.cms.aboutUsDetail);
  let monthList = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  let dataLog = useSelector((state) =>
    state.cms.aboutUsDetail.logs.records.map((item) => {
      return {
        date: [item.action_at.getDate(), monthList[item.action_at.getMonth()], item.action_at.getFullYear()].join(' '),
        status: item.status,
        content: item.action,
      };
    }),
  );
  useEffect(() => (id ? dispatch(getAboutUs(id)) : null), []);
  useEffect(() => (id ? dispatch(getAboutUsLogs(id)) : null), []);
  console.log(data);
  // const history = useHistory();
  // const dataLog = [
  //   {
  //     date: '12 Desember 2021',
  //     status: 'Selesai',
  //     content: 'Dataset sudah dapat di akses di portal data.go.id',
  //   },
  //   {
  //     date: '10 Desember 2021',
  //     status: 'Diproses',
  //     content: 'Dataset sudah dapat di akses di portal data.go.id',
  //   },
  //   {
  //     date: '08 Desember 2021',
  //     status: 'Terkirim',
  //     content: 'Dataset sudah dapat di akses di portal data.go.id',
  //   },
  //   {
  //     date: '08 Desember 2021',
  //     status: 'Dibuat',
  //     content: 'Dataset sudah dapat di akses di portal data.go.id',
  //   },
  // ];

  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Row className={bem.e('section')}>
      <Col sm={8}>
        <div>
          <div className="d-flex justify-content-between mb-4">
            <div className={bem.e('title')}>About Us</div>
            <div>
              <Button variant="secondary">
                <DeleteIcon />
              </Button>
              <Button className="ml-10" variant="secondary" style={{ width: '112px' }}>
                Simpan
              </Button>
              <Button className="ml-10" variant="info" style={{ width: '112px' }}>
                Kirim
              </Button>
            </div>
          </div>
          <Form>
            <Input
              group
              label="Link Video"
              name="link_video"
              control={control}
              rules={{ required: true }}
              error={errors.title?.message}
            />
            <Input
              group
              label="Judul"
              name="title"
              control={control}
              rules={{ required: true }}
              error={errors.title?.message}
            />
            <Form.Group controlId="content">
              <Form.Label>Isi</Form.Label>
              <TextEditor />
            </Form.Group>
          </Form>
        </div>
      </Col>
      <Col sm={3}>
        <LogStatus data={dataLog} />
      </Col>
    </Row>
  );
};

export default CMSAboutUsEdit;
