const express = require("express");
const login = require('./routes/login');
const signup = require('./routes/signup');
const app = express();

app.use(express.json());

app.use('/api/login', login);
app.use('/api/signup', signup);


process.env.NODE_ENV = 'production';
app.listen(4000, () => console.log("Listening on port 4000..."));
