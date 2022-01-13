import { useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Input from 'components/Input';
import { loginUser } from './reducer';

import Logo from 'assets/logo-large.png';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const AdminLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { error, loading } = useSelector((state) => state.auth);

  const onSubmit = (data) => dispatch(loginUser(data));

  return (
    <div className="login-container h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col sm={12} md={8} xl={4} className="login-form p-50 d-flex flex-column">
          <img className="logo align-self-center" src={Logo} alt="logo" />
          <div className="sdp-heading my-4">{t('auth.admin.title')}</div>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              name="email"
              control={control}
              rules={{ required: true }}
              variant="floating"
              placeholder={t('fields.email.placeholder')}
              type="email"
              error={errors.email?.message}
            />
            <Input
              name="password"
              control={control}
              rules={{ required: true }}
              variant="floating"
              placeholder={t('fields.password.placeholder')}
              type="password"
              error={errors.password?.message}
              className="mt-4"
            />
            <button className="forgot-password" type="button" onClick={() => history.push('/forgot-password')}>
              Lupa Password?
            </button>
            <div className="sdp-error">{error}</div>
            <Button disabled={loading} type="submit" className="mt-48 px-32 float-end fw-bold">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AdminLogin;
