import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import bn from 'utils/bemNames';
import LogStatus from 'components/LogStatus';
import Modal from 'components/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { apiUrls, post } from 'utils/request';
import { getCMSLogAktifitasEmailData, cmsLogAktifitasDataSelector, getEmailData, cmsEmailDataSelector } from './reducer';

const bem = bn('content-create');
const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const CMSKonfigurasiEmail = () => {
  const dispatch = useDispatch();
  const { records: logData } = useSelector(cmsLogAktifitasDataSelector);
  const { records: emailData } = useSelector(cmsEmailDataSelector);
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

  useEffect(() => {
    // if (emailData && !isEmpty(emailData)) {
    //   emailData.map((item) => {
    //     types.map((type) => {
    //       if (type.label === item.type) {
    //         type.value = item.email;
    //       }
    //     });
    //   });
    //   setTypes(types);
    // }
  }, []);

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
    dispatch(getCMSLogAktifitasEmailData());
    dispatch(getEmailData());
    console.log('++++', emailData);
  }, []);

  useEffect(() => {
    setDisableForm(editable);
  }, [editable]);

  const onSubmit = async () => {
    types.forEach((type) => {
      if (type.value !== '') {
        const addData = {
          name: 'test frontend',
          email: type.value,
          type: type.label,
        };
        if (addData.value !== '' && types.email === undefined) {
          // const response = await post(apiUrls.cmsKonfigurasiEmail, addData);
          console.log('post new', addData);
        }
        //if value not empty before and now not empty
        else if (addData.value !== '' && emailData.email !== '') {
          // const response = await post(apiUrls.email, addData);
          console.log('post update', addData);
        }
      }
    });

    // try {
    //   const response = await post(apiUrls.konfigurasiEmail, addData);
    //   // await post(apiUrls.cmsKonfigurasiEmail, addData);
    //   console.log('aa', response);
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
    setEditable(true);
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
        {emailData.length > 0 && (
          <Form className="sdp-form" onSubmit={handleSubmit(onSubmit)}>
            {/* {types.map((item) => (
              <Form.Group className="mb-24">
                <Form.Label className="sdp-text-grey-dark">{item.label}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={`Masukkan email ${item.label}`}
                  disabled={disableForm}
                  onChange={(e) => handleTypesChange(item.label, e.target.value)}
                />
              </Form.Group>
            ))} */}
            {/* {emailData.map((item) => (
              <h1>{item.id}</h1>
            ))} */}
          </Form>
        )}
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
