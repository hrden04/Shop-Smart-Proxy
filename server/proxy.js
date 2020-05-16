const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/../public')));

const options = {
  target: 'http://www.example.org', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/api/old-path': '/api/new-path', // rewrite path
    '^/api/remove/path': '/path' // remove base path
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    'dev.localhost:80': 'http://localhost:8000'
  }
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server
const app = express();
app.use('/api', exampleProxy);
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});


module.exports = app;