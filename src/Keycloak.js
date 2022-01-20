import Keycloak from 'keycloak-js';

const stageConfig = new Keycloak({
  url: 'https://sso.deltadatamandiri.com/auth',
  realm: 'satu-data-portal-test',
  clientId: 'satu-data-portal-client',
  // clientSecret: 'a9b6a16e-f755-4938-bcb3-30b50ce1e83a', d51315f4-5e36-4dec-ae3e-2d2cb121dc25
  authServerUrl: 'https://sso.deltadatamandiri.com/auth',
  resource: 'satu-data-portal-client',
  publicClient: true,
  sslRequired: 'external',
  principalAttribute: 'preferred_username',
});

const prodConfig = new Keycloak({
  url: 'https://cas.data.go.id/auth/',
  realm: 'ckan-sdi',
  authServerUrl: 'https://cas.data.go.id/auth/',
  sslRequired: 'external',
  resource: 'portal-satu-data-client',
});

export const initOptions = {
  checkLoginIframe: false,
};

const configs = {
  staging: stageConfig,
  production: prodConfig,
};

const keycloakConfig = configs[process.env.REACT_APP_SSO_CONFIG || 'staging'];

export default keycloakConfig;
