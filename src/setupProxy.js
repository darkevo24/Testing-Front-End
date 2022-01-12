const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const appDomain = process.env.REACT_APP_DOMAIN;
  const proxyOptions = {
    target: `https://${appDomain}`,
    changeOrigin: true,
  };
  const urlPaths = ['/api', '/api-be', '/data'];
  urlPaths.forEach((url) => app.use(url, createProxyMiddleware(proxyOptions)));
};
