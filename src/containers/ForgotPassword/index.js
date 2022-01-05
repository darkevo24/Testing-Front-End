import { useHistory } from 'react-router-dom';
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
    email: yup.string().email().required(),
  })
  .required();

const ForgotPassword = () => {
  const history = useHistory();

  const goBack = () => {
    history.push('/');
  };

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
      handleNotification('secondary', 'Berhasil, Silahkan Cek Email Anda Untuk Melanjutkan Perubahan Password', 'check');
    } catch (e) {
      console.log(e);
      handleNotification('secondary', 'Gagal, Email/Akun Tidak Valid', 'cross');
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
      email: data.email,
    };
    handleAPICall(post, `${apiUrls.requestForgotPassword}`, { data: obj });
  };

  return (
    <Row className="change-password">
      <button className="back-chevron" onClick={goBack}>
        <LeftChevron />
      </button>
      <Col md={4} className="form-change-password">
        <div className="sdp-heading">Lupa Password</div>
        <label className="pb-30 pt-8">
          Masukan alamat email anda yang terdaftar, kami akan mengirimkan kode verifikasi untuk atur ulang password anda.
        </label>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-15">
            <Form.Label>Alamat Email</Form.Label>
            <Input
              name="email"
              control={control}
              rules={{ required: true }}
              type="email"
              error={errors.email?.message}
              className="mt-0"
            />
          </Form.Group>
          <Button type="submit" className="change-btn">
            Konfirmasi
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

export default ForgotPassword;
