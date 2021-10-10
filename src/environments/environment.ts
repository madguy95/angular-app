// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  clientId : 'client-web',
  clientSecret : 'd6a94e4b-51d4-4aa3-be4b-eaea0dd0491d',
  redirectUri : 'http://localhost:8089/',
  keycloak_host : 'http://poordev.ddns.net:31080',
  keycloak_realm : 'SpringBootKeycloak'
};
