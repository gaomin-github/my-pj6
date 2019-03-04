const path=require('path');
const webpack=require('webpack');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const VueLoaderPlugin=require('vue-loader/lib/plugin');
module.exports={
    entry:{
        main:["./src/main.js"]
    },
    output:{
        filename:'[name].[hash].js',
        path:path.resolve(__dirname,'../built'),
    },
    devServer:{
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /.*/, to: '/built/index.html' },
        //     ],
        // },
        historyApiFallback:true,
        clientLogLevel:'info',
        host:'localhost',
        port:8086,
        open:true,
        contentBase:'./built',
        publicPath:'/',
    },
    resolve:{
      extensions:['.js','.json','.tsx','.ts','.vue'],
      alias:{
          'vue$':'vue/dist/vue.esm.js'
      }
    },
    module:{
      rules:[
          {
              test:/\.(ts|tsx)?$/,
              loader:'ts-loader',
              options:{
                  appendTsSuffixTo:[/\.vue$/]
              }
          },
          {
              test:/\.(tsx|vue)?$/,
              loader:'vue-loader',
              exclude:/node_modules/
          },
          {
              test:/\.(css|scss)$/,
              loader:['style-loader','css-loader','sass-loader'],
              exclude:/node_modules/
          }
      ]
    },
    devtool:'inline-source-map',
    plugins:[
        new CleanWebpackPlugin(['built'],{
            root:path.resolve(__dirname,'..'),
            dry:false
        }),
        new HtmlWebpackPlugin({
            title:'mypj6 management',
            template:'./template.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
    ]
}