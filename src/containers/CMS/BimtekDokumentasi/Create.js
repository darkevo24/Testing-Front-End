import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import CMSBimtekForm, { SubmitJadwalBimtekForm } from 'components/CMSBimtekForm';
import { bimtekListSelector, getDokumentasiList } from './reducer';

import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSJadwalBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { records } = useSelector(bimtekListSelector);

  const fetchDokumentasiList = () => {
    return dispatch(getDokumentasiList());
  };

  useEffect(() => {
    fetchDokumentasiList();
  }, []);

  return (
    <div className={bem.e('section')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          Dokumentasi Bimbingan Teknis Baru
          <Button onClick={() => history.goBack()} className="ml-24" variant="secondary" style={{ width: '112px' }}>
            Batal
          </Button>
          <Button onClick={SubmitJadwalBimtekForm} className="ml-10" variant="info" style={{ width: '112px' }}>
            Simpan
          </Button>
        </div>
        <div>Saved 1 minutes ago Draft</div>
      </div>
      <div className={bem.e('body')}>
        <CMSBimtekForm disabled={true} isDocumentation={true} namaBimtek={records} />
      </div>
    </div>
  );
};

export default CMSJadwalBaru;
