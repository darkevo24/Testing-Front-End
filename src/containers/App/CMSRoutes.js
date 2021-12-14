import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CMSLayout, PrivateRoute } from 'layouts/AdminLayout';

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
const DaftarPage = lazy(() => import('containers/CMS/Daftar'));
const DaftarDetailPage = lazy(() => import('containers/CMS/Daftar/CMSDaftarDetail'));
const PermintaanData = lazy(() => import('containers/CMS/PermintaanData/index'));
const PermintaanDataDetail = lazy(() => import('containers/CMS/PermintaanDataForm/index'));
const ManagementApi = lazy(() => import('containers/CMS/ManagementApi'));
const ManagementApiBaru = lazy(() => import('containers/CMS/ManagementApi/CreateApi'));
const ManagementApiForm = lazy(() => import('containers/CMS/ManagementApi/Form'));
const ManagementApiDetail = lazy(() => import('containers/CMS/ManagementApi/DetailApi'));
const ManagementApiEdit = lazy(() => import('containers/CMS/ManagementApi/EditApi'));
// const LogActivity = lazy(() => import('containers/CMS/LogAktifitas'));

function CMSRoutes() {
  return (
    <CMSLayout>
      <Switch>
        {/* <PrivateRoute exact path="/cms/log-activity" component={LogActivity} /> */}
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
        <PrivateRoute exact path="/cms/struktur-baru" component={StrukturBaruPage} />
        <PrivateRoute exact path="/cms/struktur-detail/:id" component={StrukturDetailPage} />
        <PrivateRoute exact path="/cms/about-us/edit/:id?" component={AboutUsEditPage} />
        <PrivateRoute exact path="/cms/berita-layout" component={BeritaLayout} />
        <PrivateRoute exact path="/cms/berita-konten" component={BeritaPage} />
        <PrivateRoute exact path="/cms/berita-baru" component={BeritaBaruPage} />
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
        <PrivateRoute exact path="/cms/daftar" component={DaftarPage} />
        <PrivateRoute exact path="/cms/daftar-detail/:id" component={DaftarDetailPage} />
        <PrivateRoute exact path="/cms/permintaan-data" component={PermintaanData} />
        <PrivateRoute exact path="/cms/permintaan-data/:id" component={PermintaanDataDetail} />
        <Route exact path="/cms" render={() => <Redirect to="/cms/dashboard" />} />
      </Switch>
    </CMSLayout>
  );
}

export default CMSRoutes;
