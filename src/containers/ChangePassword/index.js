import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import isFunction from 'lodash/isFunction';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiUrls, post } from 'utils/request';
import Input from 'components/Input';
import { Notification } from 'components';
import { LeftChevron } from 'components/Icons';

import BackgroundCity from 'assets/background-citylogin.png';
import BackgroundData from 'assets/background-dataindonesia.png';
import BackgroundBatik from 'assets/background-batiklogin.png';

const schema = yup
  .object({
    passwordNew: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('passwordNew'), null], 'Confirm password is not the same')
      .required(),
  })
  .required();

const ChangePassword = () => {
  const search = useLocation().search;
  const key = new URLSearchParams(search).get('key');
  const history = useHistory();

  const goBack = () => {
    history.push('/login');
  };

  useEffect(() => {
    if (!key) goBack();
  }, []);

  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };

  const handleAPICall = async (method, url, params, callBack) => {
    try {
      await method(url, {}, params);
      handleNotification('secondary', 'Berhasil Merubah Password', 'check');
      isFunction(callBack) && callBack();
    } catch (e) {
      handleNotification('secondary', `Error, ${e?.data?.message}`, 'cross');
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    let obj = {
      key,
      newPassword: data.passwordNew,
      confirmNewPassword: data.confirmPassword,
    };
    handleAPICall(post, `${apiUrls.forgotPassword}`, { data: obj }, goBack);
  };

  return (
    <Row className="change-password relative">
      <button className="back-chevron" onClick={goBack}>
        <LeftChevron />
      </button>
      <Col md={4} className="form-change-password">
        <div className="sdp-heading pb-30">Ubah Password</div>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-15">
            <Form.Label>Password Baru</Form.Label>
            <Input
              name="passwordNew"
              control={control}
              rules={{ required: true }}
              type="password"
              error={errors.passwordNew?.message}
              className="mt-0"
            />
          </Form.Group>
          <Form.Group className="mb-15">
            <Form.Label>Konfirmasi Password Baru</Form.Label>
            <Input
              name="confirmPassword"
              control={control}
              rules={{ required: true }}
              type="password"
              error={errors.confirmPassword?.message}
              className="mt-0"
            />
          </Form.Group>
          <Button type="submit" className="change-btn">
            Ubah
          </Button>
        </Form>
      </Col>
      <Col md={8} className="background-login">
        <img src={BackgroundBatik} alt="background" />
        <img src={BackgroundData} alt="background" className="logo-title" />
        <img src={BackgroundCity} alt="background" />
      </Col>
    </Row>
  );
};

export default ChangePassword;
