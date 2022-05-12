import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Loader } from 'components';
import bn from 'utils/bemNames';
import cx from 'classnames';
import { detailDataSelector } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import CMSKonfigurasiPortalForm from 'components/CMSKonfigurasiPortalForm';

const bem = bn('content-create');

const CMSKonfigurasiPortal = () => {
  const { loading, record } = useSelector(detailDataSelector);

  const onSubmit = () => {
    // save konfigurasi portal
  };

  return (
    <div className={bem.e('section')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>Aset</div>
      </div>
      <div className={bem.e('body')}>
        <CMSKonfigurasiPortalForm data={record} onSubmit={onSubmit} />
      </div>
      {loading && <Loader fullscreen={true} />}
    </div>
  );
};

export default CMSKonfigurasiPortal;
