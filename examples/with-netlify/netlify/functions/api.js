'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.get('/.netlify/functions/api', (req, res) => {
    res.json({
        message: "/"
    });
});

app.get('/.netlify/functions/api/signin', (req, res) => {
    res.json({
        message: "/signin"
    });
});

module.exports.app = app;
module.exports.handler = serverless(app);