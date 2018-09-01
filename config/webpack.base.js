const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.s?css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ['css-loader', 'sass-loader']
          })
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            }
        }]
        }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
          template: './src/index.html', 
          filename: './index.html' 
        }),
        new ExtractTextPlugin('style.css')
    ]
  }