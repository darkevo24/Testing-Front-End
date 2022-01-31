import { useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormCheck from 'react-bootstrap/FormCheck';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Notification from 'components/Notification';
import { acceptTermAndCondition } from 'containers/App/reducer';
import { recaptchaSiteKey } from 'utils/constants';
import Logo from 'assets/logo-large.png';
import { validateReCaptcha } from './reducer';

const TermAndCondition = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const reCaptchaRef = useRef();
  const [agree, setAgree] = useState(false);
  const [validated, setValidated] = useState(false);
  const [captchaValue, setRecaptchaValue] = useState(null);
  const handleChange = (value) => {
    setRecaptchaValue(value);
    setValidated(!!value);
  };

  const handleCheckBox = (evt) => {
    const { checked } = evt.target;
    setAgree(checked);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (captchaValue) {
      const data = {
        response: captchaValue,
      };
      dispatch(validateReCaptcha({ payload: data })).then((res) => {
        if (res.data.status === 'SUCCESS') {
          dispatch(acceptTermAndCondition());
          history.push('/');
        } else {
          Notification.show({
            type: 'secondary',
            message: <div> {'Permintaan Data Gagal Diproses '}</div>,
            icon: 'cross',
          });
        }
      });
    }
  };

  return (
    <div className="login-container h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col sm={12} md={8} xl={4} className="login-form p-50 d-flex flex-column">
          <img className="logo align-self-center" src={Logo} alt="logo" />
          <div className="mt-20">
            <FormCheck type="checkbox" label="Accept Terms & Conditions" onChange={handleCheckBox} />
            <ReCAPTCHA theme="dark" ref={reCaptchaRef} sitekey={recaptchaSiteKey} onChange={handleChange} />
            <Button disabled={!(agree && validated)} className="mt-48 px-32 float-end fw-bold" onClick={handleSubmit}>
              Finish
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TermAndCondition;
