const merge = require('webpack-merge');
const common = require('./webpack.common.js')();
const TerserPlugin = require('terser-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
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

        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    sourceMap: true,
                    parallel: true,
                    ecma: undefined,
                    compress: true,
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            })
        ],
        //concatenateModules: true
        usedExports: true,
        sideEffects: false
    },

});