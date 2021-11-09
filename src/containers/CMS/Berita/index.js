import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styled from 'styled-components';
import { AdminAppLayout } from 'layouts/AdminLayout';
import { ReactComponent as Plus } from 'assets/plus.svg';
import { useHistory } from 'react-router-dom';

const CMSBerita = () => {
  const history = useHistory();
  const ButtonAdd = styled.div`
    font-family: Myriad Pro;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    height: 48px;
    letter-spacing: 0px;
    background: #007AFF;
    color: #FFFFFF;
    padding: 13px 16px;
    border-radius: 4px;
    cursor: pointer;
  `;

  const RowTable = styled.div`
    border: 1px solid #E1E2EA;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 8px;
  `;

  const dataBerita = [
    {
      "id": 1,
      "title": "Kemenhub Berbagi Pengalaman Penanganan Covid-19 Sektor Transportasi Di Forum ASEAN-Republik Korea ke-11",
      "datePublish": "28-11-2021",
      "status": "Published",
      "createBy": "Sigmund Freud"
    },
    {
      "id": 2,
      "title": "Kemenhub Berbagi Pengalaman Penanganan Covid-19 Sektor Transportasi Di Forum ASEAN-Republik Korea ke-12",
      "datePublish": "-",
      "status": "Draft",
      "createBy": "Sigmund Freud"
    }
  ];

  const tableWidth = [ 50, 12, 9, 11, 11, 7]; // total 100%

  return (
    <AdminAppLayout>
      <div className="cms-header">
        <div className="cms-title">Berita</div>
        <div className="d-flex justify-content-between mt-3">
          <ButtonAdd onClick={() => history.push('/admin/berita-baru')}><Plus/> Buat Berita</ButtonAdd>
          <Form>
            <Form.Control style={{width: "360px"}} type="text" placeholder="Cari Berita" />
          </Form>
        </div>
      </div>
      <div className="cms-content">
        <div className="table-header d-flex">
          <span style={{width: tableWidth[0]+"%"}}>Judul Berita</span>
          <span style={{width: tableWidth[1]+"%"}}>Tanggal Publish</span>
          <span style={{width: tableWidth[2]+"%"}}>Status</span>
          <span style={{width: tableWidth[3]+"%"}}>Author</span>
          <span style={{width: tableWidth[4]+"%"}}>Editor</span>
          <span style={{width: tableWidth[5]+"%"}}></span>
        </div>
        {dataBerita.map((item, key) => (
          <RowTable className="table-body d-flex" key={key}>
            <span style={{width: tableWidth[0]+"%"}}>{item.title}</span>
            <span style={{width: tableWidth[1]+"%"}}>{item.datePublish}</span>
            <span style={{width: tableWidth[2]+"%"}}>{item.status}</span>
            <span style={{width: tableWidth[3]+"%"}}>{item.createBy}</span>
            <span style={{width: tableWidth[4]+"%"}}>{item.createBy}</span>
            <span style={{width: tableWidth[5]+"%"}}><Button onClick={() => history.push('/admin/berita-detail/'+item.id)} variant="info">Detail</Button></span>
          </RowTable>
        ))}
      </div>
    </AdminAppLayout>
  );
};

export default CMSBerita;
