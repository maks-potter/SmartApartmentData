/* tslint:disable */

const path              = require('path');
const webpack           = require('webpack');
const SpritePlugin      = require('svg-sprite-loader/plugin');
const svgoOptions       = require('./build/svgo-options');
const config            = require('./build/config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entryPoints = ['runtime', 'polyfills', 'tracker', 'vendor', 'main'];

const env = Object.keys(process.env)
  .filter((key) => {
    return key.startsWith('SA_');
  })
  .reduce((result, key) => {
    result[key] = JSON.stringify(process.env[key]);

    return result;
  }, {});

env.SA_CURRENT_LOCALE = JSON.stringify(process.env.SA_LOCALE || 'en');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@ui-simple': path.resolve(__dirname, './projects/ui-simple/src/lib/'),
      '@sa-core': path.resolve(__dirname, './projects/core/src/lib/'),
    },
  },
  output: {
    filename: (chunkData) => {
      return '[name].[chunkhash:20].js';
    },
    chunkFilename: '[name].[chunkhash:20].js',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        include: [
          config.iconsDir,
        ],
        loaders: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
            },
          },
          {
            loader: path.resolve('./build/ignore-next-loaders.js'),
            options: {
              skipCount: 1,
            },
          },
          {
            loader: 'svgo-loader',
            options: svgoOptions,
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
      SA_TRANSLATION_PATH: JSON.stringify(`${config.localeDir}/${config.locale}-plural.po`),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      filename: './index.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: true,
      cache: true,
      showErrors: true,
      chunks: 'all',
      chunksSortMode: function sort (left, right) {
        const leftIndex  = entryPoints.indexOf(left.names[0]);
        const rightIndex = entryPoints.indexOf(right.names[0]);

        return leftIndex - rightIndex;
      },
    }),
    new SpritePlugin({
      plainSprite: true,
    }),
  ],
  optimization: {
    runtimeChunk: false,
  },
};
