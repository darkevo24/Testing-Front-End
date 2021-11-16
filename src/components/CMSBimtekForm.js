import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { DatePicker, Input} from 'components';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ReactComponent as Plus } from 'assets/plus.svg';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('bimtek-form');

const BimtekTable = ({modal, headers, label}) => (
  <div className={bem.e('section')}>
    <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
      <div className={bem.e('header-title')}>{label}</div>
        {modal ? <div className={bem.e('header-add')}><Plus /> Tambah {label}</div> : null }
    </div>
    <Table className={bem.e('table')}>
      <thead>
        <tr>
          {headers.map((item) => (
            <th>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr><td className="text-center" colSpan={33}>Tidak ada data</td></tr>
      </tbody>
    </Table>
  </div>
);

const CMSBimtekForm = ({data, disabled = false, modalAction = false}) => {
  const schema = yup
    .object({
      name: yup.string().required()
    })
    .required();

  const {
    control,
  } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <div className="sdp-form">
      <Input
        group
        label="Nama Bimtek"
        name="name"
        control={control}
      />
      <Row className="align-items-end">
        <Col>
          <DatePicker
            disabled={disabled}
            group
            label="Tanggal Mulai Pelaksanaan Disetujui"
            name="publishedDate"
            control={control}
          />
        </Col>
        <Col>
          <Input
            disabled={disabled}
            group
            className="m-0"
            type="time"
            label=""
            name="publishedTime"
            control={control}
          />
        </Col>
      </Row>
      <Row className="align-items-end">
        <Col>
          <DatePicker
            disabled={disabled}
            group
            label="Tanggal Selesai Pelaksanaan Disetujui"
            name="publishedDate"
            control={control}
          />
        </Col>
        <Col>
          <Input
            disabled={disabled}
            group
            className="m-0"
            type="time"
            label=""
            name="publishedTime"
            control={control}
          />
        </Col>
      </Row>
      <Input
        disabled={disabled}
        group
        label="Tempat"
        name="place"
        control={control}
      />
      <BimtekTable
        modal={modalAction}
        label="Pembicara"
        headers={["Nama Pembicara", "Tanggal", "Sesi", ""]}
      />
      <BimtekTable
        modal={modalAction}
        label="Materi"
        headers={["Materi", "Lampiran", ""]}
      />
    </div>
  );
};

export default CMSBimtekForm;
