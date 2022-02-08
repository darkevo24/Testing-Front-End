import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from 'components/Input';
import Notification from 'components/Notification';
import Loader from 'components/Loader';
import { ReactComponent as Arrow } from 'assets/arrow-left-add.svg';
import { ReactComponent as Union } from 'assets/union.svg';
import bn from 'utils/bemNames';
import { createMagmentApi } from './reducer';

const bem = bn('management-api');

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    sourceApi: yup.string().required(),
  })
  .required();
const FormApi = () => {
  const [loading, setLoading] = useState(false);
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

  const handleSubmitForm = (data) => {
    setLoading(true);
    const inputData = {
      payload: {
        ...data,
      },
    };
    dispatch(createMagmentApi(inputData)).then((res) => {
      if (res.payload) {
        setLoading(false);
        history.goBack();
        reset();
      } else {
        Notification.show({
          type: 'secondary',
          message: <div> {'Permintaan Data Gagal Diproses '}</div>,
          icon: 'cross',
        });
        setLoading(false);
      }
    });
  };

  return (
    <div className="sdp-management-api add">
      <div className="container">
        <div className={bem.e('header-add')}>
          <div className="header-left">
            <Arrow onClick={() => history.push('/api')} />
            <p> Tambah Api </p>
          </div>

          <div className="header-right">
            <Button variant="secondary" className="mr-10">
              Batal
            </Button>
            <Button variant="info" onClick={handleSubmit(handleSubmitForm)}>
              Simpan
            </Button>
          </div>
        </div>
        <div className={bem.e('wrapper-input')}>
          {loading && <Loader />}
          <Form>
            <div className="form-group">
              <label htmlFor="Judul">
                <div className="wrapper-union">
                  <p> Judul </p> <Union />
                  <div className="wrapper-desc"> Judul API yang akan disesuaikan dengan field DCAT. </div>
                </div>
              </label>
              <Input group name="title" control={control} error={errors.title?.message} />
            </div>
            <div className="form-group">
              <label htmlFor="Judul">
                <div className="wrapper-union">
                  <p> Deskripsi </p> <Union />
                  <div className="wrapper-desc"> Deskripsi API, penjelasan mengenai data yang akan diintegrasikan. </div>
                </div>
              </label>
              <Input group name="description" control={control} error={errors.description?.message} />
            </div>
            <div className="form-group">
              <label htmlFor="Judul">
                <div className="wrapper-union">
                  <p> Source API </p> <Union />
                  <div className="wrapper-desc"> URL link endpoint json </div>
                </div>
              </label>
              <Input group name="sourceApi" control={control} error={errors.sourceApi?.message} />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FormApi;
