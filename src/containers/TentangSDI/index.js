import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useSelector, useDispatch } from 'react-redux';

import Logo from 'assets/logo-satu-data-id.png';

import ContactUs from './form.js';
import TentangProfile from './profile.js';
import bn from 'utils/bemNames';
import cx from 'classnames';

import { getTentang } from './reducer';
import { useEffect } from 'react';
import { AboutUs } from 'services/CMS';

const bem = bn('tentang');

const TentangSDI = () => {
  let dispatch = useDispatch();
  let listContent = useSelector((state) => state.tentang.tentang_list);
  let componentState = useSelector((state) => state.tentang.status);
  useEffect(() => dispatch(getTentang()), []);

  let strukturOrganisasi = [
    {
      name: 'Oktorialdi, Ph.D',
      position: 'Kordinator SDI',
      url_photo: 'https://i.ibb.co/b1ZKBwW/Pak-Oktorialdi.jpg',
      level: 1,
    },
    {
      name: 'Hari Dwi Korianto, S.Kom, MSi',
      position: 'Sekretaris SDI',
      url_photo: 'https://i.ibb.co/R3crV3d/Pak-Hari2.jpg',
      level: 2,
    },
    {
      name: 'Ervan Maksum, ST, M.Sc,',
      position: 'Wakil Kordinator SDI',
      url_photo: 'https://i.ibb.co/nMkKYbJ/Pak-Ervan2.jpg',
      level: 2,
    },
  ];

  let arrayLevel = [];
  for (var i = 0; i < strukturOrganisasi.length; i++) {
    if (arrayLevel.indexOf(strukturOrganisasi[i].level) === -1) {
      arrayLevel.push(strukturOrganisasi[i].level);
    }
  }

  let bidangOperasional = [
    'Bidang Perencanaan, Analisis dan Pemanfaatan Data',
    'Bidang Tata Kelola',
    'Bidang Aplikasi dan Teknologi',
    'Bidang Hukum dan Kebijakan Publik',
    'Bidang Komunikasi',
  ];

  return (
    <div>
      <div className={bem.e('container')}>
        <div className={bem.e('logo')}>
          <img src={Logo} alt="" />
        </div>
        {listContent.map((data, key) => (
          <div key={key}>
            <iframe
              width="100%"
              height="500"
              title="sample"
              src={data.video_url}
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
            <div className="mt-5">
              <div className={cx(bem.e('title'), 'mb-3')}>{data.title}</div>
              <p className={bem.e('description')} dangerouslySetInnerHTML={{ __html: unescape(data.content) }}></p>
            </div>
          </div>
        ))}
        <div className="mt-100">
          <Row className="align-items-center mb-5">
            <Col>
              <div className={bem.e('red-line')}></div>
            </Col>
            <Col>
              <div className={cx(bem.e('title'), 'text-center')}>Struktur Organisasi</div>
            </Col>
            <Col>
              <div className={bem.e('red-line')}></div>
            </Col>
          </Row>
          {arrayLevel.map((level) => (
            <div className="text-center">
              {strukturOrganisasi
                .filter((item) => {
                  return item.level === level;
                })
                .map((item, key) => (
                  <TentangProfile name={item.name} position={item.position} urlPhoto={item.url_photo} />
                ))}
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Row className="align-items-center mb-5">
            <Col xs={3}>
              <div className={bem.e('title-sm')}>Bidang Operational</div>
            </Col>
            <Col>
              <div className={bem.e('grey-line')}></div>
            </Col>
          </Row>
          <div className="d-flex flex-wrap">
            {bidangOperasional.map((item, key) => (
              <div key={key}>
                <div className={bem.e('card-top')}></div>
                <div className={bem.e('card')}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ContactUs />
    </div>
  );
};

export default TentangSDI;
