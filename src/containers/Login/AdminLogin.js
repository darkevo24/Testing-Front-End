import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './reducer';

import Logo from 'assets/logo-large.png';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const AdminLogin = () => {
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { error, loading } = useSelector((state) => state.auth);

  // TODO: handle actual submit of the form
  const onSubmit = (data) => dispatch(loginUser(data));

  return (
    <div className="login-container h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col sm={12} md={8} xl={4} className="login-form p-50 d-flex flex-column">
          <img className="logo align-self-center" src={Logo} alt="logo" />
          <div className="sdp-heading my-4">Sign In!</div>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Form.Control variant="floating" placeholder="Email Address" type="email" {...field} />}
            />
            <div className="sdp-error">{errors.email?.message}</div>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control variant="floating" type="password" placeholder="Password" className="mt-4" {...field} />
              )}
            />
            <div className="sdp-error">{errors.password?.message}</div>
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
