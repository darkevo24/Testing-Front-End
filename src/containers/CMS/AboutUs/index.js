import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CMSTable } from 'components';

import { filterAboutUs } from './reducer';
import bn from 'utils/bemNames';
import { Edit } from 'components/Icons';

const bem = bn('content-table');

const CMSAboutUs = () => {
  let dispatch = useDispatch();
  let listContent = useSelector((state) => state.cms.aboutUs.dataset.records);
  let componentState = useSelector((state) => state.cms.aboutUs.dataset.status);
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
  useEffect(() => dispatch(filterAboutUs({ page: 1, size: 100 })), []);

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={bem.e('title')}>About Us</div>
      </div>
      <CMSTable
        customWidth={[18, 18, 18, 18, 18, 7]}
        header={['Penjelasan', 'Creator', 'Tanggal Dibuat', 'Tanggal Approve', 'Status']}
        data={listContent.map((item) => {
          let value = {
            data: [
              item.title,
              item.creator,
              item.created_at.toISOString().split('T')[0].split('-').reverse().join('-'),
              item.updated_at.toISOString().split('T')[0].split('-').reverse().join('-'),
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
        tableState={componentState}
      />
    </div>
  );
};

export default CMSAboutUs;
