const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    [ '/VoteService/vote/*', '/VoteService/vote' ],
    createProxyMiddleware({
      target: 'http://20.198.108.29.sslip.io',
      changeOrigin: true,
    //   pathRewrite: {
    //     '^/VoteService': '', // remove the /api prefix before forwarding the request to the target
    //   },
    })
  );

};
