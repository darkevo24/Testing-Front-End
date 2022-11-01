import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { postTentang } from './reducer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Notification from '../../components/Notification';
import axios from 'axios';
import { fileExtention } from 'utils/constants';
import { useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';
import { icons } from 'components/Icons';
import { useKeycloak } from '@react-keycloak/web';

import Pdf from 'assets/icons/Tentang/pdf-svgrepo-com.svg';

const ContactUs = () => {
  const { keycloak } = useKeycloak();
  const user = useSelector(userSelector);
  const [errorUploadFile, setErrorUploadFile] = useState('');
  const [data, setData] = useState({
    attachment: [],
  });
  const dispatch = useDispatch();
  const isLoggedIn = !!keycloak.authenticated;

  const formControl = async (key, value) => {
    setData((oldData) => {
      oldData[`${key}`] = value;
      return { ...oldData };
    });
  };

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
      summary: yup.string().required('Ringkasan Wajib Diisi'),
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
    defaultValues: {
      full_name: user?.nama,
      email: user?.email,
    },
  });

  const formRef = useRef(null);

  const handleUploadFile = async (e) => {
    const file = e?.target?.files?.[0];

    var totalSize = 0;
    data.attachment.forEach((item) => {
      totalSize += item.size;
    });

    totalSize += file.size;

    if (!file) {
      setErrorUploadFile('Please select a file!');
      return '';
    }
    if (!fileExtention.includes(file.type)) {
      setErrorUploadFile('Please select a file with jpg, png, or pdf extension!');
      return '';
    }
    if (file.size >= 5000000) {
      setErrorUploadFile('File size must be under 5 Mb!');
      return '';
    }

    if (totalSize >= 5000000) {
      setErrorUploadFile('All File size must be under 5 Mb!');
      return '';
    }

    setErrorUploadFile('');
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    const uploadedFile = await axios.post('http://localhost:4040/api/image', bodyFormData);
    if (uploadedFile.status === 200) {
      const attachmentList = data.attachment;
      const newUploadedFile = {
        file: uploadedFile?.data?.imageUrl,
        type: file.type,
        size: file.size,
        name: file.name,
      };
      attachmentList.push(newUploadedFile);
      formControl('attachment', attachmentList);
    }
    return '';
  };

  const deleteAttachment = (e) => {
    data.attachment = data.attachment.filter((item, index) => index !== e);
    formControl('attachment', data.attachment);
  };

  const handleReset = () => {
    formControl('attachment', []);
    formRef.current.reset();
  };

  const onSubmitProses = (post) => {
    dispatch(
      postTentang({
        status: 'RESPONSE',
        description: post.message,
        summary: post.summary,
        createdBy: post.email,
        attachment: data.attachment,
        creatorDetail: {
          nama: post.full_name,
          email: post.email,
          telepon: post.telephone,
        },
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
    register('summary');
    register('files');
  }, [register]);

  return (
    <div id="tentang-form" className="contactus-container">
      <div className="contactus-wrapper">
        <div className="contactus-title mb-4">Hubungi Kami</div>
        {user == null ? (
          <p>
            Sudah Miliki Akun? Silahkan&nbsp;
            <a className="cursor-pointer text-bold" onClick={keycloak.login}>
              Login
            </a>
          </p>
        ) : (
          <p></p>
        )}
        <Form ref={formRef} onSubmit={handleSubmit(onSubmitProses)}>
          <Form.Group controlId="fullName" className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              value={user?.nama}
              isValid={false}
              type="text"
              onChange={(e) => {
                setValue('full_name', e.target.value);
              }}
              disabled={isLoggedIn}
            />
            {errors?.full_name?.message && <div className={'error-message'}>{errors?.full_name?.message}</div>}
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={user?.email}
              type="email"
              onChange={(e) => {
                setValue('email', e.target.value);
              }}
              disabled={isLoggedIn}
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
          <Form.Group controlId="summary" className="mb-3">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              isValid={false}
              type="text"
              onChange={(e) => {
                setValue('summary', e.target.value);
              }}
            />
            {errors?.summary?.message && <div className={'error-message'}>{errors?.summary?.message}</div>}
          </Form.Group>
          <Form.Group controlId="message" className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
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
          <Form.Group controlId="files" className="mb-3 bg-white p-20">
            <label htmlFor="files">
              <div className="flex justify-center cursor-pointer">
                <div className="flex">
                  <div className="text-left flex flex-col justify-center">
                    <div>
                      <span className="text-black font-weight-bold">Browse</span>{' '}
                      <span className="text-muted">Files to Upload</span>
                    </div>
                    <div className="mt-1 text-muted">_*Format files must be (*.jpg, *.png, *.pdf ) Maximum 5mb_</div>
                  </div>
                </div>
              </div>
            </label>
            <Form.Control onChange={handleUploadFile} type="file" hidden></Form.Control>
            <Container>
              <Row>
                {data.attachment.length !== 0 &&
                  data.attachment.map((attachmentFile, index) => (
                    <Col xs lg="4" className="mb-5 mt-5">
                      <div className="bg-gray rounded-lg" key={`file-${attachmentFile.type}-${index}`}>
                        <Button
                          style={{
                            'border-radius': '50%',
                            float: 'right',
                          }}
                          className="float-right"
                          type="button"
                          onClick={() => deleteAttachment(index)}>
                          <icons.close props={'text-white'} />
                        </Button>
                        <div className="flex flex-col justify-center h-full p-1">
                          {attachmentFile.type === 'application/pdf' ? (
                            <div>
                              <img src={Pdf} alt="" />
                              <div className="text-center text-gray1 mt-3">{attachmentFile.name}</div>
                            </div>
                          ) : (
                            <img className="image" src={attachmentFile.file} alt="file-data" />
                          )}
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
            </Container>
            {errorUploadFile && <div className="my-4 text-xs text-red1">{errorUploadFile}</div>}
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
