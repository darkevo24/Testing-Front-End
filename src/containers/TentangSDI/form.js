import React, { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { postTentang } from './reducer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Notification from '../../components/Notification';
const ContactUs = () => {
  const dispatch = useDispatch();

  const schema = yup
    .object({
      full_name: yup.string().required('Nama Lengkap Wajib Diisi').min(5, 'Nama lengkap minimal 5 karakter'),
      email: yup.string().required('Email Wajib Diisi').email('Format email tidak valid'),
      telephone: yup
        .string()
        .required('Nomor Telefon Wajib Diisi')
        .matches(/^[0-9]*$/, 'Nomor Telefon hanya boleh angka')
        .min(8, 'Telepon minimal 8 karakter')
        .max(20, 'Telepon maksimal 20 karakter'),
      message: yup
        .string()
        .required('Pesan Wajib Diisi')
        .min(10, 'Pesan minimal 10 karakter')
        .max(300, 'Pesan maksimal 300 karakter'),
    })
    .required();

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formRef = useRef(null);

  const handleReset = () => {
    formRef.current.reset();
  };

  const onSubmitProses = (data) => {
    dispatch(
      postTentang({
        nama: data.full_name,
        email: data.email,
        telepon: data.telephone,
        pesan: data.message,
      }),
    ).then((result) => {
      if (!result.error) {
        handleReset();
        Notification.show({
          type: 'secondary',
          message: <div> Pesan Berhasil Terkirim </div>,
          icon: 'check',
        });
      } else {
        Notification.show({
          type: 'secondary',
          message: <div> Pesan Gagal Terkirim </div>,
          icon: 'check',
        });
      }
    });
  };

  useEffect(() => {
    register('full_name');
    register('email');
    register('telephone');
    register('message');
  }, [register]);

  return (
    <div id="tentang-form" className="contactus-container">
      <div className="contactus-wrapper">
        <div className="contactus-title mb-4">Hubungi Kami</div>
        <Form ref={formRef} onSubmit={handleSubmit(onSubmitProses)}>
          <Form.Group controlId="fullName" className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              isValid={false}
              type="text"
              onChange={(e) => {
                setValue('full_name', e.target.value);
              }}
            />
            {errors?.full_name?.message && <div className={'error-message'}>{errors?.full_name?.message}</div>}
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => {
                setValue('email', e.target.value);
              }}
            />
            {errors?.email?.message && <div className={'error-message'}>{errors?.email?.message}</div>}
          </Form.Group>
          <Form.Group controlId="phoneNumber" className="mb-3">
            <Form.Label>Nomor Telefon</Form.Label>
            <Form.Control
              type="phone"
              onChange={(e) => {
                setValue('telephone', e.target.value);
              }}
            />
            {errors?.telephone?.message && <div className={'error-message'}>{errors?.telephone?.message}</div>}
          </Form.Group>
          <Form.Group controlId="message" className="mb-3">
            <Form.Label>Pesan</Form.Label>
            <Form.Control
              onChange={(e) => {
                setValue('message', e.target.value);
              }}
              as="textarea"
              rows={3}
              style={{ height: '100px' }}
            />
            {errors?.message?.message && <div className={'error-message'}>{errors?.message?.message}</div>}
          </Form.Group>
          <Button className="w-100" type="submit">
            Kirim Pesan
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;
