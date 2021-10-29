const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const appDomain = process.env.REACT_APP_DOMAIN;
  const proxyOptions = {
    target: `http://${appDomain}`,
    changeOrigin: true,
  };
  app.use('/api', createProxyMiddleware(proxyOptions));
  app.use('/data', createProxyMiddleware(proxyOptions));
};
