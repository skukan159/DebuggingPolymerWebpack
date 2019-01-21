const webpack = require('webpack');
const path = require('path');
//Copies files from src to wwwroot
const CopyWebpackPlugin = require('copy-webpack-plugin');
//Generates Service Workers
//const WorkboxPlugin = require('workbox-webpack-plugin');
//Used for cleaning wwwroot folder
const CleanWebpackPlugin = require('clean-webpack-plugin');
//Used to generate html file
const HtmlWebpackPlugin = require('html-webpack-plugin');

//TerserPlugin is used for minification without transpiling code
//const TerserPlugin = require('terser-webpack-plugin')
//UglifyJS is used for minification with transpiling code
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //Not working at the moment

//const BabiliPlugin = require("babili-webpack-plugin"); //testing, UglifyJs alternative
//const MinifyPlugin = require("babel-minify-webpack-plugin"); //testing, UglifyJs alternative
//const fs = require('fs'); //testing
//const { BabelMultiTargetPlugin } = require('webpack-babel-multi-target-plugin');//testing

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
    //Webcomponents polyfill applied in the index.html
    {
        from: path.resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
        to: path.join(__dirname, 'wwwroot'),
        flatten: true
    },
        //Not used right now but might be useful in the future
        {
            from: path.resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
            to: path.join(__dirname, 'wwwroot'),
            flatten: true
        },
];

module.exports = function (env) {
    return {
        mode: 'development',
        devtool: 'inline-source-map',
        entry: './src/index.js',
        output: {
            publicPath: '/',
            // options related to how webpack emits results
            path: path.resolve(__dirname, 'wwwroot'), // We want to output all of our files to wwwroot folder
            //Contenthash is changed only if the content of the file is changed
            filename: "[name].[contenthash].js",  
            chunkFilename: '[name].[contenthash].js',
        },
        //Added to fix an error caused by returning promises while lazy loading chunks
        node: {
            dns: 'mock',
            net: 'mock'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                       test: /[\\/]node_modules[\\/]/,
                       name: 'vendors',
                       chunks: 'all'
                    }
                }
            },
            runtimeChunk: 'single',
            minimize: true,
            minimizer: [
                 new UglifyJsPlugin({
                    test: /\.js(\?.*)?$/i,
                 })
             ],
             usedExports: true,
             sideEffects: false
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                   //exclude: /node_modules/, commented out in attempt to fix Uglifyjs error
                    use: {
                        loader: 'babel-loader',
                       /* options: {
                            ...JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc'))),
                          },*/
                    }
                },
                {
                    "test": /\.html$/,
                    "use": [{
                        loader: 'html-loader',
                    }]
                }
               
            ]
        },
       
        resolve: {
            modules: [
                "node_modules",
                path.resolve(__dirname, "src")
            ],
            extensions: [".js", ".json"],
        },

        plugins: [
            /*new TerserPlugin({ //Does not work
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),*/
            //new MinifyPlugin(), //Does not work
            new webpack.HashedModuleIdsPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/index.html'}),
            new CleanWebpackPlugin(['wwwroot']),
           
            new CopyWebpackPlugin([...polyfills]),
        ],

       /* devServer: {
            contentBase: './wwwroot'
       },*/
 /*
        watch: true,
        watchOptions: {
            aggregateTimeout: 1000, // in ms
            // aggregates multiple changes to a single rebuild
            poll: true,
            poll: 500, // interval in ms
            // enables polling mode for watching
            // must be used on filesystems that doesn't notify on change
            // i. e. nfs shares
        },*/

    }
};