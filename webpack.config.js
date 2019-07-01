const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebPackRootPlugin = require('html-webpack-root-plugin');
const webpackMerge = require("webpack-merge");
const WebpackPwaManifest = require('webpack-pwa-manifest');
var package = require('./package.json');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge({
    entry: {
      site: './src/site/site.tsx',
      game: './src/index.ts',

    },
    mode,
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          exclude: [
            path.resolve(__dirname, 'node_modules/excalibur')
          ],
          enforce: "pre",
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|bmp|wav|ogg|mp3)$/,
          use: [{
            loader: 'file-loader',
            options: {
              emitFile: true
            }
          }]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: '[name].js',
      sourceMapFilename: '[file].map',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebPackPlugin({
        title: 'Skeleton Flip',
        filename: "game/index.html",
        chunks: ['game']
      }),
      new HtmlWebPackPlugin({
        filename: 'index.html',
        chunks: ['site']

      }),
      new HtmlWebPackRootPlugin(),
      new HtmlWebPackRootPlugin('modal'),
      new WebpackPwaManifest({
        filename: "manifest.json",
        name: 'Skeleton Flip',
        short_name: 'Flip',
        background_color: '#ffffff',
        icons: [
          {
            src: path.resolve('src/images/icon-192.png'),
            size: '192x192'
          },
          {
            src: path.resolve('src/images/icon-512.png'),
            size: '512x512'
          }
        ]
      }),
    ]
  },
    modeConfig(mode)
  );
};
