import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Breadcrumbs } from 'components/Breadcrumb';

const MetadataRegistry = (props) => {
  const breadcrumbsList = [
    {
      path: '#',
      label: 'Sandbox',
    },
    {
      isActive: true,
      label: 'Metadata Registry',
    },
  ];

  return (
    <div className="dashboard">
      <Breadcrumbs breadcrumbsList={breadcrumbsList} />
      <div className="p-32">
        <div className="bimtek-header">Metadata Registry</div>
        <Row>
          <Col>
            <Row className="mb-3">
              <Col className="justify-content-center align-items-center">
                <iframe frameBorder="0" seamless title="Metadata Registry" src="https://sdmx.satudata.go.id"></iframe>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MetadataRegistry;
