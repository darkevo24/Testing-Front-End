import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import isFunction from 'lodash/isFunction';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiUrls, post } from 'utils/request';
import Input from 'components/Input';
import { Notification, Button } from 'components';
import { LeftChevron } from 'components/Icons';

import BackgroundCity from 'assets/background-citylogin.png';
import BackgroundData from 'assets/background-dataindonesia.png';
import BackgroundBatik from 'assets/background-batiklogin.png';

const schema = yup
  .object({
    newPassword: yup.string().required(),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Confirm password is not the same')
      .required(),
  })
  .required();

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    } catch (e) {
      handleNotification('secondary', e?.data?.message, 'cross');
      setLoading(false);
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
    setLoading(true);
    handleAPICall(post, apiUrls.forgotPassword, { data: { key, ...data } }, goBack);
  };

  return (
    <Row className="change-password relative">
      <button className="back-chevron" onClick={goBack}>
        <LeftChevron />
      </button>
      <Col md={4} className="form-change-password">
        <div className="sdp-heading pb-30">Ganti Password</div>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            group
            label="Password Baru"
            name="newPassword"
            control={control}
            rules={{ required: true }}
            type="password"
            error={errors.newPassword?.message}
            className="mt-0"
          />
          <Input
            group
            label="Konfirmasi Password Baru"
            name="confirmNewPassword"
            control={control}
            rules={{ required: true }}
            type="password"
            error={errors.confirmNewPassword?.message}
            className="mt-0"
          />
          <Button loading={loading} type="submit" className="change-btn">
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
