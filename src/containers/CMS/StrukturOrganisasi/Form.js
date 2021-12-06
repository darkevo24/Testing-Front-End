import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
// import Form from 'react-bootstrap/Form';
import bn from 'utils/bemNames';
import cx from 'classnames';

import { Modal } from 'components';
import { ReactComponent as Plus } from 'assets/plus.svg';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const bem = bn('bimtek-form');

const CMSStrukturForm = ({ disabled = false, dataValue, handleData = () => {} }) => {
  const [modalProfile, setModalProfile] = useState(false);
  const [listProfile, setListProfile] = useState([]);
  const [isEdit, setIsEdit] = useState(-1);

  const schema = yup
    .object({
      nama: yup.string().required(),
      jabatan: yup.string().required(),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitProfile = (data) => {
    if (isEdit < 0) {
      // add state
      setListProfile([...listProfile, data]);
    } else {
      // edit state
      let edit = [...listProfile];
      edit[isEdit] = data;
      setListProfile(edit);
    }

    handleData({
      ...dataValue,
      profil: listProfile,
    });
    setModalProfile(false);
  };

  const removeProfile = (index) => {
    let selected = listProfile[index];
    setListProfile(listProfile.filter((item) => item !== selected));
    handleData({
      ...dataValue,
      profil: listProfile,
    });
  };

  const openModal = (index = -1) => {
    clearErrors();
    if (index < 0) {
      // modal add
      setValue('nama', '');
      setValue('jabatan', '');
      setValue('foto', null);
    } else {
      // modal edit
      var selected = listProfile[index];
      setValue('nama', selected.nama ? selected.nama : '');
      setValue('jabatan', selected.jabatan ? selected.jabatan : '');
      setValue('foto', selected.foto ? selected.foto : '');
    }

    setIsEdit(index);
    setModalProfile(true);
  };

  const inputBidangHandler = () => (event) => {
    handleData({
      ...dataValue,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setListProfile(dataValue?.profil ? dataValue.profil : []);
  }, [dataValue]);

  return (
    <div>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Kode Bidang</Form.Label>
            <Form.Control onChange={inputBidangHandler()} defaultValue={dataValue?.kode} type="text" name="kode" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Level</Form.Label>
            <Form.Select onChange={inputBidangHandler()} defaultValue={dataValue?.level} name="level">
              <option disabled>Pilih Level</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-24 mt-24">
        <Form.Label>Nama Bidang</Form.Label>
        <Form.Control onChange={inputBidangHandler()} defaultValue={dataValue?.nama} type="text" name="nama" />
      </Form.Group>
      <div className={cx(bem.e('header'), ' d-flex justify-content-between mt-5 ')}>
        <div className={bem.e('header-title')}>Profil</div>
        <div className={bem.e('header-add')} onClick={() => openModal()}>
          <Plus />
          Tambah Profil
        </div>
      </div>
      <div className={bem.e('section')}>
        <Table className={bem.e('table')}>
          <thead>
            <tr>
              <th>Foto Profil</th>
              <th>Nama Profil</th>
              <th>Jabatan</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listProfile.length === 0 ? (
              <tr>
                <td className="text-center" colSpan={4}>
                  Tidak ada data
                </td>
              </tr>
            ) : (
              listProfile.map((row, key) => (
                <tr key={key} className="align-middle">
                  <td>
                    <div
                      style={{ backgroundImage: `url(${row.foto ? row.foto : ''})` }}
                      className={bem.e('profile-circle')}></div>
                  </td>
                  <td>{row.nama ? row.nama : ''}</td>
                  <td>{row.jabatan ? row.jabatan : ''}</td>
                  <td>
                    <span className="sdp-text-blue mr-12" onClick={() => openModal(key)}>
                      Edit
                    </span>
                    <span className="sdp-text-disable" onClick={() => removeProfile(key)}>
                      Delete
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      <Modal
        visible={modalProfile}
        onClose={() => setModalProfile(false)}
        title={isEdit >= 0 ? 'Edit Profil' : 'Tambah Profil'}>
        <div>
          <Form.Group className="mb-8 sdp-input-wrapper">
            <Form.Label>Nama</Form.Label>
            <Form.Control defaultValue={getValues('nama')} type="text" name="nama" {...register('nama')} />
            <div className="sdp-error">{errors.nama?.message}</div>
          </Form.Group>
          <Form.Group className="mb-8">
            <Form.Label>Jabatan</Form.Label>
            <Form.Control defaultValue={getValues('jabatan')} type="text" name="jabatan" {...register('jabatan')} />
            <div className="sdp-error">{errors.jabatan?.message}</div>
          </Form.Group>
          <Form.Group className="mb-24">
            <Form.Label>Foto</Form.Label>
            <Form.Control type="file" name="file" />
            <input className="invisible" type="text" name="foto" {...register('foto')} />
          </Form.Group>
          <div className="d-flex justify-content-end mb-12">
            <Button
              onClick={() => setModalProfile(false)}
              className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
              variant="secondary"
              style={{ width: '112px' }}>
              Batal
            </Button>
            <Button onClick={handleSubmit(submitProfile)} className="ml-10" variant="info" style={{ width: '112px' }}>
              Simpan
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CMSStrukturForm;
