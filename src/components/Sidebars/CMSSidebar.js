import React from 'react';
import cx from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';

import { SidebarApiIcon, SidebarConfigIcon, SidebarContentIcon, SidebarDataIcon, SidebarUserIcon } from 'assets/icons';
import bn from 'utils/bemNames';

const bem = bn('sidebar');

const SidebarItem = ({title, pathname}) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div
      className={cx(bem.e('item'), {
        active: location.pathname.includes(pathname),
      })}
      onClick={() => history.push(pathname)} >
      {title}
    </div>
  );
};

export const CMSSidebar = () => {
  return  (
    <div className={cx(bem.e('section'), 'pb-5')}>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarContentIcon className="mr-10" /> Content Management
        </div>
        <SidebarItem
          title="About Us"
          pathname="#"
        />
        <SidebarItem
          title="Struktur Organisasi"
          pathname="#"
        />
        <SidebarItem
          title="Berita"
          pathname="/cms/berita"
        />
        <SidebarItem
          title="Contact Us"
          pathname="#"
        />
        <SidebarItem
          title="Forum"
          pathname="#"
        />
        <SidebarItem
          title="Komunitas Ahli"
          pathname="#"
        />
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarDataIcon className="mr-10" />Dashboard Management
        </div>
        <SidebarItem
          title="Data Analytics"
          pathname="#"
        />
        <SidebarItem
          title="Kesiapan SDI"
          pathname="#"
        />
        <SidebarItem
          title="Dashboard Executive"
          pathname="#"
        />
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarDataIcon className="mr-10" />Data Management
        </div>
        <SidebarItem
          title="Daftar Data"
          pathname="#"
        />
        <SidebarItem
          title="Permintaan Data"
          pathname="#"
        />
        <SidebarItem
          title="Sandbox"
          pathname="#"
        />
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarApiIcon className="mr-10" />API
        </div>
        <SidebarItem
          title="API Management"
          pathname="#"
        />
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarUserIcon className="mr-10" /> User Management
        </div>
        <SidebarItem
          title="Pengguna"
          pathname="#"
        />
        <SidebarItem
          title="Instansi"
          pathname="#"
        />
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarConfigIcon className="mr-10" />Konfigurasi
        </div>
        <SidebarItem
          title="Log Aktivitas"
          pathname="#"
        />
        <SidebarItem
          title="Sekuriti"
          pathname="#"
        />
        <SidebarItem
          title="Aset"
          pathname="#"
        />
        <SidebarItem
          title="Media Sosial"
          pathname="#"
        />
      </div>
    </div>
  );
};
