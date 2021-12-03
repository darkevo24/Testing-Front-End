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

const bem = bn('bimtek-form');

const CMSStrukturForm = ({ disabled = false, data, handleData = () => {} }) => {
  const [modalProfile, setModalProfile] = useState(false);
  const [listProfile, setListProfile] = useState([]);
  const [profile, setProfile] = useState({});
  const [isEdit, setIsEdit] = useState(-1);

  const submitProfile = () => {
    if (isEdit >= 0) {
      let edit = [...listProfile];
      edit[isEdit] = profile;
      setListProfile(edit);
    } else {
      setListProfile([...listProfile, profile]);
    }
    setModalProfile(false);
    setProfile({});
    setIsEdit(-1);
  };

  const removeProfile = (index) => {
    let selected = listProfile[index];
    setListProfile(listProfile.filter((item) => item !== selected));
  };

  const openEdit = (index) => {
    setIsEdit(index);
    let selected = listProfile[index];
    setProfile(selected);
    setModalProfile(true);
  };

  const closeModal = () => {
    setModalProfile(false);
    setProfile({});
    setIsEdit(-1);
  };

  const inputProfileHandler = () => (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const inputBidangHandler = () => (event) => {
    handleData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setListProfile(data.profil);
  }, [data]);

  return (
    <div>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Kode Bidang</Form.Label>
            <Form.Control onChange={inputBidangHandler()} defaultValue={data?.kode} type="text" name="kode" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Level</Form.Label>
            <Form.Select onChange={inputBidangHandler()} defaultValue={data?.level} name="level">
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
        <Form.Control onChange={inputBidangHandler()} defaultValue={data?.nama} type="text" name="nama" />
      </Form.Group>
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
                <tr key={key} className="align-middle">
                  <td>
                    <div
                      style={{ backgroundImage: `url(${row.foto ? row.foto : ''})` }}
                      className={bem.e('profile-circle')}></div>
                  </td>
                  <td>{row.nama ? row.nama : ''}</td>
                  <td>{row.jabatan ? row.jabatan : ''}</td>
                  <td>
                    <span className="sdp-text-blue mr-12" onClick={() => openEdit(key)}>
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
      <Modal visible={modalProfile} onClose={closeModal} title={isEdit >= 0 ? 'Edit Profil' : 'Tambah Profil'}>
        <div>
          <Form.Group className="mb-8">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              value={profile.nama ? profile.nama : ''}
              name="nama"
              onChange={inputProfileHandler()}
            />
          </Form.Group>
          <Form.Group className="mb-8">
            <Form.Label>Jabatan</Form.Label>
            <Form.Control
              type="text"
              value={profile.jabatan ? profile.jabatan : ''}
              name="jabatan"
              onChange={inputProfileHandler()}
            />
          </Form.Group>
          <Form.Group className="mb-24">
            <Form.Label>Foto</Form.Label>
            <Form.Control type="file" name="foto" onChange={inputProfileHandler()} />
          </Form.Group>
          <div className="d-flex justify-content-end mb-12">
            <Button
              onClick={closeModal}
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
