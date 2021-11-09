import React from 'react';
import cx from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';

import { ApiSvg, ConfigSvg, ContentSvg, DataSvg, UserSvg } from 'assets/icons';

const SidebarItem = ({title, pathname, history, location}) => {
  return (
    <div
      className={cx('cms-sidebar-menu', {
        active: location.pathname.includes(pathname),
      })}
      onClick={() => history.push(pathname)} >
      {title}
    </div>
  );
};

export const CMSSidebar = () => {
  const history = useHistory();
  const location = useLocation();

  return  (
    <div className="cms-sidebar-container pb-5">
      <div className="mt-3">
        <div className="cms-sidebar-title">
          <ContentSvg className="mr-10" /> Content Management
        </div>
        <SidebarItem
          title="About Us"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Struktur Organisasi"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Berita"
          pathname="/admin/berita"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Contact Us"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Forum"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Komunitas Ahli"
          pathname="#"
          history={history}
          location={location}
        />
      </div>
      <div className="mt-3">
        <div className="cms-sidebar-title">
          <DataSvg className="mr-10" />Dashboard Management
        </div>
        <SidebarItem
          title="Data Analytics"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Kesiapan SDI"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Dashboard Executive"
          pathname="#"
          history={history}
          location={location}
        />
      </div>
      <div className="mt-3">
        <div className="cms-sidebar-title">
          <DataSvg className="mr-10" />Data Management
        </div>
        <SidebarItem
          title="Daftar Data"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Permintaan Data"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Sandbox"
          pathname="#"
          history={history}
          location={location}
        />
      </div>
      <div className="mt-3">
        <div className="cms-sidebar-title">
          <ApiSvg className="mr-10" />API
        </div>
        <SidebarItem
          title="API Management"
          pathname="#"
          history={history}
          location={location}
        />
      </div>
      <div className="mt-3">
        <div className="cms-sidebar-title">
          <UserSvg className="mr-10" /> User Management
        </div>
        <SidebarItem
          title="Pengguna"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Instansi"
          pathname="#"
          history={history}
          location={location}
        />
      </div>
      <div className="mt-3">
        <div className="cms-sidebar-title">
          <ConfigSvg className="mr-10" />Konfigurasi
        </div>
        <SidebarItem
          title="Log Aktivitas"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Sekuriti"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Aset"
          pathname="#"
          history={history}
          location={location}
        />
        <SidebarItem
          title="Media Sosial"
          pathname="#"
          history={history}
          location={location}
        />
      </div>
    </div>
  );
};
