import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, FileInput, TextEditor, RequiredFilledLabel } from 'components';
import MultiSelectDropDown from 'components/DropDown/MultiSelectDropDown';
import SingleSelectDropdown from 'components/DropDown/SingleSelectDropDown';
import { submitForm } from 'utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { apiUrls, post } from 'utils/request';
import { ComponentAccessibility } from 'components/ComponentAccess';
import { USER_ROLES } from 'utils/constants';
import { getListKategori, getListTagline, setNewTagline, kategoriSelector, taglineSelector } from 'containers/App/reducer';
import defaultIMageThumbnail from '../assets/default-thumbnail.png';
import defaultBanner from '../assets/defaultBannerLarge.jpg';

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
    mainImage: yup.mixed().required(),
    content: yup.mixed().required(),
  })
  .required();

const CMSKonfigurasiPortalForm = ({ data, style, onSubmit, disabled = false }) => {
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

  return (
    <Form id={beritaFormId} onSubmit={handleSubmit(onSubmit)} style={style}>
      <Row className="sdp-form mb-20">
        <Col>
          <h5>Logo Header</h5>
          <div className="groupInputImage">
            <div className="previewImage">
              <img src={defaultIMageThumbnail} />
              <p className="fileName">Logo1.png</p>
            </div>
            <Button variant="outline-info">Ubah Gambar</Button>
          </div>
        </Col>
        <Col className="mb-20">
          <h5>Logo Footer</h5>
          <div className="groupInputImage">
            <div className="previewImage">
              <img src={defaultIMageThumbnail} />
              <p className="fileName">Logo1.png</p>
            </div>
            <Button variant="outline-info">Ubah Gambar</Button>
          </div>
        </Col>
      </Row>

      <Row className="fullWidthForm">
        <Col>
          <h5>Logo Banner</h5>
          <div className="groupInputImage flex-columm">
            <div className="previewImage fullWidth">
              <img src={defaultBanner} />
            </div>
            <Button variant="outline-info">Ubah Gambar</Button>
          </div>
        </Col>
      </Row>

      <div className="sdp-form">
        <h5>Informasi</h5>
        <Input group label="Judul" name="judul" control={control} disabled={disabled} error={errors.judul?.message} />
        <Input
          groupClass="mb-16"
          groupProps={{
            md: 12,
            as: Col,
          }}
          labelClass="sdp-form-label fw-normal"
          group
          label="Nama Organisasi"
          error={errors?.linkAkses?.message}
          name="linkAkses"
          rightIcon="edit"
          control={control}
        />
        <Input
          groupClass="mb-16"
          groupProps={{
            md: 12,
            as: Col,
          }}
          labelClass="sdp-form-label fw-normal"
          group
          label="Alamat Organisasi"
          error={errors?.linkAkses?.message}
          name="linkAkses"
          rightIcon="edit"
          control={control}
        />
        <Input
          groupClass="mb-16"
          groupProps={{
            md: 12,
            as: Col,
          }}
          labelClass="sdp-form-label fw-normal"
          group
          label="No Telpepon"
          error={errors?.linkAkses?.message}
          name="linkAkses"
          rightIcon="edit"
          control={control}
        />
        <Input
          groupClass="mb-16"
          groupProps={{
            md: 12,
            as: Col,
          }}
          labelClass="sdp-form-label fw-normal"
          group
          label="No Fax"
          error={errors?.linkAkses?.message}
          name="linkAkses"
          rightIcon="edit"
          control={control}
        />
        <Input
          groupClass="mb-16"
          groupProps={{
            md: 12,
            as: Col,
          }}
          labelClass="sdp-form-label fw-normal"
          group
          error={errors?.linkAkses?.message}
          name="linkAkses"
          leftIcon="facebookSvg"
          rightIcon="edit"
          control={control}
        />
        <Input
          groupClass="mb-16"
          groupProps={{
            md: 12,
            as: Col,
          }}
          labelClass="sdp-form-label fw-normal"
          group
          error={errors?.linkAkses?.message}
          name="linkAkses"
          leftIcon="twitterSvg"
          rightIcon="edit"
          control={control}
        />
        <Input
          groupClass="mb-16"
          groupProps={{
            md: 12,
            as: Col,
          }}
          labelClass="sdp-form-label fw-normal"
          group
          error={errors?.linkAkses?.message}
          name="linkAkses"
          leftIcon="instgramSvg"
          rightIcon="edit"
          control={control}
        />
        <Input
          groupClass="mb-16"
          groupProps={{
            md: 12,
            as: Col,
          }}
          labelClass="sdp-form-label fw-normal"
          group
          error={errors?.linkAkses?.message}
          name="linkAkses"
          leftIcon="youtubeSvg"
          rightIcon="edit"
          control={control}
        />
      </div>
    </Form>
  );
};

export default CMSKonfigurasiPortalForm;
