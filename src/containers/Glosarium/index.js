import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Breadcrumbs } from 'components/Breadcrumb';

const Glosarium = (props) => {
  const breadcrumbsList = [
    {
      path: '#',
      label: 'Layanan',
    },
    {
      isActive: true,
      label: 'Glosarium',
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

export default Glosarium;
