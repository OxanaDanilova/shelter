/* const webpack = require('webpack'); */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: './src/pages/main/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './',
          }},          
          'css-loader'
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            }},
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
              
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              /* mimetype: 'image/png' */
              limit: 8192,
              name: 'assets/images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
     new CopyPlugin({
      patterns: [ {from: 'src/assets/images', to: '.assets/images'} ],
     }), 
    new HtmlWebpackPlugin({
        template: './src/pages/main/index.html',
        filename: './index.html'      
    }),
    new MiniCssExtractPlugin(/* {
      filename: './[name.css'   
    } */),
    new CleanWebpackPlugin()
  ]
};

module.exports = config;