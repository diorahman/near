#!/bin/env node

var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/teman');

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

var api = require('./controller/api.js');

app.get('/features/:type?', api.list);
app.get('/features/:lat/:lon/:dist?', api.near);

app.listen(8000)
