import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { CMS_DASHBOARD } from 'utils/constants';

const Dashboard = () => {
  return (
    <Row md={5} className="m-50 d-flex align-items-center justify-content-center">
      {CMS_DASHBOARD.map((_, idx) => (
        <Col key={idx} className="sdp-csm-card m-10">
          <Card className="m-24">
            <div className={_.iconColor}>{_.icon}</div>
            <Card.Body className="mt-16">
              <Card.Title className="sdp-text-black-light fw-bold fs-20 lh-24">{_.title}</Card.Title>
              <Card.Text className="sdp-text-black-lighter fs-16 lh-21">{_.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Dashboard;
