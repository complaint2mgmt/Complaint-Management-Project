const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy for the Admin Service
  app.use(
    '/api/admin',
    createProxyMiddleware({
      target: 'http://localhost:8082',
      changeOrigin: true,
      pathRewrite: {
        '^/api/admin': '/api/admin',
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request to Admin Service:', req.path);
      },
    })
  );

  // Proxy for the Agent Service
  app.use(
    '/api/agents',
    createProxyMiddleware({
      target: 'http://localhost:8083',
      changeOrigin: true,
      pathRewrite: {
        '^/api/agents': '/api/agents',
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request to Agent Service:', req.path);
      },
    })
  );
  
  // Proxy for the Complaint Service
  app.use(
    '/api/complaints',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
      pathRewrite: {
        '^/api/complaints': '/api/complaints',
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request to Complaint Service:', req.path);
      },
    })
  );
};
