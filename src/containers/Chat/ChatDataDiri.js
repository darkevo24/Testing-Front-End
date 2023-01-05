import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useKeycloak } from '@react-keycloak/web';

import { userSelector } from 'containers/Login/reducer';

const schema = yup
  .object({
    name: yup.string().required('Nama Wajib Diisi').min(3, 'Nama minimal 3 karakter'),
    email: yup.string().required('Email Wajib Diisi').email('Format email tidak valid'),
    phone: yup
      .string()
      .required('Nomor Telepon Wajib Diisi')
      .matches(/^[\+]?[0-9]*$/, 'Nomor Telepon hanya boleh angka')
      .min(8, 'Telepon minimal 8 karakter')
      .max(20, 'Telepon maksimal 20 karakter'),
    summary: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

export const ChatDataDiri = ({ startChat }) => {
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formRef = React.useRef(null);
  const { keycloak } = useKeycloak();
  const isLoggedIn = !!keycloak.authenticated;
  const user = useSelector(userSelector);

  const onSubmitForm = (data) => {
    startChat(data);
  };

  React.useEffect(() => {
    register('name');
    register('email');
    register('phone');
    register('summary');
    register('description');
  }, [register]);

  React.useEffect(() => {
    if (user?.nama) setValue('name', user?.nama);
    if (user?.email) setValue('email', user?.email);
    if (user?.phoneNumber) setValue('phone', user?.phoneNumber);
  }, [user]);

  return (
    <>
      <div className="content">
        <Form id="form-data-diri" ref={formRef} onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              isInvalid={errors?.name?.message}
              defaultValue={user?.nama}
              disabled={isLoggedIn && user?.nama}
              type="text"
              onChange={(e) => {
                setValue('name', e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              defaultValue={user?.email}
              disabled={isLoggedIn && user?.email}
              isInvalid={errors?.email?.message}
              onChange={(e) => {
                setValue('email', e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="phone" className="mb-3">
            <Form.Label>No Telepon</Form.Label>
            <Form.Control
              type="phone"
              defaultValue={user?.phoneNumber}
              disabled={isLoggedIn && user?.phoneNumber}
              isInvalid={errors?.phone?.message}
              onChange={(e) => {
                setValue('phone', e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="summary" className="mb-3">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              isInvalid={errors?.summary?.message}
              type="text"
              onChange={(e) => {
                setValue('summary', e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              isInvalid={errors?.description?.message}
              as="textarea"
              onChange={(e) => {
                setValue('description', e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </div>
      <div className="bottom">
        {!isLoggedIn && (
          <div className="silahkan-login">
            Silahkan{' '}
            <span
              onClick={() => {
                localStorage.setItem('sdi_chat_opendatadiri', 'yes');
                setTimeout(() => {
                  keycloak.login();
                }, 200);
              }}>
              login
            </span>{' '}
            jika sudah memiliki akun SDI
          </div>
        )}
        <Button form="form-data-diri" type="submit" className="w-100 br-8">
          Mulai
        </Button>
      </div>
    </>
  );
};
