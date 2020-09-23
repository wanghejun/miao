let path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry:'./src/main.js',//入口
  output:{//出口
    path:path.resolve(__dirname,'dist'),
    filename: 'bundle.js',
    // publicPath:'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
        }, {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
        }, {
            loader: "sass-loader" // 将 Sass 编译成 CSS
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },{
        test: /\.vue$/,
        use: [ 'vue-loader' ]
      }
    ]
  },
  resolve: {
    //别名
    extensions:['.js','.css','.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  },
  plugins:[
    new webpack.BannerPlugin('最终版权归hejun所有'),
    new HtmlWebpackPlugin({
      template:'index.html'
    }),
    new UglifyWebpackPlugin()
  ],
  devServer:{
    contentBase:'./dist',
    inline:true
  }
}
