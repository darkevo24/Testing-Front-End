import React from 'react';
import { CMSTable } from 'components';

import bn from 'utils/bemNames';

const bem = bn('content-table');

const CMSAboutUs = () => {
  const dataBerita = [
    {
      id: 1,
      title: 'About Us',
      datePublish: '28-11-2021',
      dateApprove: '28-11-2021',
      status: 'Published',
      createBy: 'Ibrohim Hanifa',
      link: '/cms/about-us/edit',
    },
    {
      id: 2,
      title: 'Struktur Organisasi',
      datePublish: '28-11-2021',
      dateApprove: '28-11-2021',
      status: 'Published',
      createBy: 'Ibrohim Hanifa',
      link: '/cms/about-us/struktur',
    },
    {
      id: 3,
      title: 'Contact Us',
      datePublish: '28-11-2021',
      dateApprove: '28-11-2021',
      status: 'Published',
      createBy: 'Ibrohim Hanifa',
      link: '/cms/about-us/contact',
    },
  ];

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={bem.e('title')}>About Us</div>
      </div>
      <CMSTable
        customWidth={[18, 18, 18, 18, 18, 7]}
        header={['Penjelasan', 'Creator', 'Tanggal Dibuat', 'Tanggal Approve', 'Status']}
        data={dataBerita.map((item) => {
          let value = {
            data: [item.title, item.createBy, item.datePublish, item.dateApprove, item.status],
            action: item.link,
          };
          return value;
        })}
      />
    </div>
  );
};

export default CMSAboutUs;
