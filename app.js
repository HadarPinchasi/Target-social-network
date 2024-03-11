// JavaScript source code 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const articles = require('./routes/article');
const users = require('./routes/users');
const login = require('./routes/login');
/*const jwt = require("jsonwebtoken")
*/
require('custom-env').env(process.env.NODE_ENV, './config');
mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
var app = express();
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/articles', articles);
app.use('/users', users);
app.use('/tokens', login);

app.listen(process.env.PORT);
