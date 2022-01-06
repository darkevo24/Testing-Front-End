import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Input from 'components/Input';
import { Loader } from 'components';
import Notification from 'components/Notification';
import { postUnitKerja } from '../reducer';
import FormHeader from '../FormHeader';

const schema = yup
  .object({
    kode: yup.string().required(),
    nama: yup.string().required(),
  })
  .required();

const NewUnitKerja = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const handleSubmitForm = (data) => {
    setLoading(true);
    const inputData = {
      id,
      payload: {
        ...data,
      },
    };
    dispatch(postUnitKerja(inputData))
      .then((res) => {
        setLoading(false);
        history.goBack();
      })
      .catch((err) => {
        setLoading(false);
        Notification.show({
          type: 'secondary',
          message: <div> {err.message ? err.message : 'Permintaan Data Gagal Diproses '}</div>,
          icon: 'cross',
        });
      });
    reset();
  };
  const handleBatal = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div className="sdp-instansi">
      {loading && <Loader />}
      <FormHeader onBatalClick={handleBatal} onHandleSubmitForm={handleSubmit(handleSubmitForm)} />
      <Row>
        <Col sm={8} className="my-5">
          <Form className="sdp-form">
            <Input group label="Kode Unit Kerja " name="kode" control={control} error={errors.kode?.message} />
            <Input group label="Nama Unit Kerja" name="nama" control={control} error={errors.nama?.message} />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default NewUnitKerja;
