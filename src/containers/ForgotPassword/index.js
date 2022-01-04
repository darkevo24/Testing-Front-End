import { useState, useEffect } from 'react';
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
  const [timeLeft, setTimeLeft] = useState(20);

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

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  const convertTime = (timeLeft) => {
    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor(timeLeft / 60) - hours * 60;
    let seconds = parseFloat(timeLeft % 60).toFixed(0);
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
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
      {/* <div className="form-change-password">
        <div className="sdp-heading">Verifikasi</div>
        <label className="pb-30 pt-8">
          Kami telah mengirimkan 6-digit kode verifikasi ke email anda
          <span className={`${timeLeft && 'sdp-text-blue'} fw-bold`}> ***re@deltadatamandiri.com. </span> Mohon periksa email
          anda.
        </label>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-15">
            <div className="d-flex justify-content-between">
              <Form.Label>Kode OTP</Form.Label>
              {timeLeft ? (
                <Form.Label>{convertTime(timeLeft)}</Form.Label>
              ) : (
                <span className="sdp-text-blue pointer" onClick={() => setTimeLeft(300)}>
                  Resend Code
                </span>
              )}
            </div>
            <Input
              name="kodeOtp"
              control={control}
              rules={{ required: true }}
              type="number"
              error={errors.text?.message}
              className="mt-0"
            />
          </Form.Group>
          <Button type="submit" className="change-btn">
            Konfirmasi
          </Button>
        </Form>
      </div> */}
    </Row>
  );
};

export default ForgotPassword;
