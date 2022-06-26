import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Breadcrumbs } from 'components/Breadcrumb';

const DaftarMenjadiAhli = (props) => {
  const breadcrumbsList = [
    {
      path: '#',
      label: 'Sandbox',
    },
    {
      isActive: true,
      label: 'Daftar Menjadi Ahli',
    },
  ];
  const src = 'https://www.wavemakeronline.com/run-qhhqh823yx/SDI_BPM_master/#/PenambahanAtributForm';
  return (
    <div className="dashboard">
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <div className="p-32">
        <div className="bimtek-header">Daftar Menjadi Ahli</div>
        <Row>
          <Col>
            <Row className="mb-3">
              <Col className="justify-content-center align-items-center">
                <iframe frameBorder="0" seamless title="Forum sdi" src={src}></iframe>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DaftarMenjadiAhli;
