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
import editIcon from '../components/Icons';
import { apiUrls, post } from 'utils/request';

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
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [noFax, setNoFax] = useState(null);
  const [namaOrganisasi, setNamaOrganisasi] = useState(null);
  const [alamatOrganisasi, setAlamatOrganisasi] = useState(null);
  const [facebookUrl, setFacebookUrl] = useState(null);
  const [instagramUrl, setInstagramUrl] = useState(null);
  const [twitterUrl, setTwitterUrl] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState(null);

  const inputLogoHeader = useRef(null);
  const inputLogoFooter = useRef(null);
  const inputBanner = useRef(null);
  const inputPhone = useRef(null);
  const inputNamaOrganisasi = useRef(null);
  const inputAlamatOrganisasi = useRef(null);
  const inputNoFax = useRef(null);
  const inputFacebookUrl = useRef(null);
  const inputInstagramUrl = useRef(null);
  const inputTwitterUrl = useRef(null);
  const inputYoutubeUrl = useRef(null);

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

  const savePhone = async () => {
    const params = {
      code: 'PHONE1',
      contentType: 'PHONE',
      content: inputPhone.current.value,
    };

    try {
      await post(apiUrls.konfigurasiPortal, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        setPhoneNumber(params.content);
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const saveNamaOrganisasi = async () => {
    const params = {
      code: 'NAMA-ORGANISASI',
      contentType: 'TEXT',
      content: inputNamaOrganisasi.current.value,
    };

    try {
      await post(apiUrls.konfigurasiPortal, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        setNamaOrganisasi(params.content);
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const saveAlamatOrganisasi = async () => {
    const params = {
      code: 'ALAMAT-ORGANISASI',
      contentType: 'TEXT',
      content: inputNamaOrganisasi.current.value,
    };

    try {
      await post(apiUrls.konfigurasiPortal, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        setAlamatOrganisasi(inputAlamatOrganisasi.content);
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const saveNoFax = async () => {
    const params = {
      code: 'NO-FAX',
      contentType: 'TEXT',
      content: inputNoFax.current.value,
    };

    try {
      await post(apiUrls.konfigurasiPortal, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        setNoFax(params.content);
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const saveFaceBookUrl = async () => {
    const params = {
      code: 'FACEBOOK-URL',
      contentType: 'TEXT',
      content: inputFacebookUrl.current.value,
    };

    try {
      await post(apiUrls.konfigurasiPortal, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        setFacebookUrl(params.content);
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const saveTwitterUrl = async () => {
    const params = {
      code: 'TWITTER-URL',
      contentType: 'TEXT',
      content: inputTwitterUrl.current.value,
    };

    try {
      await post(apiUrls.konfigurasiPortal, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        setTwitterUrl(params.content);
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const saveInstagramUrl = async () => {
    const params = {
      code: 'INSTAGRAM-URL',
      contentType: 'TEXT',
      content: inputInstagramUrl.current.value,
    };

    try {
      await post(apiUrls.konfigurasiPortal, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        setInstagramUrl(params.content);
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const saveYoutubeUrl = async () => {
    const params = {
      code: 'YOUTUBE-URL',
      contentType: 'TEXT',
      content: inputYoutubeUrl.current.value,
    };

    try {
      await post(apiUrls.konfigurasiPortal, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        setYoutubeUrl(params.content);
      });
    } catch (e) {
      // console.log(e);
    }
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
        <Col>
          <input type="text" ref={inputNamaOrganisasi} placeholder="Nama organisasi" />
          <Button variant="outline-info" onClick={saveNamaOrganisasi}>
            save
          </Button>
        </Col>
        <Col>
          <input type="text" ref={inputAlamatOrganisasi} placeholder="alamat organisasi" />
          <Button variant="outline-info" onClick={saveAlamatOrganisasi}>
            save
          </Button>
        </Col>
        <Col>
          <input type="text" ref={inputPhone} placeholder="No Telepon" />
          <Button variant="outline-info" onClick={savePhone}>
            save
          </Button>
        </Col>
        <Col>
          <input type="text" ref={inputPhone} placeholder="no. Fax" />
          <Button variant="outline-info" onClick={saveNoFax}>
            save
          </Button>
        </Col>
        <Col>
          <input type="text" ref={inputFacebookUrl} placeholder="facebook" />
          <Button variant="outline-info" onClick={saveFaceBookUrl}>
            save
          </Button>
        </Col>
        <Col>
          <input type="text" ref={inputTwitterUrl} placeholder="twitter" />
          <Button variant="outline-info" onClick={saveTwitterUrl}>
            save
          </Button>
        </Col>
        <Col>
          <input type="text" ref={inputInstagramUrl} placeholder="instagram" />
          <Button variant="outline-info" onClick={saveInstagramUrl}>
            save
          </Button>
        </Col>
        <Col>
          <input type="text" ref={inputYoutubeUrl} placeholder="youtube" />
          <Button variant="outline-info" onClick={saveYoutubeUrl}>
            save
          </Button>
        </Col>

        {/* <Input
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
        /> */}
      </div>
    </Form>
  );
};

export default CMSKonfigurasiPortalForm;
