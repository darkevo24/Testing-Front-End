import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';

export const BimTekSidebar = () => {
  const user = useSelector(userSelector);
  const sideBarList = [
    {
      title: 'Jadwal',
      link: '/bimtek-jadwal',
    },
    {
      title: 'Dokumentasi',
      link: '/bimtek-dokumentasi',
    },
    {
      title: 'Kota Pelaksanaan',
      link: '/bimtek-kota-pelaksanaan',
    },
    {
      title: 'Materi',
      link: '/bimtek-materi',
    },
  ];

  const List =
    user.roles === 'WALIDATA'
      ? [
          {
            title: 'Form Permintaan',
            link: '/bimtek-form',
          },
          {
            title: 'Permintaan Bimtek Saya',
            link: '/bimtek-permintaan',
          },
          ...sideBarList,
        ]
      : sideBarList;
  return (
    <div>
      {List.map((item, key) => (
        <div key={key} className={'bimtek-sidebar ' + (window.location.pathname === item.link ? 'active' : '')}>
          <a href={item.link}>{item.title}</a>
        </div>
      ))}
    </div>
  );
};
