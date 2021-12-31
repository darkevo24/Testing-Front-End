import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import bn from 'utils/bemNames';
import { formatDate } from 'utils/helper';
import { CMSTable } from 'components';

import { getListKontak, contactListSelector } from './reducer';

const bem = bn('content-table');

const CMSContactUs = () => {
  let dispatch = useDispatch();
  const { records } = useSelector(contactListSelector);

  useEffect(() => dispatch(getListKontak()), []);

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={bem.e('title')}>Kontak</div>
      </div>
      <CMSTable
        customWidth={[18, 18, 18, 18, 18, 7]}
        header={['Penjelasan', 'Creator', 'Tanggal Dibuat', 'Tanggal Approve', 'Status']}
        data={records.map((item) => {
          let value = {
            data: ['Contact Us', item.createdBy.name, formatDate(item.createdAt), formatDate(item.updatedAt), item.status],
            action: '/cms/contact-us/' + item.id,
            classValue: [null, null, null, null, item.status.toLowerCase()],
          };
          return value;
        })}
      />
    </div>
  );
};

export default CMSContactUs;
