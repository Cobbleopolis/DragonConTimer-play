'use strict';

var webpack = require('webpack'),
    jsPath = 'public/javascripts',
    path = require('path'),
    srcJsPath = path.join(__dirname, 'app/assets/javascripts'),
    config = require('./webpack.config.js');

var productionConfig = {
    debug: false,
    devtool: "source-map",
    watch: false
};

for (var key in productionConfig)
    if (productionConfig.hasOwnProperty(key))
        config[key] = productionConfig[key];

module.exports = config;