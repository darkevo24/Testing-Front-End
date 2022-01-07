import { useState, useMemo, useEffect } from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Input from 'components/Input';
import { Loader } from 'components';
import Notification from 'components/Notification';
import { updateUnitKerja, instansiUnitKejiraDetailSelector, getUnitKerjaDetail } from '../reducer';
import FormHeader from '../FormHeader';

const schema = yup
  .object({
    kode: yup.string().required(),
    nama: yup.string().required(),
  })
  .required();

const EditUnitKerja = () => {
  const { id, unitId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { content } = useSelector(instansiUnitKejiraDetailSelector);
  const data = useMemo(() => content || {}, [content]);
  const fetchDetail = () => {
    dispatch(getUnitKerjaDetail({ id, unitId }));
  };
  useEffect(() => {
    fetchDetail();
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });
  const [loading, setLoading] = useState(false);
  const handleSubmitForm = (data) => {
    setLoading(true);
    const inputData = {
      id,
      unitId,
      payload: {
        ...data,
      },
    };
    dispatch(updateUnitKerja(inputData))
      .then((_res) => {
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
  };
  const handleBatal = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div className="sdp-instansi">
      <FormHeader onBatalClick={handleBatal} onHandleSubmitForm={handleSubmit(handleSubmitForm)} />
      <Row>
        <Col sm={8} className="my-5">
          {loading && <Loader />}
          <Form className="sdp-form" noValidate>
            <Input group label="Kode Unit Kerja " name="kode" control={control} error={errors.kode?.message} />
            <Input group label="Nama Unit Kerja" name="nama" control={control} error={errors.nama?.message} />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditUnitKerja;
