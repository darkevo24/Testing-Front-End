import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiUrls, post } from 'utils/request';
import Input from 'components/Input';
import { Notification, Button } from 'components';

const schema = yup
  .object({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Confirm password is not the same')
      .required(),
  })
  .required();

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };

  const handleAPICall = async (method, url, params) => {
    try {
      await method(url, {}, params);
      handleNotification('secondary', 'Berhasil Merubah Password', 'check');
      setLoading(false);
    } catch (e) {
      handleNotification('secondary', e.data?.message, 'cross');
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
    handleAPICall(post, apiUrls.changeMyPassword, { data: { ...data } });
  };

  return (
    <Row className="change-password">
      <Col md={12} className="form-change-password">
        <div className="sdp-heading pb-30">Ubah Password</div>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            group
            label="Password Lama"
            name="oldPassword"
            control={control}
            rules={{ required: true }}
            type="password"
            error={errors.oldPassword?.message}
            className="mt-0"
            rightIcon={'eye'}
          />
          <Input
            group
            label="Password Baru"
            name="newPassword"
            control={control}
            rules={{ required: true }}
            type="password"
            error={errors.newPassword?.message}
            className="mt-0"
            rightIcon={'eye'}
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
            rightIcon={'eye'}
          />
          <Button loading={loading} type="submit" className="change-btn">
            Ubah
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ChangePassword;
