import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CMSLayout, PrivateRoute } from 'layouts';

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
const ManagementApiBaru = lazy(() => import('containers/CMS/ManagementApi/CreateApi'));
const ManagementApiForm = lazy(() => import('containers/CMS/ManagementApi/Form'));
const ManagementApiDetail = lazy(() => import('containers/CMS/ManagementApi/DetailApi'));
const ManagementApiEdit = lazy(() => import('containers/CMS/ManagementApi/EditApi'));
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
const PenggunaManagementPage = lazy(() => import('containers/CMS/PenggunaManagement'));
const PenggunaManagementDetailPage = lazy(() => import('containers/CMS/PenggunaManagementDetails'));
const PenggunaFormPage = lazy(() => import('containers/CMS/PenggunaManagement/tambahPengguna'));
const CMSSecurity = lazy(() => import('containers/CMS/Security'));
const CMSSecurityEdit = lazy(() => import('containers/CMS/Security/CMSSecurityEdit'));

function CMSRoutes() {
  return (
    <CMSLayout>
      <Switch>
        <PrivateRoute exact path="/cms/security/edit" component={CMSSecurityEdit} />
        <PrivateRoute exact path="/cms/security" component={CMSSecurity} />
        <PrivateRoute exact path="/cms/log-activity" component={LogActivity} />
        <PrivateRoute exact path="/cms/instansi" component={Instansi} />
        <PrivateRoute exact path="/cms/instansi/form" component={NewInstansi} />
        <PrivateRoute exact path="/cms/instansi/:id" component={InstansiDetail} />
        <PrivateRoute exact path="/cms/instansi/:id/new-unit-kerja" component={NewUnitKerja} />
        <PrivateRoute exact path="/cms/instansi/:id/edit-unit-kerja/:unitId" component={EditUnitKerja} />
        <PrivateRoute exact path="/cms/instansi/edit/:id" component={EditInstansi} />
        <PrivateRoute exact path="/cms/manage-komunitas-ahli/:id" component={ManageKomunitasAhliPage} />
        <PrivateRoute exact path="/cms/manage-komunitas-ahli/" component={ManageKomunitasAhliPage} />
        <PrivateRoute exact path="/cms/api/edit/:id?" component={ManagementApiEdit} />
        <PrivateRoute exact path="/cms/api-detail/:id" component={ManagementApiDetail} />
        <PrivateRoute exact path="/cms/api/form" component={ManagementApiForm} />
        <PrivateRoute exact path="/cms/api-baru" component={ManagementApiBaru} />
        <PrivateRoute exact path="/cms/api" component={ManagementApi} />
        <PrivateRoute exact path="/cms/manage-komunitas-ahli" component={ManageKomunitasAhliPage} />
        <PrivateRoute exact path="/cms/komunitas-ahli-detail/:id" component={KomunitasAhliDetailPage} />
        <PrivateRoute exact path="/cms/komunitas-ahli" component={KomunitasAhliPage} />
        <PrivateRoute exact path="/cms/dashboard" component={DashboardPage} />
        <PrivateRoute exact path="/cms/about-us" component={AboutUsPage} />
        <PrivateRoute exact path="/cms/struktur" component={StrukturOrganisasiPage} />
        <PrivateRoute exact path="/cms/struktur-form" component={StrukturBaruPage} />
        <PrivateRoute exact path="/cms/struktur-detail/:id" component={StrukturDetailPage} />
        <PrivateRoute exact path="/cms/about-us/edit/:id?" component={AboutUsEditPage} />
        <PrivateRoute exact path="/cms/berita-layout" component={BeritaLayout} />
        <PrivateRoute exact path="/cms/berita-konten" component={BeritaPage} />
        <PrivateRoute exact path="/cms/berita-form" component={BeritaBaruPage} />
        <PrivateRoute exact path="/cms/berita-detail/:id" component={BeritaDetailPage} />
        <PrivateRoute exact path="/cms/bimtek-permintaan" component={BimtekPermintaanPage} />
        <PrivateRoute exact path="/cms/bimtek-permintaan/:id" component={BimtekPermintaanEditPage} />
        <PrivateRoute exact path="/cms/bimtek-jadwal" component={BimtekJadwalPage} />
        <PrivateRoute exact path="/cms/bimtek-jadwal/baru" component={BimtekJadwalBaruPage} />
        <PrivateRoute exact path="/cms/bimtek-jadwal/:id" component={BimtekJadwalDetailPage} />
        <PrivateRoute exact path="/cms/bimtek-dokumentasi" component={BimtekDokumentasiPage} />
        <PrivateRoute exact path="/cms/bimtek-dokumentasi/baru" component={BimtekDokumentasiBaruPage} />
        <PrivateRoute exact path="/cms/bimtek-dokumentasi/:id" component={BimtekDokumentasiDetailPage} />
        <PrivateRoute exact path="/cms/kesiapan-sdi" component={KesiapanSDI} />
        <PrivateRoute exact path="/cms/dashboard-eksekutif" component={DashboardEksekutifPage} />
        <PrivateRoute exact path="/cms/data-analytic" component={DataAnalyticPage} />
        <PrivateRoute exact path="/cms/daftar/manage-dafter-data/:id" component={DaftarFormPage} />
        <PrivateRoute exact path="/cms/daftar/manage-dafter-data/" component={DaftarFormPage} />
        <PrivateRoute exact path="/cms/daftar/:id" component={DaftarDetailPage} />
        <PrivateRoute exact path="/cms/daftar" component={CMSDaftarPage} />
        <PrivateRoute exact path="/cms/permintaan-data" component={PermintaanData} />
        <PrivateRoute exact path="/cms/permintaan-data/:id" component={PermintaanDataDetail} />
        <PrivateRoute exact path="/cms/forum-sdi/manage-forum-sdi/:id" component={ForumSDIFormPage} />
        <PrivateRoute exact path="/cms/forum-sdi/manage-forum-sdi" component={ForumSDIFormPage} />
        <PrivateRoute exact path="/cms/forum-sdi-detail/:id" component={CMSForumSDIDetailPage} />
        <PrivateRoute exact path="/cms/forum-sdi" component={ForumSDIPage} />
        <PrivateRoute exact path="/cms/media-sosial" component={MediaSosialPage} />
        <PrivateRoute exact path="/cms/contact-us" component={ContactUsPage} />
        <PrivateRoute exact path="/cms/contact-us/:id" component={ContactUsDetailPage} />
        <PrivateRoute exact path="/cms/pengguna-management" component={PenggunaManagementPage} />
        <PrivateRoute exact path="/cms/pengguna-management/add" component={PenggunaFormPage} />
        <PrivateRoute exact path="/cms/pengguna-management/:id" component={PenggunaManagementDetailPage} />
        <Route exact path="/cms" render={() => <Redirect to="/cms/dashboard" />} />
      </Switch>
    </CMSLayout>
  );
}

export default CMSRoutes;
