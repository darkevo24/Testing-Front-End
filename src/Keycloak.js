import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
  url: 'https://sso.deltadatamandiri.com/auth',
  realm: 'satu-data-portal-test',
  clientId: 'satu-data-portal-client',
  clientSecret: 'd51315f4-5e36-4dec-ae3e-2d2cb121dc25',
  authServerUrl: 'https://sso.deltadatamandiri.com/auth',
  resource: 'satu-data-portal-client',
  publicClient: true,
  sslRequired: 'external',
  principalAttribute: 'preferred_username',
});

export default keycloak;
