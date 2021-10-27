const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const target = process.env.REACT_APP_DOMAIN;
  const proxyOptions = {
    target,
    changeOrigin: true,
  };
  app.use('/api', createProxyMiddleware(proxyOptions));
  app.use('/data', createProxyMiddleware(proxyOptions));
};
