import React from 'react';

const List = [
  {
    title: 'Form Permintaan',
    link: '/bimtek-form',
  },
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
  {
    title: 'Permintaan Bimtek Saya',
    link: '/bimtek-permintaan',
  },
];

export const BimTekSidebar = () => (
  <div>
    {List.map((item, key) => (
      <div key={key} className={'bimtek-sidebar ' + (window.location.pathname === item.link ? 'active' : '')}>
        <a href={item.link}>{item.title}</a>
      </div>
    ))}
  </div>
);
