import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import cx from 'classnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CMSModal, Modal, FileInput, Input, Loader } from 'components';
import { icons, Trash, Edit } from 'components/Icons';
import bn from 'utils/bemNames';
import { apiUrls, post } from 'utils/request';
import { getListSosMed, getListSelector, deleteSosMed, editSosMed, createSosMed } from './reducer';

const bem = bn('content-table');

const CMSMediaSosial = () => {
  const schema = yup
    .object({
      image: yup.mixed().required(),
      tipe: yup.string().required(),
    })
    .required();

  const dispatch = useDispatch();
  const { loading, records } = useSelector(getListSelector);
  const [selected, setSelected] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalForm, setModalForm] = useState('');

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchData = () => {
    dispatch(getListSosMed());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteAction = (key) => {
    setSelected(records[key]);
    setModalDelete(true);
  };

  const editAction = (key) => {
    setSelected(records[key]);
    setValue('id', records[key].id);
    setValue('tipe', records[key].tipe);
    setValue('image', records[key].image);
    setModalForm('edit');
  };

  const addAction = () => {
    setValue('image', '');
    setValue('tipe', '');
    setModalForm('add');
  };

  const deleteData = () => {
    dispatch(deleteSosMed({ id: selected.id })).then(() => {
      fetchData();
      setModalDelete(false);
    });
  };

  const simpanData = (data) => {
    setModalForm('');
    // edit action
    if (modalForm === 'edit') {
      return dispatch(editSosMed({ payload: data })).then(() => fetchData());
    }
    // create action
    delete data.id;
    return dispatch(createSosMed({ payload: data })).then(() => fetchData());
  };

  const [foto, setFoto] = useState(null);
  const [fotoLoading, setFotoLoading] = useState(false);
  const handleFoto = (file) => {
    // eslint-disable-next-line
    let fileName = file.name.replace(/[&/\\#, +()$~%'":*?<>{}]/g, '');
    let newFile = new File([file], fileName, { type: 'image/png' });
    setFoto(newFile);
  };
  const uploadFoto = async () => {
    setFotoLoading(true);
    try {
      let fotoFormData = new FormData();
      fotoFormData.append('file', foto);
      await post(apiUrls.uploadFoto, fotoFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        setFotoLoading(false);
        setSelected({
          ...selected,
          image: res.data.location,
        });
        setValue('image', res.data.location);
      });
    } catch (e) {
      errors.foto.message = e?.error?.message;
    }
  };
  useEffect(() => {
    if (foto !== null) {
      uploadFoto();
    }
  }, [foto]);

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-3')}>Media Sosial</div>
        <Row className="justify-content-between">
          <Col xs={2}>
            <Button onClick={() => addAction()} variant="info" className="text-center">
              Tambah
            </Button>
          </Col>
        </Row>
      </div>
      <div className={bem.e('body')}>
        {records.length === 0 ? (
          <div className="text-center mt-3">
            <icons.noPerminataanData />
            <div className="text-black-50 mb-2 mt-2">No Data</div>
          </div>
        ) : null}
        {records.map((sosmed, index) => (
          <Row key={index} className="align-items-center mb-3">
            <Col xs={6} className="d-flex">
              <div className="bg-white border-gray-stroke py-16 text-center wpx-50">
                <img alt="logo" src={sosmed.image} />
              </div>
              <div className="bg-white border-gray-stroke py-16 px-16 w-100">{sosmed.tipe}</div>
            </Col>
            <Col xs={1} className="d-flex justify-content-between align-items-center cursor-pointer">
              <div onClick={() => deleteAction(index)}>
                <Trash />
              </div>
              <Button onClick={() => editAction(index)} variant="light" className="bg-white border-gray-stroke">
                <Edit />
              </Button>
            </Col>
          </Row>
        ))}
      </div>
      {loading && <Loader fullscreen={true} />}
      <Modal
        visible={modalForm}
        onClose={() => setModalForm('')}
        title={modalForm === 'add' ? 'Tambah Sosial Media' : 'Edit Sosial Media'}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Logo Sosmed</Form.Label>
            <div>{modalForm === 'edit' ? <img className="wpx-50 mb-3" src={selected?.image} alt="logo" /> : null}</div>
            <FileInput
              name="image"
              uploadInfo="Upload Image (format .png, .svg, 512KB)"
              control={control}
              handleOnChange={handleFoto}
              error={errors.image?.message}
            />
          </Form.Group>
          <Input group label="Nama Media Sosial" name="tipe" control={control} error={errors.tipe?.message} />
          <div className="d-flex justify-content-end mb-12 mt-32">
            <Button
              onClick={() => setModalForm('')}
              className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
              variant="light"
              style={{ width: '112px' }}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit(simpanData)}
              disabled={fotoLoading}
              className="ml-10"
              variant="info"
              style={{ width: '112px' }}>
              Simpan
            </Button>
          </div>
        </Form>
      </Modal>
      {modalDelete ? (
        <CMSModal
          loader={false}
          onClose={() => setModalDelete(false)}
          confirmButtonAction={() => deleteData()}
          label={
            <span>
              Apakah anda yakin ingin <b className="sdp-text-blue">menghapus</b> {selected.tipe}?
            </span>
          }
        />
      ) : null}
    </div>
  );
};

export default CMSMediaSosial;
