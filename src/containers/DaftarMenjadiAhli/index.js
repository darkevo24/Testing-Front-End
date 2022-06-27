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
  const src = 'https://bpm.satudata.go.id/#/FormRequest';
  return (
    <div className="dashboard">
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <div className="p-0">
        <Row>
          <Col>
            <iframe frameBorder="0" seamless title="Daftar menjadi ahli" src={src}></iframe>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DaftarMenjadiAhli;
