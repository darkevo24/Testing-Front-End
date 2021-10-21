export const PRODUCTION_URI = ''; // Production url

export const DEV_ENV = 'development';
export const PRODUCTION_ENV = 'production';

export function getEnv() {
  const currentURL = window.location.href;
  if (currentURL.indexOf(PRODUCTION_URI) > -1) return PRODUCTION_ENV;
  return DEV_ENV;
}
