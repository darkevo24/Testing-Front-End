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
import { CONTENT_TYPE, PORTAL_KONFIGURASI_CODE } from 'utils/constants';

const CMSKonfigurasiPortalForm = ({ data, style }) => {
  const dispatch = useDispatch();
  const { loading, records } = useSelector(konfiguasiPortalCmsListSelector);

  const [errorInfo, setErrorInfo] = useState({});
  const [logoHeader, setLogoHeader] = useState(null);
  // const [logoHeaderName, setLogoHeaderName] = useState(null);
  const [logoFooter, setLogoFooter] = useState(null);
  // const [logoFooterName, setLogoFooterName] = useState(null);
  const [imageBanner, setImageBanner] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [noFax, setNoFax] = useState(null);
  const [namaOrganisasi, setNamaOrganisasi] = useState(null);
  const [footerLink, setFooterLink] = useState(null);
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
  const inputFooterLink = useRef(null);
  const inputFacebookUrl = useRef(null);
  const inputInstagramUrl = useRef(null);
  const inputTwitterUrl = useRef(null);
  const inputYoutubeUrl = useRef(null);

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
    const getLogoHeader = getContent(PORTAL_KONFIGURASI_CODE.LOGO_HEADER);
    if (getLogoHeader.length > 0) {
      setLogoHeader(getLogoHeader[0]);
    }

    const getLogoFooter = getContent(PORTAL_KONFIGURASI_CODE.LOGO_FOOTER);
    if (getLogoFooter.length > 0) {
      setLogoFooter(getLogoFooter[0]);
    }

    const getBanner = getContent(PORTAL_KONFIGURASI_CODE.BANNER);
    if (getBanner.length > 0) {
      setImageBanner(getBanner[0]);
    }

    const getNoTelpon = getContent(PORTAL_KONFIGURASI_CODE.NO_TELEPON);
    if (getNoTelpon.length > 0) {
      inputPhone.current.value = getNoTelpon[0]?.content?.value;
      setPhoneNumber(getNoTelpon[0]);
    }

    const getNoFax = getContent(PORTAL_KONFIGURASI_CODE.NO_FAX);
    if (getNoFax.length > 0) {
      inputNoFax.current.value = getNoFax[0]?.content?.value;
      setNoFax(getNoFax[0]);
    }

    const getFooterLink = getContent(PORTAL_KONFIGURASI_CODE.FOOTERLINK);
    if (getFooterLink.length > 0) {
      inputFooterLink.current.value = getFooterLink[0]?.content?.value;
      setFooterLink(getFooterLink[0]);
    }

    const getNamaOrganisasi = getContent(PORTAL_KONFIGURASI_CODE.NAMA_ORAGNISASI);
    if (getNamaOrganisasi.length > 0) {
      inputNamaOrganisasi.current.value = getNamaOrganisasi[0]?.content?.value;
      setNamaOrganisasi(getNamaOrganisasi[0]);
    }

    const getAlamatOrganisasi = getContent(PORTAL_KONFIGURASI_CODE.ALAMAT_ORAGNISASI);
    if (getAlamatOrganisasi.length > 0) {
      inputAlamatOrganisasi.current.value = getAlamatOrganisasi[0]?.content?.value;
      setAlamatOrganisasi(getAlamatOrganisasi[0]);
    }

    const getFacebookUrl = getContent(PORTAL_KONFIGURASI_CODE.FACEBOOK_URL);
    if (getFacebookUrl.length > 0) {
      inputFacebookUrl.current.value = getFacebookUrl[0]?.content?.url;
      setFacebookUrl(getFacebookUrl[0]);
    }

    const getTwitterUrl = getContent(PORTAL_KONFIGURASI_CODE.TWITTER_URL);
    if (getTwitterUrl.length > 0) {
      inputTwitterUrl.current.value = getTwitterUrl[0]?.content?.url;
      setTwitterUrl(getTwitterUrl[0]);
    }

    const getInstagramUrl = getContent(PORTAL_KONFIGURASI_CODE.INSTAGRAM_URL);
    if (getInstagramUrl.length > 0) {
      inputInstagramUrl.current.value = getInstagramUrl[0]?.content?.url;
      setInstagramUrl(getInstagramUrl[0]);
    }

    const getYoutubeUrl = getContent(PORTAL_KONFIGURASI_CODE.YOUTUBE_URL);
    if (getYoutubeUrl.length > 0) {
      inputYoutubeUrl.current.value = getYoutubeUrl[0]?.content?.url;
      setYoutubeUrl(getYoutubeUrl[0]);
    }
  };

  const handleLogoHeaderFiles = (file) => {
    file = file.target.files[0];
    const size = 512000;
    const type = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file?.size > size && type.includes(file?.type)) {
      return setErrorInfo('image', {
        type: 'manual',
        message: 'Only PNG, JPEG e JPG with Max 512Kb',
      });
    }
    // eslint-disable-next-line
    let fileName = file.name.replace(/[&/\\#, +()$~%'":*?<>{}]/g, '');
    let newFile = new File([file], fileName, { type: 'image/png' });
    saveImage(PORTAL_KONFIGURASI_CODE.LOGO_HEADER, newFile);
  };

  const handleLogoFooterFiles = (file) => {
    file = file.target.files[0];
    const size = 512000;
    const type = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file?.size > size && type.includes(file?.type)) {
      return setErrorInfo('image', {
        type: 'manual',
        message: 'Only PNG, JPEG e JPG with Max 512Kb',
      });
    }
    // eslint-disable-next-line
    let fileName = file.name.replace(/[&/\\#, +()$~%'":*?<>{}]/g, '');
    let newFile = new File([file], fileName, { type: 'image/png' });
    saveImage(PORTAL_KONFIGURASI_CODE.LOGO_FOOTER, newFile);
  };

  const handleBannerFiles = async (file) => {
    file = file.target.files[0];
    const size = 512000;
    const type = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file?.size > size && type.includes(file?.type)) {
      return setErrorInfo('image', {
        type: 'manual',
        message: 'Only PNG, JPEG e JPG with Max 512Kb',
      });
    }
    // eslint-disable-next-line
    let fileName = file.name.replace(/[&/\\#, +()$~%'":*?<>{}]/g, '');
    let newFile = new File([file], fileName, { type: 'image/png' });
    saveImage(PORTAL_KONFIGURASI_CODE.BANNER, newFile);
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

  const saveImage = async (imageCode, fileUpload) => {
    var data = new FormData();
    data.append('file', fileUpload);

    try {
      const apiUrl = apiUrls.uploadFoto;
      await post(apiUrl, data, { headers: { 'Content-Type': undefined } }).then((res) => {
        switch (imageCode) {
          case PORTAL_KONFIGURASI_CODE.LOGO_HEADER:
            saveLogoHeader(res?.data?.location);
            break;
          case PORTAL_KONFIGURASI_CODE.LOGO_FOOTER:
            saveLogoFooter(res?.data?.location);
            break;
          case PORTAL_KONFIGURASI_CODE.BANNER:
            saveBanner(res?.data?.location);
            break;
          default:
            break;
        }
      });
    } catch (e) {
      // console.log(e);
    }
  };

  const saveLogoHeader = async (imageUrl) => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.LOGO_HEADER,
      contentType: CONTENT_TYPE.IMAGE,
      content: {
        url: imageUrl,
      },
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = logoHeader ? apiUrl.concat('/' + logoHeader?.id) : apiUrls.konfigurasiPortal;
      if (logoHeader?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setLogoHeader(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setLogoHeader(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveLogoFooter = async (imageUrl) => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.LOGO_FOOTER,
      contentType: CONTENT_TYPE.IMAGE,
      content: {
        url: imageUrl,
      },
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = logoFooter ? apiUrl.concat('/' + logoFooter?.id) : apiUrls.konfigurasiPortal;
      if (logoFooter?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setLogoFooter(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setLogoFooter(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveBanner = async (imageUrl) => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.BANNER,
      contentType: CONTENT_TYPE.IMAGE,
      content: {
        url: imageUrl,
      },
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = imageBanner ? apiUrl.concat('/' + imageBanner?.id) : apiUrls.konfigurasiPortal;
      if (imageBanner?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setImageBanner(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setImageBanner(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const savePhone = async () => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.NO_TELEPON,
      contentType: CONTENT_TYPE.PHONE,
      content: {
        value: inputPhone.current.value,
      },
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = phoneNumber ? apiUrl.concat('/' + phoneNumber?.id) : apiUrls.konfigurasiPortal;
      if (phoneNumber?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setPhoneNumber(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setPhoneNumber(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveNamaOrganisasi = async () => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.NAMA_ORAGNISASI,
      contentType: CONTENT_TYPE.TEXT,
      content: {
        value: inputNamaOrganisasi.current.value,
      },
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = namaOrganisasi ? apiUrl.concat('/' + namaOrganisasi?.id) : apiUrls.konfigurasiPortal;
      if (namaOrganisasi?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setNamaOrganisasi(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setNamaOrganisasi(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveAlamatOrganisasi = async () => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.ALAMAT_ORAGNISASI,
      contentType: CONTENT_TYPE.TEXT,
      content: {
        value: inputAlamatOrganisasi.current.value,
      },
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = alamatOrganisasi ? apiUrl.concat('/' + alamatOrganisasi?.id) : apiUrls.konfigurasiPortal;
      if (alamatOrganisasi?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setAlamatOrganisasi(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setAlamatOrganisasi(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveFooterLink = async () => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.FOOTERLINK,
      contentType: CONTENT_TYPE.TEXT,
      content: {
        value: inputFooterLink.current.value,
      },
    };

    try {
      const url = footerLink ? apiUrls.konfigurasiPortal + '/' + footerLink?.id : apiUrls.konfigurasiPortal;
      if (footerLink?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setFooterLink(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setFooterLink(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveNoFax = async () => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.NO_FAX,
      contentType: CONTENT_TYPE.FAX,
      content: {
        value: inputNoFax.current.value,
      },
    };

    try {
      const url = noFax ? apiUrls.konfigurasiPortal.concat('/' + noFax?.id) : apiUrls.konfigurasiPortal;
      if (noFax?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setNoFax(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setNoFax(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveFaceBookUrl = async () => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.FACEBOOK_URL,
      contentType: CONTENT_TYPE.SOCIALMEDIA,
      content: {
        url: inputFacebookUrl.current.value,
      },
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = facebookUrl ? apiUrl.concat('/' + facebookUrl?.id) : apiUrls.konfigurasiPortal;
      if (facebookUrl?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setFacebookUrl(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setFacebookUrl(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveTwitterUrl = async () => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.TWITTER_URL,
      contentType: CONTENT_TYPE.SOCIALMEDIA,
      content: {
        url: inputTwitterUrl.current.value,
      },
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = twitterUrl ? apiUrl.concat('/' + twitterUrl?.id) : apiUrls.konfigurasiPortal;
      if (twitterUrl?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setTwitterUrl(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setTwitterUrl(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveInstagramUrl = async () => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.INSTAGRAM_URL,
      contentType: CONTENT_TYPE.SOCIALMEDIA,
      content: {
        url: inputInstagramUrl.current.value,
      },
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = instagramUrl ? apiUrl.concat('/' + instagramUrl?.id) : apiUrls.konfigurasiPortal;
      if (instagramUrl?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setInstagramUrl(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setInstagramUrl(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const saveYoutubeUrl = async () => {
    const params = {
      code: PORTAL_KONFIGURASI_CODE.YOUTUBE_URL,
      contentType: CONTENT_TYPE.SOCIALMEDIA,
      content: {
        url: inputYoutubeUrl.current.value,
      },
    };

    try {
      const apiUrl = apiUrls.konfigurasiPortal;
      const url = youtubeUrl ? apiUrl.concat('/' + youtubeUrl?.id) : apiUrls.konfigurasiPortal;
      if (youtubeUrl?.id) {
        await put(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setYoutubeUrl(res?.data?.content);
        });
      } else {
        await post(url, params, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
          setYoutubeUrl(res?.data?.content);
        });
      }
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <Form style={style}>
      <Row className="sdp-form mb-20">
        <Col>
          <h5>Logo Header</h5>
          <div className="group-input-image">
            <div className="preview-image">
              <div style={{ display: 'none' }}>
                <input type="file" ref={inputLogoHeader} onChange={handleLogoHeaderFiles} />
              </div>
              <img src={logoHeader ? logoHeader?.content?.url : defaultIMageThumbnail} />
              {/* <p className="file-name">{logoHeaderName}</p> */}
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
              <img src={logoFooter ? logoFooter?.content?.url : defaultIMageThumbnail} />
              {/* <p className="file-name">{logoFooterName}</p> */}
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
              <img src={imageBanner ? imageBanner?.content?.url : defaultBanner} />
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
          <label>Footer Link</label>
          <div className="input-group-inline">
            <input type="text" ref={inputFooterLink} placeholder="Footer Link" />
            <Button variant="outline-dark" onClick={saveFooterLink}>
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
