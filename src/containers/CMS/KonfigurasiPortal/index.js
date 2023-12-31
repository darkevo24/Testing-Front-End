import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Loader } from 'components';
import bn from 'utils/bemNames';
import cx from 'classnames';
import { konfiguasiPortalCmsListSelector } from './reducer';
import CMSKonfigurasiPortalForm from 'components/CMSKonfigurasiPortalForm';

const bem = bn('content-create');

const CMSKonfigurasiPortal = () => {
  const { loading, record } = useSelector(konfiguasiPortalCmsListSelector);

  const onSubmit = () => {
    // save konfigurasi portal
  };

  return (
    <div className={bem.e('section')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>Aset</div>
      </div>
      <div className={bem.e('body')}>
        <CMSKonfigurasiPortalForm />
      </div>
      {loading && <Loader fullscreen={true} />}
    </div>
  );
};

export default CMSKonfigurasiPortal;
