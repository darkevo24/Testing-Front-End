import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';
import { LogStatus } from 'components/Sidebars/LogStatus';
import bn from 'utils/bemNames';
import { DatePicker, Input, Modal, Table, TextEditor, Notification } from 'components';
import { bimtekJadwalDetailSelector, bimtekLogAktifitas, getListLogAktifitas, getJadwalBimtekDetail } from './reducer';

const bem = bn('content-detail');

const CMSJadwalDetail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { records } = useSelector(bimtekJadwalDetailSelector);
  const { dataLog } = useSelector(bimtekLogAktifitas);

  useEffect(() => {
    dispatch(getJadwalBimtekDetail(id));
    dispatch(getListLogAktifitas(id));
  }, []);

  const schema = yup
    .object({
      // name: yup.string().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  return (
    <Row className={bem.e('section')}>
      <Col sm={9}>
        <div>
          <div className="d-flex justify-content-between mb-4">
            <div className={bem.e('title')}>Jadwal Bimbingan Teknis</div>
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
          <Input readOnly group label="Nama Lengkap" name="requestor.nama" control={control} />
          <Input readOnly group label="Dinas Instansi" name="requestor.instansiName" control={control} />
          <Input readOnly group label="No. Handphoen" name="requestor.noHp" control={control} />
          <Input readOnly group label="Kota Pelaksana" name="kota" control={control} />
          <Input readOnly group label="Provinsi/Kab/Kota" name="requestor.provinsiName" control={control} />
          <Input readOnly group label="Jabatan / Peran Daftar" name="requestor.roles" control={control} />
          <Input readOnly group label="Email" name="requestor.email" control={control} />
          <Input readOnly group label="Ekspektasi Jumlah Peserta" name="ekspektasiJumlahPeserta" control={control} />
          <Input readOnly group label="Tagging Materi" name="tagMateri" control={control} />
          <Input
            group
            label="Nama Bimbingan Teknis"
            name="namaBimbinganTeknis"
            control={control}
            error={errors.namaBimbinganTeknis?.message}
          />
          <Input
            group
            label="Tempat"
            name="tempatBimbinganTeknis"
            control={control}
            error={errors.tempatBimbinganTeknis?.message}
          />
          <Row className="align-items-end">
            <Col>
              <DatePicker
                group
                label="Tanggal Mulai Pelaksanaan Disetujui"
                name="tanggalMulaiDisetujuiUpdate"
                control={control}
                rules={{ required: false }}
                error={errors.tanggalMulaiDisetujuiUpdate?.message}
              />
            </Col>
            <Col>
              <Input
                group
                className="m-0"
                type="time"
                label=""
                name="jamMulaiDisetujuiUpdate"
                control={control}
                rules={{ required: false }}
                error={errors.jamMulaiDisetujuiUpdate?.message}
              />
            </Col>
          </Row>
          <Row className="align-items-end">
            <Col>
              <DatePicker
                group
                label="Tanggal Selesai Pelaksanaan Disetujui"
                name="tanggalSelesaiDisetujuiUpdate"
                control={control}
                rules={{ required: false }}
                error={errors.tanggalSelesaiDisetujuiUpdate?.message}
              />
            </Col>
            <Col>
              <Input
                group
                className="m-0"
                type="time"
                label=""
                name="jamSelesaiDisetujuiUpdate"
                control={control}
                rules={{ required: false }}
                error={errors.jamSelesaiDisetujuiUpdate?.message}
              />
            </Col>
          </Row>
        </div>
      </Col>
      <Col sm={3}>
        <LogStatus data={dataLog} />
      </Col>
    </Row>
  );
};

export default CMSJadwalDetail;
