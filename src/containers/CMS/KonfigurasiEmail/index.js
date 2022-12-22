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
import { apiUrls, post, put } from 'utils/request';
import { getCMSLogAktifitasEmailData, cmsLogAktifitasDataSelector, getEmailData, cmsEmailDataSelector } from './reducer';
import { update } from 'lodash';

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
      label: 'HUBUNGI_KAMI',
      value: '',
    },
    {
      label: 'PERMINTAAN_BIMTEK',
      value: '',
    },
    {
      label: 'PERMINTAAN_DATA',
      value: '',
    },
  ]);

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
  }, []);

  useEffect(() => {
    setDisableForm(editable);
  }, [editable]);

  const onSubmit = async () => {
    emailData.forEach((item) => {
      types.forEach((type) => {
        if (type.label === item.label) {
          const addData = {
            email: type.value,
            type: type.label,
          };
          if (addData.email !== '' && item.value === '') {
            postData(addData);
          } else if (addData.email !== '' && item.value !== '') {
            updateData(addData, item.id);
          }
        }
      });
    });
    setEditable(true);
    setShowModal(false);
  };

  const postData = async (addData) => {
    try {
      await post(apiUrls.cmsKonfigurasiEmail, addData);
      Notification.show({
        type: 'secondary',
        message: 'Email Added Successfully',
        icon: 'check',
      });
    } catch (err) {
      Notification.show({
        type: 'warning',
        message: err.data.message,
        icon: 'cross',
      });
    }
  };

  const updateData = async (data, id) => {
    const updateData = {
      id: id,
      email: data.email,
      type: data.type,
    };
    try {
      await put(apiUrls.cmsKonfigurasiEmail, updateData);
      Notification.show({
        type: 'secondary',
        message: 'Email Added Successfully',
        icon: 'check',
      });
    } catch (err) {
      Notification.show({
        type: 'warning',
        message: err.data.message,
        icon: 'cross',
      });
    }
  };

  return (
    <div className="d-flex row mt-32 justify-content-center">
      <div className="col-lg-6 mr-20">
        <div
          style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
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
                <Button
                  variant="info"
                  className="mr-16 br-4 px-40 py-13"
                  style={{ height: '50px' }}
                  onClick={() => setShowModal(true)}>
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
            {emailData.map((item) => (
              <Form.Group className="mb-24">
                <Form.Label className="sdp-text-grey-dark">{item.label}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={`Masukkan email ${item.label}`}
                  disabled={disableForm}
                  defaultValue={item.value}
                  onChange={(e) => handleTypesChange(item.label, e.target.value)}
                />
              </Form.Group>
            ))}
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
          <Button className="br-4 px-39 py-13" style={{ height: '50px' }} variant="info" onClick={onSubmit}>
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
