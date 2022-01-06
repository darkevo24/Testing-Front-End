import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import bn from 'utils/bemNames';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Input from 'components/Input';
import FileInput from 'components/FileInput';
import Dropdown from 'components/Dropdown';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { apiUrls, post } from 'utils/request';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { levelInstansi } from 'utils/constants';
import { Loader } from 'components';
import { updateInstansi, instansiDetailSelector, getInstansiDetail } from './reducer';
import FormHeader from './FormHeader';
const schema = yup
  .object({
    logo: yup.mixed().notRequired(),
    kode: yup.string().required(),
    nama: yup.string().required(),
    level: yup.mixed().required(),
  })
  .required();

const bem = bn('instansi-data-new');
const EditInstansi = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const { content } = useSelector(instansiDetailSelector);
  const data = useMemo(() => content || {}, [content]);

  const fetchDetail = () => {
    dispatch(getInstansiDetail(id));
  };
  useEffect(() => {
    fetchDetail();
  }, []);
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
    defaultValues: {
      ...data,
    },
  });
  const handleBack = () => {
    reset();
    history.push(`/cms/instansi/${id}`);
  };

  const handleEdit = async (data) => {
    const { kode, nama, logo } = data;
    const obj = {
      id,
      payload: {
        kode,
        nama,
        logo,
        level: data.level.value,
      },
    };
    setLoading(true);
    dispatch(updateInstansi(obj))
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
      <FormHeader onBatalClick={handleBack} onHandleSubmitForm={handleSubmit(handleEdit)} />

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
              defaultValues={levelInstansi.find((level) => level.value === data.level)}
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

export default EditInstansi;
