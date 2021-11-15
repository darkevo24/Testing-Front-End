import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import { CMSForm } from 'components';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSBeritaBaru = () => {
  const history = useHistory();

  return (
    <div className={bem.e('section')}>
      <div className={cx(bem.e('header'), "d-flex justify-content-between")}>
        <div className={bem.e('title')}>
          Buat Berita Baru
          <Button onClick={() => history.push('/cms/berita')} className="ml-24" variant="secondary" style={{width: "112px"}}>Batal</Button>
          <Button className="ml-10" variant="info" style={{width: "112px"}}>Simpan</Button>
        </div>
        <div>
          Saved 1 minutes ago Draft
          <Button className="ml-24" variant="secondary" style={{width: "112px"}}>Preview</Button>
        </div>
      </div>
      <div className={bem.e('body')}>
        <CMSForm data={[]} />
      </div>
    </div>
  );
};

export default CMSBeritaBaru;
