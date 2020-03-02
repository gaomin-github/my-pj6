const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    mode: 'development',
    // mode:'production',
    entry: {
        main: ["./src/main.js"],
        main1: ["./src/main1.js"]
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../built'),
    },
    // 扩容
    performance: {
        hints: 'warning',
        maxEntrypointSize: 5000000,
        maxAssetSize: 3000000
    },
    devServer: {
        historyApiFallback: true,
        clientLogLevel: 'info',
        host: '0.0.0.0',
        port: 8086,
        open: false,
        contentBase: path.resolve(__dirname, '../'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.json', '.tsx', '.ts', '.vue', '.jpg'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [

            // {
            //   test:/\.(vue|js)$/,
            //   loader:'eslint-loader',
            //   enforce:'pre',
            //   include:[path.resolve(__dirname,'../src')],
            //   options:{
            //       formatter:require('eslint-friendly-formatter'),
            //       emitWarning:true
            //   }
            // },
            {
                test: /\.(ts|js)?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },

            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.(vue)?$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, '../src')
                ]
            },
            //   {
            //       test:/\.(vue|js)/,
            //       use:{
            //           loader:path.resolve(__dirname,'../src/webpackLoaders/loaderTest.js'),
            //           options:{
            //               name:'alice A'
            //           }
            //       },
            //       include:[path.resolve(__dirname,'../src')]
            //   },
            {
                test: /\.(css|scss)$/,
                use: [
                    MinCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, '../src')
                ]
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                use: ['url-loader'],
                include: [
                    path.resolve(__dirname, '../src'),
                    path.resolve(__dirname, '../static')
                ]
            }
        ]
    },
    devtool: 'inline-source-map',

    // optimization:{
    //     // 抽取共用代码
    //   splitChunks:{
    //       cacheGroups:{
    //           commons:{
    //               chunks:'all',
    //               name:'vendor',
    //               test:/[\\/]node_modules[\\/]/
    //           }
    //       }
    //   },
    //     // 默认开启压缩代码
    //   minimizer:[
    //       // 优化合并压缩css
    //       new OptimizeCSSAssetsPlugin({}),
    //       // production模式下，webpack4会自动压缩js文件
    //       // js文件压缩插件
    //       new UglifyJsPlugin({
    //           cache:true,
    //           parallel:true,
    //           sourceMap:true
    //       })
    //   ]
    // },
    plugins: [
        new CleanWebpackPlugin(['built'], {
            root: path.resolve(__dirname, '..'),
            dry: false
        }),
        new HtmlWebpackPlugin({
            title: 'mypj6 management',
            template: './template.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            Vue: ['vue/dist/vue.esm.js', 'default']
        }),
        new MinCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ],
    stats: 'none'
}