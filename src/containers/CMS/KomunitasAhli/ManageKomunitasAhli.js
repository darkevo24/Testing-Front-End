import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import * as yup from 'yup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaceBookIcon, InstagramIcon, TwitterIcon, YouTubeIcon } from 'assets/icons/SocialMedia';
import Modal from 'components/Modal';

const schema = yup
  .object({
    kode_ahli: yup.string().required(),
    name_ahli: yup.string().required(),
  })
  .required();

const Kontak_list = [
  {
    name: 'facebook',
    icon: <FaceBookIcon />,
  },
  {
    name: 'twitter',
    icon: <TwitterIcon />,
  },
  {
    name: 'instagram',
    icon: <InstagramIcon />,
  },
  {
    name: 'youtube',
    icon: <YouTubeIcon />,
  },
];

const KomunitasAhli = () => {
  const [showKontakModal, setShowKontakModal] = useState(false);
  const [kontakList, setKontakList] = useState(Kontak_list);
  const list = [{ value: '', label: '' }];
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      kontak1: 'No Handphone',
      kontak2: 'Email',
    },
  });

  const handleList = () => {};

  const removeItemFromList = (name) => {
    const index = kontakList.findIndex((item) => item.name === name);
    const data_clone = [...kontakList];
    data_clone.splice(index, 1);
    setKontakList(data_clone);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="sdp-manage-komunitas-container">
      <div className="d-flex justify-content-between border-bottom-gray-stroke">
        <div className="d-flex align-items-center">
          <label className="fw-bold fs-24 lh-29 p-32">Profil Ahli Baru</label>
          <button className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 py-13 px-40">Batal</button>
          <button className="mr-16 bg-gray sdp-text-grey-dark br-4 py-13 px-32 border-0">Simpan</button>
          <button className="mr-16 bg-info sdp-text-white br-4 py-13 px-40 border-0">kirim</button>
        </div>
        <div className="sdp-left-wrapper d-flex align-items-center mr-32">
          <lable className="mr-12 sdp-text-disable">Saved 1 minutes ago</lable>
          <label className="sdp-text-orange-light">Draft</label>
        </div>
      </div>
      <div className="bg-gray-lighter p-32">
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3 px-24">
            <Form.Group as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Kode Ahli</label>
              <Form.Control type="text" name="kode_ahli" rules={{ required: true }} />
            </Form.Group>
            <Form.Group as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Nama Ahli</label>
              <Form.Control type="text" name="name_ahli" rules={{ required: true }} />
            </Form.Group>
            <Form.Group as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Bidang Keahlian</label>
              <SingleDropDown data={list} />
            </Form.Group>
            <Form.Group as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Daerah</label>
              <SingleDropDown data={list} />
            </Form.Group>
            <Form.Group as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Instansi / Lembaga</label>
              <SingleDropDown data={list} />
            </Form.Group>
            <Form.Group as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Level</label>
              <SingleDropDown data={list} />
            </Form.Group>
            <Form.Group as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Penyelenggara</label>
              <SingleDropDown data={list} />
            </Form.Group>
            <Form.Group as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Pendidikan</label>
              <SingleDropDown data={list} />
            </Form.Group>
            <Form.Group as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Riwayat Singkat</label>
              <Form.Control type="text" as="textarea" rows={5} maxLength={500} />
            </Form.Group>
            <Form.Group controlId="formFile" as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Foto Profil</label>
              <Form.Control
                type="file"
                {...register('image', {
                  validate: {
                    lessThan10MB: (files) => files[0]?.size < 524288 || 'Max 512Kb',
                    acceptedFormats: (files) =>
                      ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0]?.type) || 'Only PNG, JPEG e JPG',
                  },
                })}
              />
            </Form.Group>
            <Form.Group controlId="formFile" as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">CV</label>
              <Form.Control
                type="file"
                {...register('cv', {
                  validate: {
                    lessThan10MB: (files) => files[0]?.size < 2097152 || 'Max 2MB',
                    acceptedFormats: (files) => ['pdf'].includes(files[0]?.type) || 'Only PDF',
                  },
                })}
              />
            </Form.Group>
            <Form.Group as={Col} className="d-flex justify-content-between mb-16" md="8">
              <Col className="sdp-table-sub-title py-16" md="4">
                Kontak
              </Col>
              <Col md="4" className="d-flex justify-content-end">
                <button className="sdp-text-red border-0 bg-transparent">+ Kontak</button>
              </Col>
            </Form.Group>
            <Row md="8" className="d-flex mb-16">
              <Form.Group md="4" as={Col} className="mb-16">
                <label className="sdp-form-label py-8">Kontak 1</label>
                <Form.Control type="text" name="kontak1" readOnly value="No Handphone" />
              </Form.Group>

              <Form.Group md="4" as={Col} className="mb-16 d-flex flex-column justify-content-end pr-0">
                <div className="d-flex">
                  <SingleDropDown data={list} />
                  <Form.Control type="text" name="contact" />
                </div>
              </Form.Group>
            </Row>
            <Row md="8" className="d-flex mb-16">
              <Form.Group md="4" as={Col} className="mb-16">
                <label className="sdp-form-label py-8">Kontak 2</label>
                <Form.Control type="text" name="kontak1" readOnly value="Email" />
              </Form.Group>

              <Form.Group md="4" as={Col} className="mb-16 d-flex flex-column justify-content-end pr-0">
                <div className="d-flex">
                  <Form.Control type="text" name="email" />
                </div>
              </Form.Group>
            </Row>
            {kontakList.map((kontak, index) => (
              <Form.Group as={Col} className="d-flex justify-content-between mb-16" md="8">
                <Col md="11">
                  <label className="sdp-form-label py-8">Kontak {index + 3}</label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white py-15 px-20">{kontak.icon}</InputGroup.Text>
                    <Form.Control type="text" name={kontak.name} />
                  </InputGroup>
                </Col>
                <Col md="1" className="d-flex justify-content-end">
                  <button
                    className="sdp-text-disable border-0 bg-transparent"
                    onClick={() => removeItemFromList(kontak.name)}>
                    Delete
                  </button>
                </Col>
              </Form.Group>
            ))}
          </Row>
        </Form>
      </div>
      {showKontakModal && (
        <Modal
          Visible={showKontakModal}
          onClose={() => setShowKontakModal(false)}
          title="Tambah Kontak"
          actions={[
            { variant: 'secondary', text: 'Batal', onClick: () => setShowKontakModal(false) },
            { text: 'Konfirmasi', type: 'submit' },
          ]}>
          <Form noValidate onSubmit={handleList}>
            <Form.Group as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Logo Sosmed</label>
              <Form.Control type="file" name="logo" rules={{ required: true }} />
            </Form.Group>
            <Form.Group as={Col} md="8" className="mb-16">
              <label className="sdp-form-label py-8">Link Tautan</label>
              <Form.Control type="text" name="link" rules={{ required: true }} />
            </Form.Group>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default KomunitasAhli;
