import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
  url: 'https://sso.deltadatamandiri.com/auth',

  // Swapnalalee's config
  realm: 'satu-data-portal-test',
  clientId: 'satu-data-portal-client',

  // Arif's config'
  // realm: 'sdi-be-realm',
  // clientId: 'sdi-be-client',
  // client_secret: 'd51315f4-5e36-4dec-ae3e-2d2cb121dc25',
});

export default keycloak;
