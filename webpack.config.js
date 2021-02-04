const path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production';
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    output: {
            filename: isDevelopment ? '[name].js' : '[name].[hash].js',
            path: path.resolve(__dirname, 'dist'),
          },
    module: {
         rules: [
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
      extensions: ['.js', '.jsx']
    },
    plugins: [
            new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
          }),
          new CleanWebpackPlugin()
    ]
  }