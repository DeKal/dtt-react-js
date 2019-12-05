import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';

module.exports = {
  entry: ["@babel/polyfill", "App.js"],
  output: {
    path: path.resolve("dist/"),
    filename: 'assets/bundle.js',
    publicPath: '/'
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  plugins: [

    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new CopyWebpackPlugin([
      { from: './src/assets/images/', to:'assets/images' },
      { from: './src/assets/sound/', to:'assets/sound' },
      { from: './src/assets/translations/', to:'assets/translations' }
    ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        // this is so that we can compile any React,
        // ES6 and above into normal ES5 syntax
        test: /\.(js|jsx)$/,
        // we do not want anything from node_modules to be compiled
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/',
            publicPath: 'assets/images/'
          }
        }]
      },
      {
        test: /\.(mp3|mp4)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/sound/',
            publicPath: 'assets/sound/'
          }
        }]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/',    // where the fonts will go
            publicPath: 'assets/fonts/'       // override the default path
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
 }
};
