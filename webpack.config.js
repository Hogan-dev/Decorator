const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: './src/js/index.js',
        decorator: './src/js/decorator/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'decorator.html',
            template: './src/template/decorator.html',
            chunks: ['decorator']
        })
    ],
    devServer: {
        contentBase: './dist',
        //默认8080，可不写
        port: 8081,
        //热更新，无需更新
        hot: true
    }
}