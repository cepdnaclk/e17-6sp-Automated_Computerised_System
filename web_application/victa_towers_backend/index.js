const express = require("express");
const login = require('./routes/login');
const signup = require('./routes/signup');
const product = require('./routes/product');
const factoryProduct = require('./routes/facProduct')
const shop = require('./routes/shop');
const distributedProduct = require('./routes/disProduct');
const issuedProduct = require('./routes/issueProduct');

const app = express();

app.use(express.json());

app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/product', product);
app.use('/api/shop', shop);
app.use('/api/fac-product', factoryProduct);
app.use('/api/dis-product', distributedProduct);
app.use('/api/issue-product', issuedProduct);

process.env.NODE_ENV = 'production';
app.listen(8080, () => console.log("Listening on port 8080..."));
