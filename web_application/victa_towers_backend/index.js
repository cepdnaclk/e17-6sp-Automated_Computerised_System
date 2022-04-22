const express = require("express");
const login = require('./routes/login');

const app = express();

app.use(express.json());

app.use('/api/login', login);

app.listen(4000, () => console.log("Listening on port 4000..."));
