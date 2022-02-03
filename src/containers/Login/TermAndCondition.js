import { useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormCheck from 'react-bootstrap/FormCheck';
import { useDispatch } from 'react-redux';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ReCAPTCHA from 'react-google-recaptcha';
import Notification from 'components/Notification';
import bn from 'utils/bemNames';
import Modal from 'react-bootstrap/Modal';
import { recaptchaSiteKey } from 'utils/constants';
import Logo from 'assets/logo-large.png';
import { validateReCaptcha, acceptTermAndCondition } from './reducer';
import TermAndConditionData from './termAndConditionData';
import { cookieKeys, getCookieByName } from 'utils/cookie';

const bem = bn('bimtek-dokumentasi');

const TermAndCondition = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [agree, setAgree] = useState(false);
  const [validated, setValidated] = useState(false);
  const [captchaValue, setRecaptchaValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const isRecaptchaEnabled = getCookieByName(cookieKeys.isRecaptchaEnabled);
  const reCaptchaRef = useRef();

  const handleCheckBox = (evt) => {
    const { checked } = evt.target;
    handleModalOpen();
    setAgree(checked);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isRecaptchaEnabled) {
      if (captchaValue && agree) {
        const data = {
          response: captchaValue,
        };

        dispatch(validateReCaptcha({ payload: data })).then((res) => {
          if (res?.status === 'SUCCESS') {
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
    } else {
      if (agree) {
        dispatch(acceptTermAndCondition());
        history.push('/');
      }
    }
  };

  const handleChange = (value) => {
    setRecaptchaValue(value);
    setValidated(!!value);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };
  const haldeModalClose = () => {
    setShowModal(false);
  };
  const onCancel = () => {
    setAgree(false);
    setRecaptchaValue(false);
    haldeModalClose();
  };

  const onAgree = () => {
    setAgree(true);
    haldeModalClose();
  };

  const displayListItem = (listItem) => {
    return listItem.map((item, index) => (
      <div key={index}>
        <span>{`${index + 1}) ${item}`}</span>
      </div>
    ));
  };

  return (
    <div className="login-container h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col sm={12} md={8} xl={4} className="login-form p-50 d-flex flex-column">
          <img className="logo align-self-center" src={Logo} alt="logo" />
          <div className="mt-20">
            <FormCheck type="checkbox" label="Accept Terms & Conditions" onChange={handleCheckBox} />
            {isRecaptchaEnabled && (
              <ReCAPTCHA theme="dark" ref={reCaptchaRef} sitekey={recaptchaSiteKey} onChange={handleChange} />
            )}
            <Button
              disabled={isRecaptchaEnabled ? !(agree && validated) : !agree}
              className="mt-48 px-32 float-end fw-bold"
              onClick={handleSubmit}>
              Finish
            </Button>
          </div>
        </Col>
      </Row>
      <Modal show={showModal} dialogClassName={bem.e('modal')}>
        <Modal.Header className="p-0 position-relative mw-100 w-100 justify-content-center mt-20">
          <h3>Syarat & Ketentuan</h3>
        </Modal.Header>

        <Modal.Body>
          {TermAndConditionData.map((termAndContion, index) => (
            <secion key={index}>
              <div>
                <strong>{`${index + 1}. ${termAndContion.title}`}</strong>
                <p>{termAndContion.description}</p>
                {termAndContion.list && displayListItem(termAndContion.list)}
              </div>
            </secion>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button className="mr-10 w-112" variant="secondary" onClick={onCancel}>
            Tidak Setuju
          </Button>
          <Button className="ml-10 w-112" variant="info" onClick={onAgree}>
            Setuju
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TermAndCondition;
