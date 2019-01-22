const merge = require('webpack-merge');
const common = require('./webpack.common.js')();

module.exports = merge(common, {
        mode: 'development',
        devtool: 'inline-source-map',
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
            runtimeChunk: 'single'
        },

});