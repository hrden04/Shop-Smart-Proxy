const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('express-http-proxy');

const PORT = 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

// Question answer module
app.use('/api/products/questions', proxy('http://ec2-18-191-175-115.us-east-2.compute.amazonaws.com/', {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/products/questions${queryString ? `?${queryString}` : ''}`;
  },
}));

app.use('/api/products/answers', proxy('http://ec2-18-191-175-115.us-east-2.compute.amazonaws.com/', {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/products/answers${queryString ? `?${queryString}` : ''}`;
  },
}));

// Similar Products
app.use('/api/similar_products/feedback', proxy('http://ec2-3-20-206-136.us-east-2.compute.amazonaws.com/api/similar_products/feedback', {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/similar_products/feedback${queryString ? `?${queryString}` : ''}`;
  },
}));

app.use('/api/similar_products', proxy('http://ec2-3-20-206-136.us-east-2.compute.amazonaws.com/api/similar_products', {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/similar_products${queryString ? `?${queryString}` : ''}`;
  },
}));

// reviews
app.use('/api/products/reviews', proxy('http://ec2-3-17-135-194.us-east-2.compute.amazonaws.com/', {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/products/reviews${queryString ? `?${queryString}` : ''}`;
  },
}));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Now listening on port: ', PORT));
