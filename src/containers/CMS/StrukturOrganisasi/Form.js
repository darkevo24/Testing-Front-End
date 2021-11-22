import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
// import Form from 'react-bootstrap/Form';
import bn from 'utils/bemNames';
import cx from 'classnames';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Dropdown, Input, Modal } from 'components';
import { ReactComponent as Plus } from 'assets/plus.svg';

const bem = bn('bimtek-form');

const CMSStrukturForm = ({ disabled = false, data }) => {
  const schema = yup
    .object({
      nama: yup.string().required(),
      kode: yup.string().required(),
      level: yup.mixed().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const level = [1, 2, 3, 4, 5];
  const [modalProfile, setModalProfile] = useState(false);
  const [listProfile, setListProfile] = useState([]);
  const [profile, setProfile] = useState({});

  const submitProfile = () => {
    listProfile.push(profile);
    setProfile({});
    setModalProfile(false);
  };

  const removeProfile = (index) => {
    let arr = listProfile;
    arr.splice(index, 1);
    setListProfile(arr);
  };

  const inputProfileHandler = () => (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Row>
        <Col>
          <Input disabled={disabled} group label="Kode Bidang" name="kode" control={control} error={errors.kode?.message} />
        </Col>
        <Col>
          <Dropdown
            disabled={disabled}
            group
            label="Level"
            name="level"
            control={control}
            placeholder="Pilih Level"
            error={errors.level?.message}
            options={level.map((lvl) => ({ value: lvl, label: lvl }))}
          />
        </Col>
      </Row>
      <Input disabled={disabled} group label="Nama Bidang" name="nama" control={control} error={errors.nama?.message} />
      <div className={cx(bem.e('header'), ' d-flex justify-content-between mt-5 ')}>
        <div className={bem.e('header-title')}>Profil</div>
        <div className={bem.e('header-add')} onClick={() => setModalProfile(true)}>
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
                <tr key={key}>
                  <td>{row.foto ? row.foto : ''}</td>
                  <td>{row.nama ? row.nama : ''}</td>
                  <td>{row.jabatan ? row.jabatan : ''}</td>
                  <td>
                    <span>Edit</span> <span onClick={() => removeProfile(key)}>Delete</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      <Modal visible={modalProfile} onClose={() => setModalProfile(false)} title="Tambah Profil">
        <div>
          <Form.Group className="mb-4">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              value={profile.nama ? profile.nama : ''}
              name="nama"
              onChange={inputProfileHandler()}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Jabatan</Form.Label>
            <Form.Control type="text" name="jabatan" onChange={inputProfileHandler()} />
          </Form.Group>
          {profile.foto ? profile.foto : ''}
          <Form.Group className="mb-4">
            <Form.Label>Foto</Form.Label>
            <Form.Control type="file" name="foto" onChange={inputProfileHandler()} />
          </Form.Group>
          <div className="d-flex justify-content-end mb-5">
            <Button
              onClick={() => setModalProfile(false)}
              className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
              variant="secondary"
              style={{ width: '112px' }}>
              Batal
            </Button>
            <Button onClick={() => submitProfile()} className="ml-10" variant="info" style={{ width: '112px' }}>
              Simpan
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CMSStrukturForm;
