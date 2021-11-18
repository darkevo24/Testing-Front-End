/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GlobalStyle from 'global-styles';

import Notify, { Notification } from 'components/Notification';

const AdminRoutes = lazy(() => import('./AdminRoutes'));
const AppRoutes = lazy(() => import('./AppRoutes'));
const CMSRoutes = lazy(() => import('./CMSRoutes'));

function App(props) {
  if (!window.localStorage.getItem('beritalayout')) {
    window.localStorage.setItem(
      'beritalayout',
      '{"kiri":[{"label":"Search","uid":"t6fJQutD0","component":"search"},{"label":"Berita Utama","uid":"k1_zI4m8Ct","component":"beritaUtama"},{"label":"Berita Utama Lainnya","uid":"k1_zI4m8Ct1","component":"beritaUtamaLain","props":{"jumlah":3,"columns":3}},{"label":"Kegiatan Satu Data Indonesia","uid":"k1_zI4m8Ct2","component":"kegiatanSatuData","props":{"jumlah":3,"columns":3}},{"label":"List Berita","uid":"k1_zI4m8Ct3","component":"listBerita","props":{"jumlah":4,"columns":1}}],"kanan":[{"label":"Topik Populer","uid":"WAPu69Mnq","component":"topikPopuler","props":{"jumlah":3}},{"label":"Berita Lainnya","uid":"WAPu69Mnq1","component":"beritaLainnya"},{"label":"Populer","uid":"WAPu69Mnq2","component":"populer","props":{"jumlah":5,"columns":1}},{"label":"Tweets","uid":"WAPu69Mnq3","component":"tweets"}],"inactive":[]}',
    );
  }

  return (
    <div>
      <Helmet titleTemplate="%s - Satu Data Portal" defaultTitle="Satu Data Portal">
        <meta name="description" content="Satu Data Portal" />
      </Helmet>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/cms" component={CMSRoutes} />
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/" component={AppRoutes} />
      </Switch>
      <GlobalStyle />
      <Notification
        ref={(ref) => {
          if (ref && !Notify.notificationRef) {
            Notify.setRef(ref);
          }
        }}
      />
    </div>
  );
}

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({}) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(App));
