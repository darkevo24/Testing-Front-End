import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
  url: 'https://sso.deltadatamandiri.com/auth',
  realm: 'satu-data-portal-test',
  clientId: 'satu-data-portal-client',
});

export default keycloak;
