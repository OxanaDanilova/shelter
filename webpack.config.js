const path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production';
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    output: {
            filename: isDevelopment ? '[name].js' : '[name].[hash].js',
            path: path.resolve(__dirname, 'dist'),
          },
    module: {
         rules: [
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader'
            ],
            exclude: /\.module\.css$/
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
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader'
            ]
          },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: { minimize: !isDevelopment }
              }
      ]
    }
]
      },
    resolve: {
      extensions: ['.js', '.jsx', '.scss']
    },
    plugins: [
            new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
          }),
          new CleanWebpackPlugin(),
          new MiniCssExtractPlugin({
                  filename: isDevelopment ? '[name].css' : '[name].[hash].css',
                  chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
                })
    ]
  }