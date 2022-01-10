import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { remove } from 'lodash';
import * as yup from 'yup';
import isFunction from 'lodash/isFunction';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { DatePicker, Input, Table, Notification } from 'components';
import SingleSelectDropDown from 'components/DropDown/SingleSelectDropDown';
import { apiUrls, post } from 'utils/request';
import { CMSModal } from 'components/CMSStatusModals';
import { ModalCreateMateri, ModalCreatePembicara } from './Modals';
import { bimtekJadwalTags, bimtekListKabupaten, getListBimtekTags, getListBimtekKabupaten } from './reducer';
import { ReactComponent as Plus } from 'assets/plus.svg';

import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSJadwalBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState('');
  const [idPembicara, setIdPembicara] = useState('');
  const [idMateri, setIdMateri] = useState(false);
  const [listMateri, setListMateri] = useState([]);
  const [namaMateri, setNamaMateri] = useState('');
  const [dataMateri, setDataMateri] = useState([]);
  const [dataPembicara, setDataPembicara] = useState([]);
  const [dataEditPembicara, setDataEditPembicara] = useState('');
  const { tagsResult, tagsLoading } = useSelector(bimtekJadwalTags);
  const { listKabupaten } = useSelector(bimtekListKabupaten);

  const tagsResultList = (tagsResult || []).map((tag) => ({ value: tag, label: tag }));
  const tagsResultKabupaten = (listKabupaten || []).map((tag) => ({ value: tag.id, label: tag.nama }));
  const goBack = () => {
    history.push('/cms/bimtek-jadwal');
  };

  useEffect(() => {
    initialCall();
  }, []);

  const initialCall = () => {
    dispatch(getListBimtekTags());
    dispatch(getListBimtekKabupaten());
  };

  const schemaCreate = yup
    .object({
      namaBimtek: yup.string().required(),
      tags: yup.array().required().min(1),
      namaKota: yup.object().required(),
      tanggalMulaiDisetujui: yup.string().required(),
      jamMulaiDisetujui: yup.string().required(),
      tanggalSelesaiDisetujui: yup.string().required(),
      jamSelesaiDisetujui: yup.string().required(),
      dataTempat: yup.string().required(),
    })
    .required();

  const {
    control: controlCreate,
    formState: { errors: errorsCreate },
    handleSubmit: handleSubmitCreate,
  } = useForm({
    resolver: yupResolver(schemaCreate),
    defaultValues: {
      namaMateri: '',
      tambahPembicara: '',
      tambahPembicaraWaktuMulai: '',
      tambahPembicaraJamMulai: '',
      tambahPembicaraWaktuSelesai: '',
      tambahPembicaraJamSelesai: '',
      tambahPembicaraUpdate: '',
      tambahPembicaraWaktuMulaiUpdate: '',
      tambahPembicaraWaktuSelesaiUpdate: '',
      tambahPembicaraJamMulaiUpdate: '',
      tambahPembicaraJamSelesaiUpdate: '',
    },
  });

  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };

  const handleAPICall = async (method, url, params, callBack) => {
    try {
      await method(url, {}, params);
      handleCloseModal();
      handleNotification('secondary', 'Berhasil Menyimpan Jadwal', 'check');
      isFunction(callBack) && callBack();
    } catch (e) {
      handleNotification('secondary', `Error, ${e.message}`, 'cross');
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal('');
    setListMateri([]);
  };

  const onModalEditMateri = (data) => {
    setIdMateri(data.id);
    setNamaMateri(data.nama);
    setListMateri([data]);
    setShowModal('editMateri');
  };

  const onDeleteMateri = (data) => {
    let newData = remove(dataMateri, (x) => {
      return x.id !== data;
    });
    setDataMateri(newData);
  };

  const onModalEditPembicara = (data) => {
    setIdPembicara(data.id);
    setDataEditPembicara(data);
    setShowModal('editPembicara');
  };

  const onDeletePembicara = (data) => {
    let newData = remove(dataPembicara, (x) => {
      return x.id !== data;
    });
    setDataPembicara(newData);
    return handleNotification('secondary', 'Berhasil Menghapus Pembicara', 'check');
  };

  const handleProses = () => {
    setShowModal('proses');
  };

  const onProses = (data) => {
    if (dataPembicara.length < 1) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal, Pembicara Harus Diisi', 'cross');
    }
    if (!data.namaKota.value) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal, Kota Pelaksana Harus Diisi', 'cross');
    }
    let listPembicara = dataPembicara;
    listPembicara.forEach((x) => {
      delete x['id'];
      return x;
    });
    let listMateri = dataMateri;
    listMateri.forEach((x) => {
      delete x['id'];
      return x;
    });
    let tanggalMulaiDisetujui = `${moment(data.tanggalMulaiDisetujui).format('YYYY-MM-DD')} ${data.jamMulaiDisetujui}:00`,
      tanggalSelesaiDisetujui = `${moment(data.tanggalSelesaiDisetujui).format('YYYY-MM-DD')} ${
        data.jamSelesaiDisetujui
      }:00`;
    if (!moment(tanggalSelesaiDisetujui).isAfter(tanggalMulaiDisetujui)) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal, Rentang Waktu Tidak Valid', 'cross');
    }
    let obj = {
      namaBimtek: data.namaBimtek,
      tagMateri: data.tags.map((elem) => elem.label) || [],
      tanggalMulaiDisetujui,
      tanggalSelesaiDisetujui,
      kota: data.namaKota.value,
      alamat: data.dataTempat,
      pembicara: listPembicara,
      materi: listMateri,
      dokumentasi: [
        {
          isiDokumentasi: 'test',
          urlVidio: 'testurlvidio',
          images: [
            {
              fileName: 'test',
              location: 'test',
              fileType: 'pdf',
              size: 10,
            },
          ],
        },
      ],
    };
    handleAPICall(post, `${apiUrls.cmsBimtekJadwal}`, { data: obj }, goBack);
  };

  const columnsPembicara = [
    {
      Header: 'Nama Pembicara',
      accessor: 'nama',
    },
    {
      Header: 'Tanggal',
      accessor: 'tanggalMulai',
      Cell: ({ row: { original } }) => (
        <div className="d-flex">
          <span className="pr-5">
            {original?.tanggalMulai ? moment(original?.tanggalMulai).format('DD MMMM YYYY') + ' ' : '---'}
            {original?.tanggalMulai ? moment(original?.tanggalMulai).format('HH:mm') : '---'}
          </span>
          <span>-</span>
          <span className="pl-5">
            {original?.tanggalSelesai ? moment(original?.tanggalSelesai).format('DD MMMM YYYY') + ' ' : '---'}
            {original?.tanggalSelesai ? moment(original?.tanggalSelesai).format('HH:mm') : '---'}
          </span>
        </div>
      ),
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ row: { original } }) => (
        <div>
          <Button
            variant="outline-none"
            className="bg-white sdp-text-blue p-0 mr-10"
            onClick={() => onModalEditPembicara(original)}>
            Edit
          </Button>
          <Button
            variant="outline-none"
            className="bg-white sdp-text-grey-dark p-0"
            onClick={() => onDeletePembicara(original?.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const columnsMateri = [
    {
      Header: 'Materi',
      accessor: '',
      Cell: ({
        row: {
          original: { nama },
        },
      }) => <span>{nama}</span>,
    },
    {
      Header: 'Lampiran',
      accessor: '',
      Cell: ({
        row: {
          original: { fileType },
        },
      }) => <span>{fileType}</span>,
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ row: { original } }) => (
        <div>
          <Button
            variant="outline-none"
            className="bg-white sdp-text-blue p-0 mr-10"
            onClick={() => onModalEditMateri(original)}>
            Edit
          </Button>
          <Button
            variant="outline-none"
            className="bg-white sdp-text-grey-dark p-0"
            onClick={() => onDeleteMateri(original.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const tableConfigMateri = {
    className: 'cms-bimtek-table',
    columns: columnsMateri,
    data: dataMateri,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };

  const tableConfigPembicara = {
    className: 'cms-bimtek-table',
    columns: columnsPembicara,
    data: dataPembicara,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };
  return (
    <div className={bem.e('section cms-bimtek')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          Jadwal Bimbingan Teknis Baru
          <Button onClick={() => history.goBack()} className="ml-24" variant="secondary" style={{ width: '112px' }}>
            Batal
          </Button>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={handleSubmitCreate(handleProses)}>
            Simpan
          </Button>
        </div>
        <div>Saved 1 minutes ago Draft</div>
      </div>
      <div className={bem.e('body')}>
        <Col md={9}>
          <Input
            group
            className="mb-10"
            type="text"
            label="Nama Bimtek"
            name="namaBimtek"
            control={controlCreate}
            error={errorsCreate.namaBimtek?.message}
            rules={{ required: true }}
          />
          <SingleSelectDropDown
            group
            groupClass="mb-16"
            isMulti
            control={controlCreate}
            label="Kategori Bimtek"
            labelClass="sdp-form-label fw-normal"
            placeholder=""
            name="tags"
            data={tagsResultList}
            loading={tagsLoading}
            isCreatable={true}
            error={errorsCreate.tags?.message}
            rules={{ required: true }}
          />
          <Row className="align-items-end mb-15">
            <Col>
              <DatePicker
                group
                label="Tanggal Mulai Pelaksanaan Disetujui"
                name="tanggalMulaiDisetujui"
                control={controlCreate}
                error={errorsCreate.tanggalMulaiDisetujui?.message}
                rules={{ required: true }}
              />
            </Col>
            <Col>
              <Input
                group
                className="m-0"
                type="time"
                label=""
                name="jamMulaiDisetujui"
                control={controlCreate}
                error={errorsCreate.jamMulaiDisetujui?.message}
                rules={{ required: true }}
              />
            </Col>
          </Row>
          <Row className="align-items-end mb-15">
            <Col>
              <DatePicker
                group
                label="Tanggal Selesai Pelaksanaan Disetujui"
                name="tanggalSelesaiDisetujui"
                control={controlCreate}
                error={errorsCreate.tanggalSelesaiDisetujui?.message}
                rules={{ required: true }}
              />
            </Col>
            <Col>
              <Input
                group
                className="m-0"
                type="time"
                label=""
                name="jamSelesaiDisetujui"
                control={controlCreate}
                error={errorsCreate.jamSelesaiDisetujui?.message}
                rules={{ required: true }}
              />
            </Col>
          </Row>
          <SingleSelectDropDown
            group
            groupClass="mb-16"
            control={controlCreate}
            label="Kota Pelaksana"
            labelClass="sdp-form-label fw-normal"
            placeholder=""
            name="namaKota"
            control={controlCreate}
            data={[{ value: '', label: 'All' }, ...tagsResultKabupaten]}
            loading={tagsLoading}
            isCreatable={true}
            error={errorsCreate.namaKota?.message}
            rules={{ required: true }}
          />
          <Input
            group
            className="mb-10"
            type="text"
            label="Tempat"
            name="dataTempat"
            control={controlCreate}
            error={errorsCreate.dataTempat?.message}
            rules={{ required: true }}
          />
          <div className="pembicara">
            <div className="d-flex justify-content-between">
              <span className="fw-bold mb-10 d-block"> Pembicara </span>
              <Button variant="outline-none" onClick={() => setShowModal('pembicara')}>
                <Plus /> <span className="fw-bold text-danger"> Tambah Pembicara </span>
              </Button>
            </div>
            <Table {...tableConfigPembicara} />
          </div>
          <div className="materi">
            <div className="d-flex justify-content-between">
              <span className="fw-bold mb-10 d-block"> Materi </span>
              <Button variant="outline-none" onClick={() => setShowModal('materi')}>
                <Plus /> <span className="fw-bold text-danger"> Tambah Materi </span>
              </Button>
            </div>
            <span className="fw-bold mb-10 d-block"> Materi </span>
            <Table {...tableConfigMateri} />
          </div>
        </Col>
      </div>
      {showModal === 'proses' && (
        <CMSModal onClose={showModal} label="Simpan Jadwal Bimtek?" confirmButtonAction={handleSubmitCreate(onProses)} />
      )}
      {showModal === 'materi' || showModal === 'editMateri' ? (
        <ModalCreateMateri
          statusModal={showModal}
          idMateri={idMateri}
          visible={handleCloseModal}
          listMateri={listMateri}
          setListMateri={(data) => setListMateri(data)}
          dataMateri={dataMateri}
          setDataMateri={(data) => setDataMateri(data)}
          namaMateriEdit={namaMateri ? namaMateri : null}
        />
      ) : null}
      {showModal === 'pembicara' || showModal === 'editPembicara' ? (
        <ModalCreatePembicara
          statusModal={showModal}
          visible={handleCloseModal}
          dataPembicara={dataPembicara}
          idPembicara={idPembicara ? idPembicara : null}
          dataEditPembicara={dataEditPembicara ? dataEditPembicara : null}
          setDataPembicara={(data) => setDataPembicara(data)}
        />
      ) : null}
    </div>
  );
};

export default CMSJadwalBaru;
