import React, { lazy } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout, { PrivateRoute, PublicRoute } from 'layouts/AppLayout';
import lazily from 'utils/lazily';

const { Login } = lazily(() => import('containers/Login'));
const BerandaPage = lazy(() => import('containers/Beranda'));
const TopicDetailPage = lazy(() => import('containers/Beranda/TopicDetails'));
const DataSetPage = lazy(() => import('containers/Beranda/DataSet'));
const ForumPage = lazy(() => import('containers/Forum'));
const BimTekSummaryPage = lazy(() => import('containers/BimTekSummary'));
const BimTekFormPage = lazy(() => import('containers/BimTekForm'));
const BimTekJadwalPage = lazy(() => import('containers/BimTekJadwal'));
const TentangPage = lazy(() => import('containers/TentangSDI'));
const KomunitasPage = lazy(() => import('containers/Komunitas'));
const BeritaLayout = lazy(() => import('containers/BeritaLayout'));
const BeritaPage = lazy(() => import('containers/Berita'));
const KesiapanData = lazy(() => import('containers/KesiapanData'));
const KesiapanSDIDaerah = lazy(() => import('containers/KesiapanSDiDaerah'));
const KesiapanSDIPusat = lazy(() => import('containers/KesiapanSDIPusat'));
// const NotFoundPage = lazy(() => import('containers/NotFound'));

function AppRoutes(props) {
  return (
    <Switch>
      <PublicRoute exact path="/login" component={Login} />
      <AppLayout>
        <Route exact path="/home" component={BerandaPage} />
        <Route exact path="/topic-detail" component={TopicDetailPage} />
        <Route exact path="/dataset" component={DataSetPage} />
        <Route exact path="/forum" component={ForumPage} />
        <Route exact path="/komunitas" component={KomunitasPage} />
        <Route exact path="/bl" component={BeritaLayout} />
        <Route exact path="/berita" component={BeritaPage} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/bimtek-summary" component={BimTekSummaryPage} />
        <Route path="/bimtek-form" component={BimTekFormPage} />
        <Route path="/bimtek-jadwal" component={BimTekJadwalPage} />
        <Route path="/tentang" component={TentangPage} />
        <Route exact path="/tentang" component={TentangPage} />
        <Route exact path="/kesiapan-data" component={KesiapanData} />
        <Route exact path="/kesiapan-sdi-daerah" component={KesiapanSDIDaerah} />
        <Route exact path="/kesiapan-sdi-pusat" component={KesiapanSDIPusat} />
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
