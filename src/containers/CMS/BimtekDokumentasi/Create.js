import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { CMSBimtekForm, TextEditor } from 'components';

import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSJadwalBaru = () => {
  const history = useHistory();

  return (
    <div className={bem.e('section')}>
      <div className={cx(bem.e('header'), "d-flex justify-content-between")}>
        <div className={bem.e('title')}>
          Dokumentasi Bimbingan Teknis Baru
          <Button onClick={() => history.goBack()} className="ml-24" variant="secondary" style={{width: "112px"}}>Batal</Button>
          <Button className="ml-10" variant="info" style={{width: "112px"}}>Simpan</Button>
        </div>
        <div>
          Saved 1 minutes ago Draft
        </div>
      </div>
      <div className={bem.e('body')}>
        <CMSBimtekForm disabled={true} />
        <Form className="sdp-form">
          <Form.Group controlId="content">
            <Form.Label>Isi Berita</Form.Label>
            <TextEditor />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default CMSJadwalBaru;
