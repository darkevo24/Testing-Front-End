import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { useHistory } from 'react-router-dom';

import { AdminAppLayout } from 'layouts/AdminLayout';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { CMSForm } from 'components/CMSForm';
import './cmsBeritaDetail.scss';

const CMSBeritaDetail = props => {
  const idBerita = props.match.params.id;
  // const history = useHistory();

  return (
    <AdminAppLayout>
      <Row className="cms-content">
        <Col sm={8}>
          <div>
            <div className="d-flex justify-content-between">
              <div className="cms-title">
                Edit Detail {idBerita}
              </div>
              <div>
                Saved 1 minutes ago Draft
                <Button className="ml-24" variant="secondary" style={{width: "112px"}}>Preview</Button>
              </div>
            </div>
            <CMSForm data={[]} />
          </div>
        </Col>
        <Col sm={4}>
          <LogStatus data={[]} />
        </Col>
      </Row>

    </AdminAppLayout>
  );
};

export default CMSBeritaDetail;
