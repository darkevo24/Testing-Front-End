import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
  url: 'https://sdmx.satudata.go.id/auth',
  realm: 'sdi-be-realm',
  clientId: 'sdi-be-client',
});

export default keycloak;
