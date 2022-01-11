/**
 * index.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { HelmetProvider } from 'react-helmet-async';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from 'Keycloak';

import { configureAppStore } from 'store/configureStore';
import history from 'store/history';
import { Loader } from 'components/Loader';
import reportWebVitals from './reportWebVitals';
import App from './containers/App';

import './styles.scss';
import './locales/i18n';
import { cookieKeys, setCookie } from './utils/cookie';

const initialState = {};
const store = configureAppStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ checkLoginIframe: false }}
        onTokens={(tokenLogger) => {
          if (!tokenLogger?.token) return;
          setCookie(cookieKeys.token, tokenLogger.idToken);
        }}>
        <ConnectedRouter history={history}>
          <HelmetProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </HelmetProvider>
        </ConnectedRouter>
      </ReactKeycloakProvider>
    </Suspense>
  </Provider>,
  MOUNT_NODE,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
