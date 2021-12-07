import React from 'react';
import cx from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

import { SidebarApiIcon, SidebarConfigIcon, SidebarContentIcon, SidebarDataIcon, SidebarUserIcon } from 'assets/icons';
import bn from 'utils/bemNames';

const bem = bn('sidebar');

const SidebarItem = ({ title, pathname }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div
      className={cx(bem.e('item'), {
        active: location.pathname.includes(pathname),
      })}
      onClick={() => history.push(pathname)}>
      {title}
    </div>
  );
};

export const CMSSidebar = () => {
  return (
    <div className={cx(bem.e('section'), 'pb-5')}>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarContentIcon className="mr-10" /> Content Management
        </div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item>
            <Accordion.Header
              className={cx('', {
                selected:
                  window.location.pathname.includes('/cms/about-us') ||
                  window.location.pathname.includes('/cms/contact-us') ||
                  window.location.pathname.includes('/cms/struktur'),
              })}>
              Tentang
            </Accordion.Header>
            <Accordion.Body>
              <SidebarItem title="About Us" pathname="/cms/about-us" />
              <SidebarItem title="Struktur Organisasi" pathname="/cms/struktur" />
              <SidebarItem title="Contact Us" pathname="/cms/contact-us" />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion defaultActiveKey="0">
          <Accordion.Item>
            <Accordion.Header
              className={cx('', {
                selected: window.location.pathname.includes('/cms/berita'),
              })}>
              Berita
            </Accordion.Header>
            <Accordion.Body>
              <SidebarItem title="Konten Berita" pathname="/cms/berita-konten" />
              <SidebarItem title="Layout Berita" pathname="/cms/berita-layout" />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <SidebarItem title="Forum" pathname="#" />
        <SidebarItem title="Komunitas Ahli" pathname="/cms/komunitas-ahli" />
        <Accordion defaultActiveKey="0">
          <Accordion.Item>
            <Accordion.Header
              className={cx('', {
                selected: window.location.pathname.includes('/cms/bimtek'),
              })}>
              Bimbingan Teknis
            </Accordion.Header>
            <Accordion.Body>
              <SidebarItem title="Permintaan Bimbingan Teknis" pathname="/cms/bimtek-permintaan" />
              <SidebarItem title="Jadwal Bimbingan Teknis" pathname="/cms/bimtek-jadwal" />
              <SidebarItem title="Dokumentasi Bimbingan Teknis" pathname="/cms/bimtek-dokumentasi" />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarDataIcon className="mr-10" />
          Dashboard Management
        </div>
        {/* <SidebarItem title="Data Analytics" pathname="/cms/data-analytic" />
        <SidebarItem title="Kesiapan SDI" pathname="/cms/kesiapan-sdi" />
        <SidebarItem title="Dashboard Executive" pathname="/cms/dashboard-eksekutif" /> */}
        <div className={cx(bem.e('item'))} onClick={() => window.open('http://103.170.104.187:8088/login/')}>
          Data Analytics
        </div>
        <div className={cx(bem.e('item'))} onClick={() => window.open('http://103.170.104.187:8088/login/')}>
          Kesiapan SDI
        </div>
        <div className={cx(bem.e('item'))} onClick={() => window.open('http://103.170.104.187:8088/login/')}>
          Dashboard Executive
        </div>
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarDataIcon className="mr-10" />
          Data Management
        </div>
        <SidebarItem title="Daftar Data" pathname="#" />
        <SidebarItem title="Permintaan Data" pathname="/cms/permintaan-data" />
        <SidebarItem title="Sandbox" pathname="#" />
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarApiIcon className="mr-10" />
          API
        </div>
        <SidebarItem title="API Management" pathname="#" />
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarUserIcon className="mr-10" /> User Management
        </div>
        <SidebarItem title="Pengguna" pathname="#" />
        <SidebarItem title="Instansi" pathname="#" />
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarConfigIcon className="mr-10" />
          Konfigurasi
        </div>
        <SidebarItem title="Log Aktivitas" pathname="#" />
        <SidebarItem title="Sekuriti" pathname="#" />
        <SidebarItem title="Aset" pathname="#" />
        <SidebarItem title="Media Sosial" pathname="#" />
      </div>
    </div>
  );
};
