import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CMSLayout, PrivateRoute } from 'layouts';
import { Roles } from './config';
const DashboardPage = lazy(() => import('containers/CMS/Dashboard'));
const KomunitasAhliPage = lazy(() => import('containers/CMS/KomunitasAhli'));
const KomunitasAhliDetailPage = lazy(() => import('containers/CMS/KomunitasAhli/KomunitasAhliDetail'));
const ManageKomunitasAhliPage = lazy(() => import('containers/CMS/KomunitasAhli/ManageKomunitasAhli'));
const BeritaLayout = lazy(() => import('containers/CMS/BeritaLayout'));
const BeritaPage = lazy(() => import('containers/CMS/Berita'));
const BeritaBaruPage = lazy(() => import('containers/CMS/BeritaBaru'));
const BeritaDetailPage = lazy(() => import('containers/CMS/BeritaDetail'));
const AboutUsPage = lazy(() => import('containers/CMS/AboutUs'));
const StrukturOrganisasiPage = lazy(() => import('containers/CMS/StrukturOrganisasi'));
const StrukturBaruPage = lazy(() => import('containers/CMS/StrukturOrganisasi/Create'));
const StrukturDetailPage = lazy(() => import('containers/CMS/StrukturOrganisasi/Detail'));
const AboutUsEditPage = lazy(() => import('containers/CMS/AboutUsEdit'));
const BimtekPermintaanPage = lazy(() => import('containers/CMS/BimtekPermintaan'));
const BimtekPermintaanEditPage = lazy(() => import('containers/CMS/BimtekPermintaan/Edit'));
const BimtekJadwalPage = lazy(() => import('containers/CMS/BimtekJadwal'));
const BimtekJadwalBaruPage = lazy(() => import('containers/CMS/BimtekJadwal/Create'));
const BimtekJadwalDetailPage = lazy(() => import('containers/CMS/BimtekJadwal/Detail'));
const BimtekDokumentasiPage = lazy(() => import('containers/CMS/BimtekDokumentasi'));
const BimtekDokumentasiBaruPage = lazy(() => import('containers/CMS/BimtekDokumentasi/Create'));
const BimtekDokumentasiDetailPage = lazy(() => import('containers/CMS/BimtekDokumentasi/Detail'));
const KesiapanSDI = lazy(() => import('containers/CMS/DashboardManage/KesiapanSDI'));
const DashboardEksekutifPage = lazy(() => import('containers/CMS/DashboardManage/DashboardEksekutif'));
const DataAnalyticPage = lazy(() => import('containers/CMS/DashboardManage/DataAnalytic'));
const CMSDaftarPage = lazy(() => import('containers/CMS/Daftar'));
const DaftarDetailPage = lazy(() => import('containers/CMS/Daftar/DafterDetail'));
const DaftarFormPage = lazy(() => import('containers/CMS/Daftar/CMSDaftarForm'));
const PermintaanData = lazy(() => import('containers/CMS/PermintaanData/index'));
const PermintaanDataDetail = lazy(() => import('containers/CMS/PermintaanDataForm/index'));
const ManagementApi = lazy(() => import('containers/CMS/ManagementApi'));
const ManagementApiBaru = lazy(() => import('containers/CMS/ManagementApi/DetailInstansi'));
const ManagementApiDetail = lazy(() => import('containers/CMS/ManagementApi/DetailApi'));
const ManagementApiCreateEdit = lazy(() => import('containers/CMS/ManagementApi/CreateManagementAPI'));
const LogActivity = lazy(() => import('containers/CMS/LogAktifitas'));
const ForumSDIPage = lazy(() => import('containers/CMS/ForumSDI'));
const ForumSDIFormPage = lazy(() => import('containers/CMS/ForumSDI/CMSForumSDIForm'));
const CMSForumSDIDetailPage = lazy(() => import('containers/CMS/ForumSDI/CMSForumSDIDetail'));
const MediaSosialPage = lazy(() => import('containers/CMS/MediaSosial'));
const ContactUsPage = lazy(() => import('containers/CMS/ContactUs'));
const ContactUsDetailPage = lazy(() => import('containers/CMS/ContactUs/detail'));
const Instansi = lazy(() => import('containers/CMS/Instansi'));
const InstansiDetail = lazy(() => import('containers/CMS/Instansi/Detail'));
const NewInstansi = lazy(() => import('containers/CMS/Instansi/NewInstansi'));
const NewUnitKerja = lazy(() => import('containers/CMS/Instansi/UnitKerja/NewUnitKerja'));
const EditInstansi = lazy(() => import('containers/CMS/Instansi/EditInstansi'));
const EditUnitKerja = lazy(() => import('containers/CMS/Instansi/UnitKerja/EditUnitKerja'));
const PenambahanAtributCMS = lazy(() => import('containers/CMS/PenambahanAtributCMS'));
const NewAtributCMS = lazy(() => import('containers/CMS/PenambahanAtributCMS/NewAtributCMS'));
const PendaftarAhli = lazy(() => import('containers/CMS/PendaftarAhli'));
const PenggunaManagementPage = lazy(() => import('containers/CMS/PenggunaManagement'));
const PenggunaManagementDetailPage = lazy(() => import('containers/CMS/PenggunaManagementDetails'));
const PenggunaFormPage = lazy(() => import('containers/CMS/PenggunaManagement/tambahPengguna'));
const RegistrasiMenuPengguna = lazy(() => import('containers/CMS/RegistrasiMenuPengguna'));
const SDIWiki = lazy(() => import('containers/CMS/SDIWiki'));
const CMSSecurity = lazy(() => import('containers/CMS/Security'));
const CMSSecurityEdit = lazy(() => import('containers/CMS/Security/CMSSecurityEdit'));
const CMSKonfigurasiPortal = lazy(() => import('containers/CMS/KonfigurasiPortal'));
const Glosarium = lazy(() => import('containers/CMS/Glosarium'));
const UserFeedback = lazy(() => import('containers/CMS/UserFeedback'));

