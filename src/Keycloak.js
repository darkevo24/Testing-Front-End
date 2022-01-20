import Keycloak from 'keycloak-js';
import { sdiEnv } from 'utils/constants';

export const initOptions = {
  checkLoginIframe: false,
};

const stageConfig = {
  url: 'https://sso.deltadatamandiri.com/auth',
  realm: 'satu-data-portal-test',
  clientId: 'satu-data-portal-client',
  // clientSecret: 'a9b6a16e-f755-4938-bcb3-30b50ce1e83a', d51315f4-5e36-4dec-ae3e-2d2cb121dc25
  authServerUrl: 'https://sso.deltadatamandiri.com/auth',
  resource: 'satu-data-portal-client',
  publicClient: true,
  sslRequired: 'external',
  principalAttribute: 'preferred_username',
};

const prodConfig = {
  url: 'https://cas.data.go.id/auth/',
  realm: 'ckan-sdi',
  clientId: 'portal-satu-data-client',
  authServerUrl: 'https://cas.data.go.id/auth/',
  resource: 'portal-satu-data-client',
  sslRequired: 'external',
};

const configs = {
  staging: stageConfig,
  production: prodConfig,
};

const keycloakConfig = configs[sdiEnv] || configs['staging'];

const keyclock = new Keycloak(keycloakConfig);

export default keyclock;
