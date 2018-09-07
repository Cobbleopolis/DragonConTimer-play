'use strict';

var webpack = require('webpack'),
    jsPath = 'public/javascripts',
    path = require('path'),
    srcJsPath = path.join(__dirname, 'app/assets/javascripts'),
    srcCssPath = path.join(__dirname, 'app/assets/stylesheets'),
    nodePath = path.join(__dirname, '/node_modules');

var config = {
    target: 'web',
    context: __dirname,
    entry: {
        app: path.join(srcJsPath, 'index.tsx'),
        common: ['bootstrap-loader', 'font-awesome-sass-loader!./font-awesome-sass.config.js', 'react', 'react-dom', 'react-bootstrap']
        //, common: ['react-dom', 'react']
    },
    optimization: {
        noEmitOnErrors: true
    },
    resolve: {
        alias: {},
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        modules: ['node_modules', srcJsPath, jsPath]
    },
    output: {
        path: path.resolve(__dirname, jsPath),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[chunkhash].bundle.js',
        pathinfo: true
    },
    cache: true,
    watch: true,
    watchOptions: {
        poll: 300
    },
    profile: true,
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.sass$/,
                include: /\/app\/assets/,
                loader: 'style!css!sass-loader'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {warnings: false},
        //     output: {comments: false}
        // }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
        // new webpack.NoErrorsPlugin()
    ],
    devServer: {
        hot: true,
        inline: true,
        quiet: true,
        host: "0.0.0.0"
    }
};

module.exports = config;