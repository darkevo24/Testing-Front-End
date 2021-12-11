import React, { lazy } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout, { PrivateRoute, PublicRoute } from 'layouts/AppLayout';
import lazily from 'utils/lazily';

const { Login } = lazily(() => import('containers/Login'));
const BerandaPage = lazy(() => import('containers/Beranda'));
const TopicDetailPage = lazy(() => import('containers/Beranda/TopicDetails'));
const DataSetPage = lazy(() => import('containers/Beranda/DataSet'));
const { Perminataan } = lazily(() => import('containers/Perminataan'));
const { PerminataanDetail } = lazily(() => import('containers/Perminataan/detail'));
const PerminataanForumPage = lazy(() => import('containers/Perminataan/Forum'));
const { ForumSDI } = lazily(() => import('containers/ForumSDI'));
const BimTekSummaryPage = lazy(() => import('containers/BimTekSummary'));
const BimTekFormPage = lazy(() => import('containers/BimTekForm'));
const BimTekJadwalPage = lazy(() => import('containers/BimTekJadwal'));
const BimTekMateriPage = lazy(() => import('containers/BimTekMateri'));
const BimTekKotaPage = lazy(() => import('containers/BimTekKota'));
const BimTekDokumentasiPage = lazy(() => import('containers/BimTekDokumentasi'));
const TentangPage = lazy(() => import('containers/TentangSDI'));
const KomunitasPage = lazy(() => import('containers/Komunitas'));
const BeritaPage = lazy(() => import('containers/Berita'));
const KesiapanSDI = lazy(() => import('containers/Dashboard/KesiapanSDI'));
const DashboardEksekutif = lazy(() => import('containers/Dashboard/DashboardEksekutif'));
const DashboardSaya = lazy(() => import('containers/Dashboard/DashboardSaya'));
const DataAnalytic = lazy(() => import('containers/Dashboard/DataAnalytic'));
const DaftarPage = lazy(() => import('containers/Daftar'));
const DataVariablePage = lazy(() => import('containers/DataVariable'));
const ManagementApiPage = lazy(() => import('containers/ManagementApi'));
const ManagementApiAddPage = lazy(() => import('containers/ManagementApi/Form'));
const ManagementApiDetailPage = lazy(() => import('containers/ManagementApi/DetailApi'));
const ManagementApiUpdatePage = lazy(() => import('containers/ManagementApi/UpdateApi'));
// const NotFoundPage = lazy(() => import('containers/NotFound'));

function AppRoutes(props) {
  return (
    <Switch>
      <PublicRoute exact path="/login" component={Login} />
      <AppLayout>
        <Route exact path="/api/edit/:id" component={ManagementApiUpdatePage} />
        <Route exact path="/api-detail/:id" component={ManagementApiDetailPage} />
        <Route exact path="/api/form" component={ManagementApiAddPage} />
        <Route exact path="/api" component={ManagementApiPage} />
        <PrivateRoute exact path="/permintaan-data-detail/:id" component={PerminataanDetail} />
        <PrivateRoute exact path="/permintaan-data" component={Perminataan} />
        <PrivateRoute exact path="/forum-sdi" component={ForumSDI} />
        <PrivateRoute exact path="/forum" component={PerminataanForumPage} />
        <Route exact path="/home" component={BerandaPage} />
        <Route exact path="/topic-detail" component={TopicDetailPage} />
        <PrivateRoute exact path="/dataset" component={DataSetPage} />
        <PrivateRoute exact path="/daftar" component={DaftarPage} />
        <PrivateRoute exact path="/data-variable" component={DataVariablePage} />
        <PrivateRoute exact path="/komunitas-ahli" component={KomunitasPage} />
        <Route exact path="/berita" component={BeritaPage} />
        <Route exact path="/bimtek-summary" component={BimTekSummaryPage} />
        <Route exact path="/bimtek-form" component={BimTekFormPage} />
        <Route exact path="/bimtek-jadwal" component={BimTekJadwalPage} />
        <Route exact path="/bimtek-materi" component={BimTekMateriPage} />
        <Route exact path="/bimtek-kota-pelaksanaan" component={BimTekKotaPage} />
        <Route exact path="/bimtek-dokumentasi" component={BimTekDokumentasiPage} />
        <Route exact path="/tentang" component={TentangPage} />
        <Route exact path="/kesiapan-sdi" component={KesiapanSDI} />
        <Route exact path="/dashboard-eksekutif" component={DashboardEksekutif} />
        <Route exact path="/dashboard-saya" component={DashboardSaya} />
        <Route exact path="/data-analytic" component={DataAnalytic} />
        <Route exact path="/api/edit/:id" component={ManagementApiUpdatePage} />
        <Route exact path="/api-detail/:id" component={ManagementApiDetailPage} />
        <Route exact path="/api/form" component={ManagementApiAddPage} />
        <Route exact path="/api" component={ManagementApiPage} />
        {/* <Route path="*" component={NotFoundPage} /> */}
      </AppLayout>
    </Switch>
  );
}

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({}) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(AppRoutes));
