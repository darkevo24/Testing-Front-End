import React, { lazy } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppLayout } from 'layouts/AppLayout';

const BerandaPage = lazy(() => import('containers/Beranda'));
const TopicDetailPage = lazy(() => import('containers/Beranda/TopicDetails'));
const ForumPage = lazy(() => import('containers/Forum'));
const BimTekSummaryPage = lazy(() => import('containers/BimTekSummary'));
const BimTekFormPage = lazy(() => import('containers/BimTekForm'));
const BimTekJadwalPage = lazy(() => import('containers/BimTekJadwal'));
const TentangPage = lazy(() => import('containers/TentangSDI'));
const KomunitasPage = lazy(() => import('containers/Komunitas'));
const BeritaLayout = lazy(() => import('containers/BeritaLayout'));
const BeritaPage = lazy(() => import('containers/Berita'));
const PermintaanData = lazy(() => import('containers/PermintaanData'));
const PermintaanDataForm = lazy(() => import('containers/PermintaanDataForm'));

function AppRoutes(props) {
  return (
    <AppLayout>
      <Switch>
        <Route exact path="/home" component={BerandaPage} />
        <Route exact path="/topic-detail" component={TopicDetailPage} />
        <Route exact path="/forum" component={ForumPage} />
        <Route exact path="/komunitas" component={KomunitasPage} />
        <Route exact path="/bl" component={BeritaLayout} />
        <Route exact path="/berita" component={BeritaPage} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/bimtek-summary" component={BimTekSummaryPage} />
        <Route path="/bimtek-form" component={BimTekFormPage} />
        <Route path="/bimtek-jadwal" component={BimTekJadwalPage} />
        <Route path="/tentang" component={TentangPage} />
        <Route path="/permintaan-data" component={PermintaanData} />
        <Route path="/permintaan-data-form" component={PermintaanDataForm} />
      </Switch>
    </AppLayout>
  );
}

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({}) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(AppRoutes));
