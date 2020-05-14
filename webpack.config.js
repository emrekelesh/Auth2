const webpack = require('webpack')

const merge = require('webpack-merge')


const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const commonConfig =
    {
        devServer: {
            historyApiFallback: true,
            contentBase: './',
            watchOptions: {
                poll: 1000
            }
        },
        entry: {
            libs: ['react', 'react-dom'],
            app: './src/client/index.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        },
                        'css-loader'
                    ]
                }
            ]
        },
    }
const devConfig = {
    output: {
        path: __dirname + '/public',
        publicPath: 'http://localhost:8080/',
        chunkFilename: 'js/[name].js',
        filename: 'js/[name].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        })
    ]
}
const productConfig = {
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        chunkFilename: 'js/[name].js',
        filename: 'js/[name].js'
    },
    optimization: {
        namedModules: false,
        namedChunks: false,
        nodeEnv: 'production',
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        splitChunks: {
            hidePathInfo: true,
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
        },
        noEmitOnErrors: true,
        checkWasmTypes: true,
        minimize: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new CompressionPlugin(),
        new OptimizeCssAssetsPlugin()
    ]
}
module.exports = function (env) {
    console.log('webpack env', env)
    if (env === 'dev') {
        return merge(commonConfig, devConfig)
    } else return merge(commonConfig, productConfig)
}