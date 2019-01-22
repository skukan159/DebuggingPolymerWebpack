const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
    //Webcomponents polyfill applied in the index.html
    {
        from: path.resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
        to: path.join(__dirname, 'wwwroot'),
        flatten: true
    }, 
    {
        from: path.resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
        to: path.join(__dirname, 'wwwroot', 'bundles'),
        flatten: true
    },
    {
        from: path.resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
        to: path.join(__dirname, 'wwwroot'),
        flatten: true
    }
];
const assets = [
    {
        from: 'manifest.json',
        to: path.resolve(__dirname, 'wwwroot'),
        context: './src/'
    },
    {
        from: './images/*',
        to: path.resolve(__dirname, 'wwwroot'),
        context: './src/'
    },
    {
        from: './images/manifest/*',
        to: path.resolve(__dirname, 'wwwroot'),
        context: './src/'
    }
];

module.exports = function (env) {
    return {
        entry: './src/index.js',
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'wwwroot'),
            filename: "[name].[contenthash].js",  
            chunkFilename: '[name].[contenthash].js',
        },
        //Returning promises while lazy loading chunks
        node: {
            dns: 'mock',
            net: 'mock'
        },
      

        module: {
            rules: [       
                {
                    "test": /\.html$/,
                    "use": [{
                        loader: 'html-loader',
                    }]
                },
                {
                    test: /\.json$/,
                    use: 'json-loader'
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '/img/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
       
        resolve: {
            // options for resolving module requests
            // directories where to look for modules
            modules: [
                "node_modules",
                path.resolve(__dirname, "src")
            ],
            extensions: [".js", ".json"],

            //Used to provide global variable without defining it in the index.html
            /*alias: {
                'markjs': path.resolve(__dirname, "./node_modules/mark.js/dist/mark.min.js"),
            }*/


        },

        plugins: [
            new webpack.HashedModuleIdsPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/index.html'}),
            /*new webpack.ProvidePlugin({
                //Provides global variable without defining in the index.html
                IntlMessageFormat: ['intl-messageformat/index.js', 'default'],
                'Mark': 'markjs'
            }),*/
            new CleanWebpackPlugin(['wwwroot']),
            new WorkboxPlugin.GenerateSW({
                // these options encourage the ServiceWorkers to get in there fast 
                // and not allow any straggling "old" SWs to hang around
                swDest: 'sw.js',
                clientsClaim: true,
                skipWaiting: true
            }),
            new CopyWebpackPlugin([...polyfills, ...assets]),
        ],
        watch: true,
        watchOptions: {
            aggregateTimeout: 1000, // in ms
            // aggregates multiple changes to a single rebuild
            poll: true,
            poll: 500, // interval in ms
            // enables polling mode for watching
            // must be used on filesystems that doesn't notify on change
            // i. e. nfs shares
        },
       

    }
};