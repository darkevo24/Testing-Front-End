/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import GlobalStyle from 'global-styles';
import { request } from 'utils/request';
import Notify, { Notification } from 'components/Notification';
import { cookieKeys, getCookieByName } from '../../utils/cookie';

const AdminRoutes = lazy(() => import('./AdminRoutes'));
const AppRoutes = lazy(() => import('./AppRoutes'));
const CMSRoutes = lazy(() => import('./CMSRoutes'));

function App(props) {
  const history = useHistory();
  const token = getCookieByName(cookieKeys.token);

  function hashLinkScroll() {
    const { hash } = window.location;
    if (hash !== '') {
      // Push onto callback queue so it runs after the DOM is updated,
      // this is required when navigating from a different page so that
      // the element is rendered on the page before trying to getElementById.
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 100);
    }
  }

  useEffect(() => {
    history.listen(hashLinkScroll);
  }, []);

  useEffect(() => {
    if (!token) return;
    request('https://sdmx.satudata.go.id/portal/v1/jwt-info', { method: 'GET' }).then((res) => {
      debugger;
    });
  }, [token]);

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
