/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GlobalStyle from 'global-styles';

import { AppLayout } from 'layouts/AppLayout';
import { AuthLayout } from 'layouts/AuthLayout';

const BerandaPage = lazy(() => import('containers/Beranda'));
const LoginPage = lazy(() => import('containers/Login'));
const DafterPage = lazy(() => import('containers/Dafter'));

function App(props) {
  return (
    <Router>
      <div>
        <Helmet titleTemplate="%s - Satu Data Portal" defaultTitle="Satu Data Portal">
          <meta name="description" content="Satu Data Portal" />
        </Helmet>
        <Switch>
          <Route path="/dafter" component={DafterPage} />
          <Route path="/auth">
            <Switch>
              <AuthLayout>
                <Route path="/auth/login" component={LoginPage} />
              </AuthLayout>
            </Switch>
          </Route>
          <Route path="/">
            <AppLayout>
              <Switch>
                <Route exact path="/" component={BerandaPage} />
              </Switch>
            </AppLayout>
          </Route>
        </Switch>
        <GlobalStyle />
      </div>
    </Router>
  );
}

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({}) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(App));