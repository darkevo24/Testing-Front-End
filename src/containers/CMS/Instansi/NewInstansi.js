import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { apiUrls, post } from 'utils/request';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { levelInstansi } from 'utils/constants';
import Input from 'components/Input';
import FileInput from 'components/FileInput';
import Dropdown from 'components/Dropdown';
import { Loader } from 'components';
import { createNewInstansi } from './reducer';
import FormHeader from './FormHeader';

const schema = yup
  .object({
    logo: yup.mixed().required(),
    kode: yup.string().required(),
    nama: yup.string().required(),
    level: yup.mixed().required(),
  })
  .required();

const NewInstansi = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleLogo = (file) => {
    const size = 512000;
    const type = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file?.size > size && type.includes(file?.type)) {
      return setError('image', {
        type: 'manual',
        message: 'Only PNG, JPEG e JPG with Max 512Kb',
      });
    }
    // eslint-disable-next-line
    let fileName = file.name.replace(/[&/\\#, +()$~%'":*?<>{}]/g, '');
    let newFile = new File([file], fileName, { type: 'image/png' });
    setLogo(newFile);
  };
  const uploadLogo = async () => {
    try {
      let logoFormData = new FormData();
      logoFormData.append('file', logo);
      await post(apiUrls.fileUpload, logoFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        setValue('logo', res.data);
      });
    } catch (e) {
      errors.logo.message = e?.error?.message;
    }
  };
  useEffect(() => {
    if (logo !== null) {
      uploadLogo();
    }
  }, [logo]);

  const {
    control,
    reset,
    setError,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleBack = () => {
    reset();
    history.push('/cms/instansi');
  };

  const hanldeCreateNewInstansi = async (data) => {
    const formInput = {
      ...data,
      level: data.level.value,
    };
    setLoading(true);
    dispatch(createNewInstansi({ payload: formInput }))
      .then(() => {
        setLoading(false);
        history.push('/cms/instansi');
      })
      .catch(() => {
        setLoading(false);
      });
    reset();
  };
  return (
    <div className="sdp-instansi">
      <FormHeader onBatalClick={handleBack} onHandleSubmitForm={handleSubmit(hanldeCreateNewInstansi)} />

      <Row>
        <Col sm={8} className="my-5">
          {loading && <Loader />}
          <Form className="sdp-form" noValidate>
            <Input group label="Kode Instansi " name="kode" control={control} error={errors.kode?.message} />
            <Input group label="Nama Instansi Permintaan data" name="nama" control={control} error={errors.nama?.message} />
            <Dropdown
              name="level"
              label="Level Instansi"
              control={control}
              placeholder="Pilih Level Instansi"
              options={levelInstansi.map((level) => ({
                value: level.value,
                label: level.label,
              }))}
              error={errors.level?.message}
            />
            <FileInput
              label={'Logo Instance'}
              name="logo"
              uploadInfo="Upload Image (format .png, .svg, 512KB)"
              control={control}
              handleOnChange={handleLogo}
              error={errors.image?.message}
            />
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default NewInstansi;
