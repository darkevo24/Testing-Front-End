import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Logo from 'assets/logo-satu-data-id.png';
import './tentangsdi.scss';

import ContactUs from './form.js';
import TentangProfile from './profile.js';

const TentangSDI = () => {
  const OperationalItem = styled.div`
    background: #ffffff;
    border: 2px solid #e1e2ea;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 15px;
    line-height: 18px;
    align-items: center;
    text-align: center;
    color: #2d2627;
    width: 223.2px;
    height: 112px;
    margin-right: 16px;
    margin-bottom: 16px;
    padding: 0 8px;
    display: inline-grid;
  `;

  const OperationalTop = styled.div`
    width: 48px;
    height: 2px;
    margin-left: 16px;
    background: #ff0000;
  `;

  let strukturOrganisasi = [
    {
      name: 'Oktorialdi, Ph.D',
      position: 'Kordinator SDI',
      url_photo: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      level: 1,
    },
    {
      name: 'Hari Dwi Korianto, S.Kom, MSi',
      position: 'Sekretaris SDI',
      url_photo: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      level: 2,
    },
    {
      name: 'Ervan Maksum, ST, M.Sc,',
      position: 'Wakil Kordinator SDI',
      url_photo: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
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
      <div className="tentang-container">
        <div className="tentang-logo">
          <img src={Logo} alt="" />
        </div>
        <iframe
          width="100%"
          height="500"
          title="sample"
          src="https://www.youtube.com/embed/0QTSpz8Nagk"
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
        <div className="mt-5">
          <div className="tentang-title mb-3">Tentang SDI</div>
          <p className="tentang-desc">
            Satu Data Indonesia (SDI) merupakan kebijakan tata kelola data pemerintah yang bertujuan untuk menciptakan data
            berkualitas, mudah diakses, dan dapat dibagipakaikan antar Instansi Pusat serta Daerah. Kebijakan ini tertuang
            dalam Peraturan Presiden no. 39 tahun 2019 tentang Satu Data Indonesia. Melalu SDI, seluruh data pemerintah dan
            data instansi lain yang terkait dapat bermuara di Portal Satu Data Indonesia (data.go.id).
            <br />
            <br />
            Portal Satu Data Indonesia merupakan portal resmi data terbuka Indonesia yang dikelola oleh Sekretariat Satu Data
            Indonesia tingkat Pusat, Kementerian Perencanaan Pembangunan Nasional / Bappenas. Melalui Portal Satu Data
            Indonesia, kami berupaya penuh untuk memperbaiki tata kelola data demi terwujudnya transparansi dan akuntabilitas
            pemerintah, serta mendukung pembangunan nasional.
          </p>
        </div>
        <div className="mt-100">
          <Row className="align-items-center mb-5">
            <Col>
              <div style={{ background: '#FF0000', height: '4px' }}></div>
            </Col>
            <Col>
              <div className="tentang-title text-center">Struktur Organisasi</div>
            </Col>
            <Col>
              <div style={{ background: '#FF0000', height: '4px' }}></div>
            </Col>
          </Row>
          {arrayLevel.map((level) => (
            <div style={{ textAlign: 'center' }}>
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
              <div className="tentang-title-sm">Bidang Operational</div>
            </Col>
            <Col>
              <div style={{ background: '#E1E2EA', height: '2px' }}></div>
            </Col>
          </Row>
          <Row className="align-items-center ">
            {bidangOperasional.map((item, key) => (
              <Col xs={3}>
                <OperationalTop />
                <OperationalItem key={key}>{item}</OperationalItem>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <ContactUs />
    </div>
  );
};

export default TentangSDI;
