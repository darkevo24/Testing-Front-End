import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, FileInput, TextEditor } from 'components';
import MultiSelectDropDown from 'components/DropDown/MultiSelectDropDown';
import SingleSelectDropdown from 'components/DropDown/SingleSelectDropDown';
import { submitForm } from 'utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { apiUrls, post } from 'utils/request';
import { ComponentAccessibility } from 'components/ComponentAccess';
import { USER_ROLES } from 'utils/constants';
import { getListKategori, getListTagline, setNewTagline, kategoriSelector, taglineSelector } from 'containers/App/reducer';

export const beritaFormId = 'berita-form-id';
export const submitBeritaForm = submitForm(beritaFormId);

export const submitNewKategori = async (kategori) => {
  try {
    const param = {
      kode: 'BERITA',
      keterangan: kategori,
      idParent: null,
      status: true,
    };
    const response = await post(apiUrls.setting, param);
    return response;
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
};

export const getDate = (date) => {
  if (!date) {
    return '';
  }
  // handle format yyyy-mm-ddTHH:mm:ss
  if (date.indexOf('T') >= 0) {
    return date.split('T')[0];
  }

  // handle format yyyy-mm-dd HH:mm:ss
  return date.split(' ')[0];
};

export const getTime = (date) => {
  if (!date) {
    return '';
  }
  // handle format yyyy-mm-ddTHH:mm:ss
  if (date.indexOf('T') >= 0) {
    return date.split('T')[1].split(' ')[0].split('.')[0];
  }

  // handle format yyyy-mm-dd HH:mm:ss
  return date.split(' ')[1];
};

const schema = yup
  .object({
    judul: yup.string().required(),
    kategori: yup.mixed().required(),
    taglineId: yup.array().min(1, 'min 1 tagline is required').required(),
    mainImage: yup.mixed().required(),
    content: yup.string().min(10, 'too short for content').required(),
  })
  .required();

const CMSForm = ({ data, style, onSubmit, disabled = false }) => {
  const dispatch = useDispatch();
  const [listKategori, setListKategori] = useState([]);
  const { records: kategoriRecords } = useSelector(kategoriSelector);
  const { records: taglineRecords } = useSelector(taglineSelector);

  useEffect(() => {
    setListKategori(kategoriRecords);
  }, [kategoriRecords]);

  const createKategori = (data) => {
    setValue('kategori', { id: 'new', value: 'new', label: data });
    setListKategori([
      ...listKategori,
      {
        id: 'new',
        keterangan: data,
      },
    ]);
  };

  const createTagline = (data) => {
    dispatch(setNewTagline({ keterangan: data }))
      .then((res) => {
        let currentTag = getValues('taglineId') || [];
        currentTag.push({ value: res.payload.id, label: res.payload.keterangan });
        setValue('taglineId', currentTag);
      })
      .then(() => dispatch(getListTagline()));
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
      kategori: !data.kategori
        ? null
        : data.kategori.value
        ? data.kategori
        : {
            value: data.kategori,
            label: kategoriRecords.find((kategori) => kategori.id === data.kategori)?.keterangan,
          },
      taglineId: data.tagLineList?.map((tagline) => ({ label: tagline.keterangan, value: tagline.id })),
    },
  });

  useEffect(() => {
    dispatch(getListKategori('BERITA'));
    dispatch(getListTagline());
  }, []);

  const [foto, setFoto] = useState(null);
  const handleFoto = (file) => {
    // eslint-disable-next-line
    let fileName = file.name.replace(/[&\/\\#, +()$~%'":*?<>{}]/g, '');
    let blob = file;
    let newFile = new File([blob], fileName, { type: 'image/png' });
    setFoto(newFile);
  };
  const uploadFoto = async () => {
    try {
      let fotoFormData = new FormData();
      fotoFormData.append('file', foto);
      await post(apiUrls.uploadFoto, fotoFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        setValue('mainImage', res.data.location);
      });
    } catch (e) {
      setError('mainImage', {
        type: 'manual',
        message: e.error?.message,
      });
    }
  };

  useEffect(() => {
    if (foto !== null) {
      uploadFoto();
    }
  }, [foto]);

  useEffect(() => {
    console.log(getValues('taglineId'));
  }, [getValues('taglineId')]);

  const handleInputChange = (data) => {
    console.log('hi');
  };

  return (
    <Form id={beritaFormId} className="sdp-form" onSubmit={handleSubmit(onSubmit)} style={style}>
      {disabled ? (
        <img className="wpx-200 mb-3" src={data?.mainImage} alt="thumbnail" />
      ) : (
        <FileInput
          group
          label="Thumbnail *"
          name="mainImage"
          control={control}
          error={errors.mainImage?.message}
          uploadInfo="Upload Image (format .png, .jpeg, .jpg max. 512KB)"
          handleOnChange={handleFoto}
        />
      )}
      <Input group label="Judul" name="judul" control={control} disabled={disabled} error={errors.judul?.message} />
      <Form.Group className="mb-3">
        <Form.Label>Kategori *</Form.Label>
        <SingleSelectDropdown
          data={listKategori.map((kategori) => ({ id: kategori.id, value: kategori.id, label: kategori.keterangan }))}
          control={control}
          placeholder="Pilih Kategori"
          isCreatable={true}
          onCreateOption={createKategori}
          name="kategori"
          isDisabled={disabled}
          error={errors.kategori?.message}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tagline *</Form.Label>
        <MultiSelectDropDown
          data={taglineRecords?.map((tagline) => ({ label: tagline.keterangan, value: tagline.id }))}
          control={control}
          placeHolder="Pilih Tagline"
          isCreatable={true}
          onCreateOption={createTagline}
          name="taglineId"
          disabled={disabled}
          value={data}
          error={errors.taglineId?.message}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Isi Berita *</Form.Label>
        <TextEditor disabled={disabled} defaultValue={data.content} onChange={(e) => setValue('content', e)} />
        <div className="sdp-error">{errors.content?.message}</div>
      </Form.Group>
      <Input
        group
        label="No. Referensi ISSN"
        name="issn"
        control={control}
        rules={{ required: false }}
        error={errors.issn?.message}
        disabled={disabled}
      />
      <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Tanggal Publish</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setValue('publishDate', e.target.value)}
                defaultValue={getDate(data.publishDate)}
                disabled={disabled}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Jam Publish</Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setValue('publishTime', e.target.value)}
                defaultValue={getTime(data.publishDate)}
                disabled={disabled}
              />
            </Form.Group>
          </Col>
        </Row>
      </ComponentAccessibility>
      <Button className="invisible" type="submit" />
    </Form>
  );
};

export default CMSForm;
