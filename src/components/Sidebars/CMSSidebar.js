import React from 'react';
import cx from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { getAnalyticsUrl, USER_ROLES } from 'utils/constants';

import { SidebarApiIcon, SidebarConfigIcon, SidebarContentIcon, SidebarDataIcon, SidebarUserIcon } from 'assets/icons';
import bn from 'utils/bemNames';
import { ComponentAccessibility } from '../ComponentAccess';

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

const openAnalyticsLogin = () => {
  window.open(getAnalyticsUrl('login'));
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
        <SidebarItem title="Forum SDI" pathname="/cms/forum-sdi" />
        <ComponentAccessibility
          roles={[USER_ROLES.CONTENT_EDITOR, USER_ROLES.CONTENT_CREATOR, USER_ROLES.ADMIN, USER_ROLES.SEKRETARIAT]}>
          <SidebarItem title="Komunitas Ahli" pathname="/cms/komunitas-ahli" />
        </ComponentAccessibility>
        <Accordion defaultActiveKey="0">
          <Accordion.Item>
            <Accordion.Header
              className={cx('', {
                selected: window.location.pathname.includes('/cms/bimtek'),
              })}>
              Bimbingan Teknis
            </Accordion.Header>
            <Accordion.Body>
              <ComponentAccessibility roles={[USER_ROLES.SEKRETARIAT]}>
                <SidebarItem title="Permintaan Bimbingan Teknis" pathname="/cms/bimtek-permintaan" />
              </ComponentAccessibility>
              <ComponentAccessibility roles={[USER_ROLES.CONTENT_CREATOR, USER_ROLES.CONTENT_EDITOR]}>
                <SidebarItem title="Jadwal Bimbingan Teknis" pathname="/cms/bimtek-jadwal" />
                <SidebarItem title="Dokumentasi Bimbingan Teknis" pathname="/cms/bimtek-dokumentasi" />
              </ComponentAccessibility>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarDataIcon className="mr-10" />
          Dashboard Management
        </div>
        <SidebarItem title="Data Analytics" pathname="/cms/data-analytic" />
        <div className={cx(bem.e('item'))} onClick={openAnalyticsLogin}>
          Kesiapan SDI
        </div>
        <div className={cx(bem.e('item'))} onClick={openAnalyticsLogin}>
          Dashboard Executive
        </div>
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarDataIcon className="mr-10" />
          Data Management
        </div>
        <SidebarItem title="Daftar Data" pathname="/cms/daftar" />
        <SidebarItem title="Permintaan Data" pathname="/cms/permintaan-data" />
        <SidebarItem title="Sandbox" pathname="#" />
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarApiIcon className="mr-10" />
          API
        </div>
        <SidebarItem title="API Management" pathname="/cms/api" />
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarUserIcon className="mr-10" /> User Management
        </div>
        <SidebarItem title="Instansi" pathname="/cms/instansi" />
        <SidebarItem title="Pengguna" pathname="/cms/pengguna-management" />
      </div>
      <div className="mt-3">
        <div className={bem.e('title')}>
          <SidebarConfigIcon className="mr-10" />
          Konfigurasi
        </div>
        <SidebarItem title="Log Aktivitas" pathname="/cms/log-activity" />
        <SidebarItem title="Sekuriti" pathname="/cms/security" />
        <SidebarItem title="Aset" pathname="#" />
        <SidebarItem title="Media Sosial" pathname="/cms/media-sosial" />
      </div>
    </div>
  );
};
