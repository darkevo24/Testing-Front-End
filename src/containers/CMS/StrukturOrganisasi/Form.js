import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
// import Form from 'react-bootstrap/Form';
import cx from 'classnames';

import bn from 'utils/bemNames';
import { submitForm } from 'utils/helper';
import { Input, CMSModal } from 'components';
import { ReactComponent as Plus } from 'assets/plus.svg';

import CMSStrukturProfile from './FormProfile';
import { createProfile, updateProfile, deleteProfile } from './reducer';

const bem = bn('bimtek-form');

export const formStrukturId = 'form-struktur-id';
export const submitStrukturForm = submitForm(formStrukturId);

const CMSStrukturForm = ({ disabled = false, dataValue, handleData = () => {} }) => {
  const dispatch = useDispatch();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [listProfile, setListProfile] = useState([]);

  const schema = yup
    .object({
      nama: yup.string().required(),
      kode: yup.string().required(),
      level: yup.string().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...dataValue,
    },
  });

  const handleInput = (e) => {
    clearErrors(e.target.name);
    setValue(e.target.name, e.target.value);
  };
  const submitStruktur = (data) => {
    data.profil = [...listProfile];
    handleData(data);
  };

  const removeProfile = () => {
    if (selectedProfile.id && dataValue.id) {
      // send data
      dispatch(deleteProfile({ idBidang: dataValue.id, idProfil: selectedProfile.id }));
    }
    setListProfile(listProfile.filter((item) => item !== selectedProfile));
    setModalDelete(false);
  };

  const openDeleteModal = (index) => {
    let selected = listProfile[index];
    setSelectedProfile(selected);
    setModalDelete(true);
  };

  const openModal = (index = -1) => {
    if (index < 0) {
      // modal add
      setModalAdd(true);
    } else {
      // modal edit
      let selected = {
        ...listProfile[index],
        index: index,
      };
      setSelectedProfile(selected);
      setModalEdit(true);
    }
  };

  const addProfile = (data) => {
    if (dataValue.id) {
      // send data
      dispatch(createProfile({ payload: data, id: dataValue.id }));
    }
    setListProfile([...listProfile, data]);
    setModalAdd(false);
  };

  const editProfile = (data) => {
    if (dataValue.id && data.id) {
      // send data
      dispatch(updateProfile({ payload: data, id: dataValue.id }));
    }
    let edit = [...listProfile];
    edit[data.index] = data;
    setListProfile(edit);
    setModalEdit(false);
  };

  useEffect(() => {
    setListProfile(dataValue?.profil ? dataValue.profil : []);
  }, [dataValue]);

  return (
    <Form id={formStrukturId} onSubmit={handleSubmit(submitStruktur)}>
      <Row>
        <Col>
          <Input group label="Kode Bidang" name="kode" control={control} error={errors.kode?.message} disabled={disabled} />
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Level</Form.Label>
            <Form.Select onChange={(e) => handleInput(e)} defaultValue={dataValue?.level} name="level" disabled={disabled}>
              <option value="">Pilih Level</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
            <div className="sdp-error">{errors.level?.message}</div>
          </Form.Group>
        </Col>
      </Row>
      <Input group label="Nama Bidang" name="nama" control={control} error={errors.nama?.message} disabled={disabled} />
      <div className={cx(bem.e('header'), ' d-flex justify-content-between mt-5 ')}>
        <div className={bem.e('header-title')}>Profil</div>
        <div className={cx(bem.e('header-add'), { invisible: disabled })} onClick={() => openModal()}>
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
                    {!disabled && (
                      <>
                        <span className="cursor-pointer sdp-text-blue mr-12" onClick={() => openModal(key)}>
                          Edit
                        </span>
                        <span className="cursor-pointer sdp-text-disable" onClick={() => openDeleteModal(key)}>
                          Delete
                        </span>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      {modalAdd ? (
        <CMSStrukturProfile
          show={modalAdd}
          handleClose={() => setModalAdd(false)}
          title="Tambah Profil"
          onSubmit={addProfile}
        />
      ) : null}
      {modalEdit ? (
        <CMSStrukturProfile
          show={modalEdit}
          handleClose={() => setModalEdit(false)}
          title="Edit Profil"
          data={selectedProfile}
          onSubmit={editProfile}
        />
      ) : null}
      {modalDelete ? (
        <CMSModal
          loader={false}
          onClose={() => setModalDelete(false)}
          confirmButtonAction={removeProfile}
          label={
            <span>
              Apakah anda yakin ingin <b className="sdp-text-blue">menghapus</b> Profil?
            </span>
          }
        />
      ) : null}
      <Button className="invisible" type="submit" />
    </Form>
  );
};

export default CMSStrukturForm;
