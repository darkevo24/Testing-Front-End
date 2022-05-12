import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from 'components';
import { useDispatch } from 'react-redux';
import defaultIMageThumbnail from '../assets/default-thumbnail.png';
import defaultBanner from '../assets/defaultBannerLarge.jpg';

const schema = yup
  .object({
    judul: yup.string().required(),
    kategori: yup.mixed().required(),
    mainImage: yup.mixed().required(),
    content: yup.mixed().required(),
  })
  .required();

const CMSKonfigurasiPortalForm = ({ data, style }) => {
  const dispatch = useDispatch();
  const [errorInfo, setErrorInfo] = useState({});
  const [logoHeader, setLogoHeader] = useState(null);
  const [logoHeaderName, setLogoHeaderName] = useState(null);
  const [logoFooter, setLogoFooter] = useState(null);
  const [logoFooterName, setLogoFooterName] = useState(null);
  const [imageBanner, setImageBanner] = useState(null);

  const inputLogoHeader = useRef(null);
  const inputLogoFooter = useRef(null);
  const inputBanner = useRef(null);

  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  const handleLogoHeaderFiles = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = function () {
      setLogoHeader(reader.result);
      setLogoHeaderName(file.target.files[0].name);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const handleLogoFooterFiles = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = function () {
      setLogoFooter(reader.result);
      setLogoFooterName(file.target.files[0].name);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const handleBannerFiles = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = function () {
      setImageBanner(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const triggerLogoHeaderClick = () => {
    inputLogoHeader.current.click();
  };

  const triggerLogoFooterClick = () => {
    inputLogoFooter.current.click();
  };

  const triggerBannerFileClick = () => {
    inputBanner.current.click();
  };

  const savePhone = (phone) => {
    const phoneParam = {
      code: 'PHONE1',
      contentType: 'PHONE',
      content: phone,
    };
    console.log(phoneParam);
  };

  return (
    <Form style={style}>
      <Row className="sdp-form mb-20">
        <Col>
          <h5>Logo Header</h5>
          <div className="groupInputImage">
            <div className="previewImage">
              <div style={{ display: 'none' }}>
                <input type="file" ref={inputLogoHeader} onChange={handleLogoHeaderFiles} />
              </div>
              <img src={logoHeader ? logoHeader : defaultIMageThumbnail} />
              <p className="fileName">{logoHeaderName}</p>
            </div>
            <Button variant="outline-info" onClick={triggerLogoHeaderClick}>
              Ubah Gambar
            </Button>
          </div>
        </Col>
        <Col className="mb-20">
          <h5>Logo Footer</h5>
          <div className="groupInputImage">
            <div className="previewImage">
              <div style={{ display: 'none' }}>
                <input type="file" ref={inputLogoFooter} onChange={handleLogoFooterFiles} />
              </div>
              <img src={logoFooter ? logoFooter : defaultIMageThumbnail} />
              <p className="fileName">{logoFooterName}</p>
            </div>
            <Button variant="outline-info" onClick={triggerLogoFooterClick}>
              Ubah Gambar
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="fullWidthForm">
        <Col>
          <h5>Logo Banner</h5>
          <div className="groupInputImage flex-columm">
            <div className="previewImage fullWidth">
              <div style={{ display: 'none' }}>
                <input type="file" ref={inputBanner} onChange={handleBannerFiles} />
              </div>
              <img src={imageBanner ? imageBanner : defaultBanner} />
            </div>
            <Button variant="outline-info" onClick={triggerBannerFileClick}>
              Ubah Gambar
            </Button>
          </div>
        </Col>
      </Row>

      <div className="sdp-form">
        <h5>Informasi</h5>
        <Input
          groupClass="mb-16"
          groupProps={{
            md: 12,
            as: Col,
          }}
          labelClass="sdp-form-label fw-normal"
          group
          label="Nama Organisasi"
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
          rightIcon="edit"
          onChange={savePhone}
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
          leftIcon="youtubeSvg"
          rightIcon="edit"
          control={control}
        />
      </div>
    </Form>
  );
};

export default CMSKonfigurasiPortalForm;
