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
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak, { initOptions } from 'Keycloak';
import 'react-tippy/dist/tippy.css';

import { fetchLoggedInUserInfo } from 'containers/Login/reducer';
import Notify, { Notification } from 'components/Notification';
import { getCookieByName, cookieKeys, removeAllCookie } from 'utils/cookie';
import { getGlobalData } from './reducer';

const AdminRoutes = lazy(() => import('./AdminRoutes'));
const AppRoutes = lazy(() => import('./AppRoutes'));
const CMSRoutes = lazy(() => import('./CMSRoutes'));

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    return dispatch(getGlobalData());
  }, []);

  const isTermAndConditionAccepted = getCookieByName(cookieKeys.isTermAndConditionAccepted);

  const history = useHistory();

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

  const handleOnTokens = (tokens) => {
    if (!tokens?.token) return false;
    dispatch(fetchLoggedInUserInfo(tokens.token));
    const currentPath = history.location.pathname;
    const termsAndConditionsPath = '/term-and-condition';
    if (!isTermAndConditionAccepted && currentPath !== termsAndConditionsPath) {
      history.push(termsAndConditionsPath);
    }
  };

  const handleOnEvent = (event) => {
    if (event === 'onTokenExpired') {
      keycloak.logout();
      removeAllCookie();
      history.push('/home');
    }
  };

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} onTokens={handleOnTokens} onEvent={handleOnEvent}>
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
    </ReactKeycloakProvider>
  );
}

// eslint-disable-next-line no-empty-pattern
const mapStateToProps = ({}) => {
  return {};
};

export default withRouter(connect(mapStateToProps)(App));
