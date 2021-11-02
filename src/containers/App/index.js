/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GlobalStyle from 'global-styles';

import Notify, { Notification } from 'components/Notification';

const AdminRoutes = lazy(() => import('./AdminRoutes'));
const AppRoutes = lazy(() => import('./AppRoutes'));
const CMSRoutes = lazy(() => import('./CMSRoutes'));

function App(props) {
  return (
    <div>
      <Helmet titleTemplate="%s - Satu Data Portal" defaultTitle="Satu Data Portal">
        <meta name="description" content="Satu Data Portal" />
      </Helmet>
      <Switch>
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
