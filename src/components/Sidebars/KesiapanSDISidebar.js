import React from 'react';

const List = [
  {
    title: 'Pusat',
    link: '/kesiapan-sdi-pusat',
  },
  {
    title: 'Daerah',
    link: '/kesiapan-sdi-daerah',
  },
];

export const KesiapanSDISidebar = () => (
  <div>
    {List.map((item, key) => (
      <div key={key} className={'bimtek-sidebar ' + (window.location.pathname === item.link ? 'active' : '')}>
        <a href={item.link}>{item.title}</a>
      </div>
    ))}
  </div>
);
