import React from 'react';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import CMSBimtekForm, { SubmitJadwalBimtekForm } from 'components/CMSBimtekForm';

import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSJadwalBaru = () => {
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    const tanggal = moment(data?.publishedDate).format('DD MMMM YYYY');
  };

  return (
    <div className={bem.e('section')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          Jadwal Bimbingan Teknis Baru
          <Button onClick={() => history.goBack()} className="ml-24" variant="secondary" style={{ width: '112px' }}>
            Batal
          </Button>
          <Button className="ml-10" variant="secondary" style={{ width: '112px' }}>
            Simpan
          </Button>
          <Button onClick={SubmitJadwalBimtekForm} className="ml-10" variant="info" style={{ width: '112px' }}>
            Kirim
          </Button>
        </div>
        <div>Saved 1 minutes ago Draft</div>
      </div>
      <div className={bem.e('body')}>
        <CMSBimtekForm modalAction={true} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CMSJadwalBaru;
