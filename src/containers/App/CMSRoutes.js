import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CMSLayout, PrivateRoute } from 'layouts/AdminLayout';

const DashboardPage = lazy(() => import('containers/CMS/Dashboard'));
const KomunitasAhliPage = lazy(() => import('containers/CMS/KomunitasAhli'));
const ManageKomunitasAhliPage = lazy(() => import('containers/CMS/KomunitasAhli/ManageKomunitasAhli'));
const BeritaPage = lazy(() => import('containers/CMS/Berita'));
const BeritaBaruPage = lazy(() => import('containers/CMS/BeritaBaru'));
const BeritaDetailPage = lazy(() => import('containers/CMS/BeritaDetail'));
const AboutUsPage = lazy(() => import('containers/CMS/AboutUs'));
const StrukturOrganisasiPage = lazy(() => import('containers/CMS/StrukturOrganisasi'));
const StrukturBaruPage = lazy(() => import('containers/CMS/StrukturOrganisasi/Create.js'));
const StrukturDetailPage = lazy(() => import('containers/CMS/StrukturOrganisasi/Detail.js'));
const AboutUsEditPage = lazy(() => import('containers/CMS/AboutUsEdit'));
const BimtekPermintaanPage = lazy(() => import('containers/CMS/BimtekPermintaan'));
const BimtekPermintaanEditPage = lazy(() => import('containers/CMS/BimtekPermintaan/Edit.js'));
const BimtekJadwalPage = lazy(() => import('containers/CMS/BimtekJadwal'));
const BimtekJadwalBaruPage = lazy(() => import('containers/CMS/BimtekJadwal/Create.js'));
const BimtekJadwalDetailPage = lazy(() => import('containers/CMS/BimtekJadwal/Detail.js'));
const BimtekDokumentasiPage = lazy(() => import('containers/CMS/BimtekDokumentasi'));
const BimtekDokumentasiBaruPage = lazy(() => import('containers/CMS/BimtekDokumentasi/Create.js'));
const BimtekDokumentasiDetailPage = lazy(() => import('containers/CMS/BimtekDokumentasi/Detail.js'));

function CMSRoutes() {
  return (
    <CMSLayout>
      <Switch>
        <PrivateRoute exact path="/cms/manage-komunitas-ahli" component={ManageKomunitasAhliPage} />
        <PrivateRoute exact path="/cms/komunitas-ahli" component={KomunitasAhliPage} />
        <PrivateRoute exact path="/cms/dashboard" component={DashboardPage} />
        <PrivateRoute exact path="/cms/about-us" component={AboutUsPage} />
        <PrivateRoute exact path="/cms/about-us/edit" component={AboutUsEditPage} />
        <PrivateRoute exact path="/cms/struktur" component={StrukturOrganisasiPage} />
        <PrivateRoute exact path="/cms/struktur-baru" component={StrukturBaruPage} />
        <PrivateRoute exact path="/cms/struktur-detail/:id" component={StrukturDetailPage} />
        <PrivateRoute exact path="/cms/about-us/edit/:id?" component={AboutUsEditPage} />
        <PrivateRoute exact path="/cms/berita" component={BeritaPage} />
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
        <Route exact path="/cms" render={() => <Redirect to="/cms/dashboard" />} />
      </Switch>
    </CMSLayout>
  );
}

export default CMSRoutes;
