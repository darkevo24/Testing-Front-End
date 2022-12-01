import React, { useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
// import Input from 'components/Input';
import Input from 'react-bootstrap/InputGroup';
import { useForm } from 'react-hook-form';
import bn from 'utils/bemNames';
import LogStatus from 'components/LogStatus';
import Modal from 'components/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormGroup } from 'react-bootstrap';

const bem = bn('content-create');
// const schema = yup
//   .object({
//     email: yup.string().email().required(),
//   })
//   .required();

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const CMSKonfigurasiEmail = () => {
  // const { loading, record } = useSelector(konfiguasiPortalCmsListSelector);
  const {
    control,
    reset,
    setError,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const [disableForm, setDisableForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [editable, setEditable] = useState(true);
  const [types, setTypes] = useState([
    {
      label: 'Hubungi Kami',
      value: '',
    },
    {
      label: 'Permintaan Bimtek',
      value: '',
    },
    {
      label: 'Permintaan Data',
      value: '',
    },
  ]);

  const logData = [
    {
      status: 'ACTIVE',
      remark: 'Email konfigurasi berhasil diubah',
      createdAt: '2021-07-01T07:00:00.000Z',
    },
  ];

  const handleBack = () => {
    reset();
  };

  const handleTypesChange = (label, value) => {
    const newTypes = types;
    types.forEach((type) => {
      if (type.label === label) type.value = value;
    });
    setTypes(newTypes);
  };

  useEffect(() => {
    setDisableForm(editable);
  }, [editable]);

  const onSubmit = async (inputData) => {
    console.log(types);
    // const addData = {
    //   ...inputData,
    //   name: 'test frontend',
    //   email: inputData.email,
    //   type: 'PERMINTAAN DATA',
    // };
    // try {
    //   await post(apiUrls.cmsKonfigurasiEmail, addData);
    //   Notification.show({
    //     type: 'secondary',
    //     message: 'Email Added Successfully',
    //     icon: 'check',
    //   });
    // } catch (err) {
    //   Notification.show({
    //     type: 'warning',
    //     message: err.data.message,
    //     icon: 'cross',
    //   });
    // }
    setShowModal(false);
  };

  return (
    <div className="d-flex row mt-32 justify-content-center">
      <div className="col-lg-6 mr-20">
        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>
          <div>Konfigurasi Email</div>
          <div>
            {!editable ? (
              <>
                <Button
                  key="Batal"
                  variant="light"
                  className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40 py-13"
                  onClick={() => setEditable(true)}>
                  Batal
                </Button>
                <Button variant="info" className="mr-16 br-4 px-40 py-13" onClick={() => setShowModal(true)}>
                  Simpan
                </Button>
              </>
            ) : (
              <Button variant="outline-light" onClick={() => setEditable(false)}>
                Edit
              </Button>
            )}
          </div>
        </div>
        <Form className="sdp-form" onSubmit={handleSubmit(onSubmit)}>
          {types.map((item) => (
            <Form.Group className="mb-24">
              <Form.Label className="sdp-text-grey-dark">{item.label}</Form.Label>
              <Form.Control
                type="email"
                placeholder={`Masukkan email ${item.label}`}
                disabled={disableForm}
                onChange={(e) => handleTypesChange(item.label, e.target.value)}
              />
            </Form.Group>
          ))}
        </Form>
      </div>
      <Modal visible={showModal} onClose={() => setShowModal(false)} title="" showHeader={false}>
        <label className="mt-12 ml-8 fs-16">
          Apakah anda yakin ingin
          <span className="sdp-text-blue"> menyimpan </span>
          perubahan konfigurasi email ?
        </label>
        <div className="d-flex justify-content-end mt-30">
          <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button className="br-4 px-39 py-13" variant="info" onClick={onSubmit}>
            Konfirmasi
          </Button>
        </div>
      </Modal>
      <div className="col-lg-2">
        <Title>Log Status</Title>
        {logData.length > 0 ? (
          logData.map((log) => <LogStatus log={log} key={log.id} />)
        ) : (
          <div className="mt-15">Log Status Tidak Ada</div>
        )}
      </div>
    </div>
  );
};

export default CMSKonfigurasiEmail;
