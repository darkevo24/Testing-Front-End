import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import defaultIMageThumbnail from '../assets/default-thumbnail.png';
import defaultBanner from '../assets/defaultBannerLarge.jpg';
import { FacebookSvg, Edit, InstagramSvg, YoutubeSvg, TwitterSvg } from 'components/Icons';
import { apiUrls, post, put } from 'utils/request';

import { getListKonfigurasiPortal, konfiguasiPortalCmsListSelector } from 'containers/CMS/KonfigurasiPortal/reducer';

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
  const { loading, records } = useSelector(konfiguasiPortalCmsListSelector);

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

  const NAMA_ORAGNISASI = 'NAMA-ORGANISASI';
  const ALAMAT_ORAGNISASI = 'ALAMAT-ORGANISASI';
  const NO_TELEPON = 'NO-TELEPON';
  const NO_FAX = 'NO-FAX';
  const FACEBOOK_URL = 'FACEBOOK-URL';
  const INSTAGRAN_URL = 'INSTAGRAN-URL';
  const TWITTER_URL = 'TWITTER-URL';
  const YOUTUBE_URL = 'YOUTUBE-URL';

  useEffect(() => {
    return dispatch(getListKonfigurasiPortal());
  }, []);

  useEffect(() => {
    contentMap();
  }, [records]);

  const getContent = (code) => {
    return records.filter((dataContent) => dataContent?.code === code);
  };

  const contentMap = () => {
    const getNoTelpon = getContent(NO_TELEPON);
    if (getNoTelpon.length > 0) {
      inputPhone.current.value = getNoTelpon[0].content;
      setPhoneNumber(getNoTelpon[0]);
    }

    const getNoFax = getContent(NO_FAX);
    if (getNoFax.length > 0) {
      inputNoFax.current.value = getNoFax[0].content;
      setNoFax(getNoFax[0]);
    }

    const getNamaOrganisasi = getContent(NAMA_ORAGNISASI);
    if (getNamaOrganisasi.length > 0) {
      inputNamaOrganisasi.current.value = getNamaOrganisasi[0].content;
      setNamaOrganisasi(getNamaOrganisasi[0]);
    }

    const getAlamatOrganisasi = getContent(ALAMAT_ORAGNISASI);
    if (getAlamatOrganisasi.length > 0) {
      inputAlamatOrganisasi.current.value = getAlamatOrganisasi[0].content;
      setAlamatOrganisasi(getAlamatOrganisasi[0]);
    }

    const getFacebookUrl = getContent(YOUTUBE_URL);
    if (getFacebookUrl.length > 0) {
      inputFacebookUrl.current.value = getFacebookUrl[0].content;
      setFacebookUrl(getFacebookUrl[0]);
    }

    const getTwitterUrl = getContent(TWITTER_URL);
    if (getTwitterUrl.length > 0) {
      inputTwitterUrl.current.value = getTwitterUrl[0].content;
      setFacebookUrl(getTwitterUrl[0]);
    }

    const getInstagramUrl = getContent(INSTAGRAN_URL);
    if (getInstagramUrl.length > 0) {
      inputInstagramUrl.current.value = getInstagramUrl[0].content;
      setFacebookUrl(getInstagramUrl[0]);
    }

    const getYoutubeUrl = getContent(YOUTUBE_URL);
    if (getYoutubeUrl.length > 0) {
      inputYoutubeUrl.current.value = getYoutubeUrl[0].content;
      setYoutubeUrl(getYoutubeUrl[0]);
    }
  };

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
      code: NO_TELEPON,
      contentType: 'PHONE',
      content: inputPhone.current.value,
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = phoneNumber ? apiUrl.concat('/' + phoneNumber?.id) : apiUrls.konfigurasiPortal;
      if (phoneNumber?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setPhoneNumber(res?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setPhoneNumber(res?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveNamaOrganisasi = async () => {
    const params = {
      code: NAMA_ORAGNISASI,
      contentType: 'TEXT',
      content: inputNamaOrganisasi.current.value,
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = alamatOrganisasi ? apiUrl.concat('/' + alamatOrganisasi?.id) : apiUrls.konfigurasiPortal;
      if (namaOrganisasi?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setAlamatOrganisasi(res?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setAlamatOrganisasi(res?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveAlamatOrganisasi = async () => {
    const params = {
      code: ALAMAT_ORAGNISASI,
      contentType: 'TEXT',
      content: inputAlamatOrganisasi.current.value,
    };

    try {
      const url = alamatOrganisasi ? apiUrls.konfigurasiPortal + '/' + alamatOrganisasi?.id : apiUrls.konfigurasiPortal;
      if (alamatOrganisasi?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setAlamatOrganisasi(res?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setAlamatOrganisasi(res?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveNoFax = async () => {
    const params = {
      code: NO_FAX,
      contentType: 'TEXT',
      content: inputNoFax.current.value,
    };

    try {
      const url = noFax ? apiUrls.konfigurasiPortal.concat('/' + noFax?.id) : apiUrls.konfigurasiPortal;
      if (noFax?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setNoFax(res?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setNoFax(res?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveFaceBookUrl = async () => {
    const params = {
      code: FACEBOOK_URL,
      contentType: 'TEXT',
      content: inputFacebookUrl.current.value,
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = facebookUrl ? apiUrl.concat('/' + facebookUrl?.id) : apiUrls.konfigurasiPortal;
      if (facebookUrl?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setFacebookUrl(res?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setFacebookUrl(res?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveTwitterUrl = async () => {
    const params = {
      code: TWITTER_URL,
      contentType: 'TEXT',
      content: inputTwitterUrl.current.value,
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = twitterUrl ? apiUrl.concat('/' + twitterUrl?.id) : apiUrls.konfigurasiPortal;
      if (twitterUrl?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setTwitterUrl(res?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setTwitterUrl(res?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveInstagramUrl = async () => {
    const params = {
      code: INSTAGRAN_URL,
      contentType: 'TEXT',
      content: inputInstagramUrl.current.value,
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = instagramUrl ? apiUrl.concat('/' + instagramUrl?.id) : apiUrls.konfigurasiPortal;
      if (instagramUrl?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setInstagramUrl(res?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setInstagramUrl(res?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveYoutubeUrl = async () => {
    const params = {
      code: YOUTUBE_URL,
      contentType: 'TEXT',
      content: inputYoutubeUrl.current.value,
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = youtubeUrl ? apiUrl.concat('/' + youtubeUrl?.id) : apiUrls.konfigurasiPortal;
      if (youtubeUrl?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setYoutubeUrl(res?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setYoutubeUrl(res?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <Form style={style}>
      {console.log(records, 'records')}
      <Row className="sdp-form mb-20">
        <Col>
          <h5>Logo Header</h5>
          <div className="group-input-image">
            <div className="preview-image">
              <div style={{ display: 'none' }}>
                <input type="file" ref={inputLogoHeader} onChange={handleLogoHeaderFiles} />
              </div>
              <img src={logoHeader ? logoHeader : defaultIMageThumbnail} />
              <p className="file-name">{logoHeaderName}</p>
            </div>
            <Button variant="outline-info" onClick={triggerLogoHeaderClick}>
              Ubah Gambar
            </Button>
          </div>
        </Col>
        <Col className="mb-20">
          <h5>Logo Footer</h5>
          <div className="group-input-image">
            <div className="preview-image">
              <div style={{ display: 'none' }}>
                <input type="file" ref={inputLogoFooter} onChange={handleLogoFooterFiles} />
              </div>
              <img src={logoFooter ? logoFooter : defaultIMageThumbnail} />
              <p className="file-name">{logoFooterName}</p>
            </div>
            <Button variant="outline-info" onClick={triggerLogoFooterClick}>
              Ubah Gambar
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="full-width-form">
        <Col>
          <h5>Logo Banner</h5>
          <div className="group-input-image flex-columm">
            <div className="preview-image full-width">
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
          <label>Nama Organisasi</label>
          <div className="input-group-inline">
            <input type="text" ref={inputNamaOrganisasi} placeholder="Nama organisasi" />
            <Button variant="outline-dark" onClick={saveNamaOrganisasi}>
              <Edit></Edit>
            </Button>
          </div>
        </Col>
        <Col>
          <label>Alamat Organisasi</label>
          <div className="input-group-inline">
            <input type="text" ref={inputAlamatOrganisasi} placeholder="alamat organisasi" />
            <Button variant="outline-dark" onClick={saveAlamatOrganisasi}>
              <Edit></Edit>
            </Button>
          </div>
        </Col>
        <Col>
          <label>No. Telepon</label>
          <div className="input-group-inline">
            <input type="text" ref={inputPhone} placeholder="No Telepon" />
            <Button variant="outline-dark" onClick={savePhone}>
              <Edit></Edit>
            </Button>
          </div>
        </Col>
        <Col>
          <label>No. Fax</label>
          <div className="input-group-inline">
            <input type="text" ref={inputNoFax} placeholder="No. Fax" />
            <Button variant="outline-dark" onClick={saveNoFax}>
              <Edit></Edit>
            </Button>
          </div>
        </Col>
        <Col>
          <div className="input-group-inline">
            <div className="sicoal-media-icon">
              <FacebookSvg></FacebookSvg>
            </div>
            <input type="text" ref={inputFacebookUrl} placeholder="facebook" />
            <Button variant="outline-dark" onClick={saveFaceBookUrl}>
              <Edit></Edit>
            </Button>
          </div>
        </Col>
        <Col>
          <div className="input-group-inline">
            <div className="sicoal-media-icon">
              <TwitterSvg></TwitterSvg>
            </div>
            <input type="text" ref={inputTwitterUrl} placeholder="twitter" />
            <Button variant="outline-dark" onClick={saveTwitterUrl}>
              <Edit></Edit>
            </Button>
          </div>
        </Col>
        <Col>
          <div className="input-group-inline">
            <div className="sicoal-media-icon">
              <InstagramSvg></InstagramSvg>
            </div>
            <input type="text" ref={inputInstagramUrl} placeholder="instagram" />
            <Button variant="outline-dark" onClick={saveInstagramUrl}>
              <Edit></Edit>
            </Button>
          </div>
        </Col>
        <Col>
          <div className="input-group-inline">
            <div className="sicoal-media-icon">
              <YoutubeSvg></YoutubeSvg>
            </div>
            <input type="text" ref={inputYoutubeUrl} placeholder="youtube" />
            <Button variant="outline-dark" onClick={saveYoutubeUrl}>
              <Edit></Edit>
            </Button>
          </div>
        </Col>
      </div>
    </Form>
  );
};

export default CMSKonfigurasiPortalForm;