function CMSRoutes() {
  return (
    <CMSLayout>
      <Switch>
        <PrivateRoute exact path="/cms/security/edit" component={CMSSecurityEdit} permissions={[Roles.ADMIN]} />
        <PrivateRoute exact path="/cms/security" component={CMSSecurity} permissions={[Roles.ADMIN]} />
        <PrivateRoute exact path="/cms/log-activity" component={LogActivity} permissions={[Roles.ADMIN]} />
        <PrivateRoute
          exact
          path="/cms/instansi/:id/edit-unit-kerja/:unitId"
          component={EditUnitKerja}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/instansi/:id/new-unit-kerja"
          component={NewUnitKerja}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/instansi/edit/:id"
          component={EditInstansi}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/instansi/form"
          component={NewInstansi}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/instansi/:id"
          component={InstansiDetail}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/instansi"
          component={Instansi}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/manage-komunitas-ahli/:id"
          component={ManageKomunitasAhliPage}
          permissions={[
            Roles.MEMBER,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/manage-komunitas-ahli/"
          component={ManageKomunitasAhliPage}
          permissions={[
            Roles.MEMBER,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/api-edit/:instansiId/:id?"
          component={ManagementApiCreateEdit}
          permissions={[Roles.ADMIN, Roles.SEKRETARIANT]}
        />
        <PrivateRoute
          exact
          path="/cms/api-create/:instansiId/"
          component={ManagementApiCreateEdit}
          permissions={[Roles.ADMIN, Roles.SEKRETARIANT]}
        />
        <PrivateRoute
          exact
          path="/cms/api-detail/:id"
          component={ManagementApiDetail}
          permissions={[Roles.ADMIN, Roles.SEKRETARIANT]}
        />
        <PrivateRoute
          exact
          path="/cms/api-baru/:id"
          component={ManagementApiBaru}
          permissions={[Roles.ADMIN, Roles.SEKRETARIANT]}
        />
        <PrivateRoute exact path="/cms/api" component={ManagementApi} permissions={[Roles.ADMIN, Roles.SEKRETARIANT]} />
        <PrivateRoute
          exact
          path="/cms/manage-komunitas-ahli"
          component={ManageKomunitasAhliPage}
          permissions={[
            Roles.MEMBER,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/komunitas-ahli-detail/:id"
          component={KomunitasAhliDetailPage}
          permissions={[
            Roles.MEMBER,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/komunitas-ahli"
          component={KomunitasAhliPage}
          permissions={[
            Roles.MEMBER,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/dashboard"
          component={DashboardPage}
          permissions={[
            Roles.ADMIN,
            Roles.REGISTERED_USER,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.SUPERVISOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/about-us"
          component={AboutUsPage}
          permissions={[
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/about-us/edit/:id?"
          component={AboutUsEditPage}
          permissions={[
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/struktur"
          component={StrukturOrganisasiPage}
          permissions={[
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/struktur-form"
          component={StrukturBaruPage}
          permissions={[
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/struktur-detail/:id"
          component={StrukturDetailPage}
          permissions={[
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/berita-layout"
          component={BeritaLayout}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/berita-konten"
          component={BeritaPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/berita-form"
          component={BeritaBaruPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/berita-detail/:id"
          component={BeritaDetailPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/bimtek-permintaan"
          component={BimtekPermintaanPage}
          permissions={[Roles.SEKRETARIANT, Roles.SEKRETARIANT_CREATOR, Roles.SEKRETARIANT_EDITOR]}
        />
        <PrivateRoute
          exact
          path="/cms/bimtek-permintaan/:id"
          component={BimtekPermintaanEditPage}
          permissions={[Roles.SEKRETARIANT, Roles.SEKRETARIANT_CREATOR, Roles.SEKRETARIANT_EDITOR]}
        />
        <PrivateRoute
          exact
          path="/cms/bimtek-jadwal"
          component={BimtekJadwalPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/bimtek-jadwal/baru"
          component={BimtekJadwalBaruPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/bimtek-jadwal/:id"
          component={BimtekJadwalDetailPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/bimtek-dokumentasi"
          component={BimtekDokumentasiPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/bimtek-dokumentasi/baru"
          component={BimtekDokumentasiBaruPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/bimtek-dokumentasi/:id"
          component={BimtekDokumentasiDetailPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/kesiapan-sdi"
          component={KesiapanSDI}
          permissions={[
            Roles.ADMIN,
            Roles.EKSEKUTIF,
            Roles.MEMBER,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/dashboard-eksekutif"
          component={DashboardEksekutifPage}
          permissions={[
            Roles.EKSEKUTIF,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/data-prioritas"
          component={DataAnalyticPage}
          permissions={[Roles.ADMIN, Roles.SEKRETARIANT, Roles.SEKRETARIANT_CREATOR, Roles.SEKRETARIANT_EDITOR]}
        />
        <PrivateRoute
          exact
          path="/cms/daftar/manage-dafter-data/:id"
          component={DaftarFormPage}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/daftar/manage-dafter-data/"
          component={DaftarFormPage}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/daftar/:id"
          component={DaftarDetailPage}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/daftar"
          component={CMSDaftarPage}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/permintaan-data"
          component={PermintaanData}
          permissions={[Roles.ADMIN, Roles.SEKRETARIANT]}
        />
        <PrivateRoute
          exact
          path="/cms/permintaan-data/:id"
          component={PermintaanDataDetail}
          permissions={[Roles.ADMIN, Roles.SEKRETARIANT]}
        />
        <PrivateRoute
          exact
          path="/cms/forum-sdi/manage-forum-sdi/:id"
          component={ForumSDIFormPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/forum-sdi/manage-forum-sdi"
          component={ForumSDIFormPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/forum-sdi-detail/:id"
          component={CMSForumSDIDetailPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/forum-sdi"
          component={ForumSDIPage}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute exact path="/cms/media-sosial" component={MediaSosialPage} permissions={[Roles.ADMIN]} />
        <PrivateRoute
          exact
          path="/cms/contact-us"
          component={ContactUsPage}
          permissions={[
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/contact-us/:id"
          component={ContactUsDetailPage}
          permissions={[
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/konfigurasi-portal"
          component={CMSKonfigurasiPortal}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/penambahan-atribut-cms"
          component={PenambahanAtributCMS}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          exact
          path="/cms/penambahan-atribut-cms/new-atribut-cms"
          component={NewAtributCMS}
          permissions={[
            Roles.ADMIN,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          path="/cms/pendaftar-ahli"
          component={PendaftarAhli}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          path="/cms/glosarium"
          component={Glosarium}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute
          path="/cms/registrasi-pengguna"
          component={RegistrasiMenuPengguna}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute exact path="/cms/sdi-wiki" component={SDIWiki} permissions={[Roles.ADMIN]} />
        <PrivateRoute
          path="/cms/user-feedback"
          component={UserFeedback}
          permissions={[
            Roles.ADMIN,
            Roles.CONTENT_CREATOR,
            Roles.CONTENT_EDITOR,
            Roles.SEKRETARIANT,
            Roles.SEKRETARIANT_CREATOR,
            Roles.SEKRETARIANT_EDITOR,
            Roles.PEMBINA_DATA,
            Roles.PIC_SDGS,
            Roles.PIC_BAPPENAS,
          ]}
        />
        <PrivateRoute exact path="/cms/pengguna-management" component={PenggunaManagementPage} permissions={[Roles.ADMIN]} />
        <PrivateRoute exact path="/cms/pengguna-management/add" component={PenggunaFormPage} permissions={[Roles.ADMIN]} />
        <PrivateRoute
          exact
          path="/cms/pengguna-management/:id"
          component={PenggunaManagementDetailPage}
          permissions={[Roles.ADMIN]}
        />
        <Route exact path="/cms" render={() => <Redirect to="/cms/dashboard" />} />
      </Switch>
    </CMSLayout>
  );
}

export default CMSRoutes;
