import React from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { AdminAppLayout } from 'layouts/AdminLayout';
import { CMSForm } from 'components/CMSForm';
import './cmsBeritaBaru.scss';

const CMSBeritaBaru = () => {
  const history = useHistory();
  const ContentLayout = styled.div`
    background: #FAFAFA;
    margin-bottom: 72px;
    height: 100%;
  `;

  return (
    <AdminAppLayout>
      <div className="cms-header d-flex justify-content-between">
        <div className="cms-title" style={{fontSize: "24px"}}>
          Buat Berita Baru
          <Button onClick={() => history.push('/admin/berita')} className="ml-24" variant="secondary" style={{width: "112px"}}>Batal</Button>
          <Button className="ml-10" variant="info" style={{width: "112px"}}>Simpan</Button>
        </div>
        <div>
          Saved 1 minutes ago Draft
          <Button className="ml-24" variant="secondary" style={{width: "112px"}}>Preview</Button>
        </div>
      </div>
      <ContentLayout className="cms-content">
        <CMSForm data={[]} style={{maxWidth: "720px"}} />
      </ContentLayout>
    </AdminAppLayout>
  );
};

export default CMSBeritaBaru;
