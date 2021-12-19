import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CMSTable } from 'components';

import { getListTentang, tentangDatasetSelector } from './reducer';
import bn from 'utils/bemNames';

const bem = bn('content-table');

const CMSAboutUs = () => {
  let dispatch = useDispatch();
  const { records } = useSelector(tentangDatasetSelector);

  const statusStyle = {
    DRAFT: {
      color: '#858A8F',
    },
    MENUNGGU_PERSETUJUAN: {
      color: '#6848C3',
    },
    DISETUJUI: {
      color: '#007AFF',
    },
    DITAYANGKAN: {
      color: '#DE8813',
    },
  };
  // called only once
  useEffect(() => dispatch(getListTentang({ page: 1 })), []);

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={bem.e('title')}>About Us</div>
      </div>
      <CMSTable
        customWidth={[18, 18, 18, 18, 18, 7]}
        header={['Penjelasan', 'Creator', 'Tanggal Dibuat', 'Tanggal Approve', 'Status']}
        data={records.map((item) => {
          let value = {
            data: [
              item.judul,
              item.user.name,
              item.createdAt.split('T')[0].split('-').reverse().join('-'),
              item.updatedAt.split('T')[0].split('-').reverse().join('-'),
              item.status,
            ],
            dataStyle: [null, null, null, null, statusStyle[item.status]],
            actions: [
              {
                title: 'Detail',
                disabled: false,
                link: `/cms/about-us/edit/${item.id}`,
              },
            ],
          };
          return value;
        })}
      />
    </div>
  );
};

export default CMSAboutUs;
