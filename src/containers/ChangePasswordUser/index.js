import { useState } from 'react';
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
import Spinner from 'react-bootstrap/Spinner';

const schema = yup
  .object({
    oldPassword: yup.string().required(),
    passwordNew: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('passwordNew'), null], 'Confirm password is not the same')
      .required(),
  })
  .required();

const ChangePassword = () => {
  const [loader, setLoader] = useState(false);

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
      setLoader(false);
    } catch (e) {
      handleNotification('secondary', `Error, ${e?.data?.message}`, 'cross');
      setLoader(false);
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
    setLoader(true);
    let obj = {
      oldPassword: data.oldPassword,
      newPassword: data.passwordNew,
      confirmNewPassword: data.confirmPassword,
    };
    handleAPICall(post, `${apiUrls.changeMyPassword}`, { data: obj });
  };

  return (
    <Row className="change-password">
      <Col md={12} className="form-change-password">
        <div className="sdp-heading pb-30">Ubah Password</div>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-15">
            <Form.Label>Password Lama</Form.Label>
            <Input
              name="oldPassword"
              control={control}
              rules={{ required: true }}
              type="password"
              error={errors.oldPassword?.message}
              className="mt-0"
            />
          </Form.Group>
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
          <Button disabled={loader} type="submit" className="change-btn">
            {loader && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />}
            Ubah
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ChangePassword;
