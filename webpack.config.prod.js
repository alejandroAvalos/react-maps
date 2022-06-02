var webpack = require('webpack')
var path = require('path')
// var loaders = require('./webpack.loaders.prod');
var HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //installed via npm
// const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = env => {
  const dateSettings = {
    timeZone: 'America/Chicago',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  }

  const gitBranch = require('child_process')
    .execSync(
      'git symbolic-ref -q --short HEAD || git describe --tags --exact-match'
    ) //gets branch or tag name
    .toString()
    .trim()

  var buildTime = `BuildDate:: ${new Date().toLocaleString(
    'en-US',
    dateSettings
  )}\n\n
  build from git branch ${gitBranch} \n\n
  `

  return {
    mode: "production",
    entry: ['whatwg-fetch', '@babel/polyfill', './src/index.js'],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'blogs-bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss']
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              // modules: true,
              presets: [['@babel/preset-env'], ['@babel/preset-react']]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                // modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            { loader: 'postcss-loader' }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                // modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            { loader: 'postcss-loader' },
            {
              loader: 'sass-loader'
              // options: {
              //   includePaths: ["../sass/src"]
              // }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.BannerPlugin({
        banner: buildTime
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        files: {
          js: ['react-map-bundle.js']
        }
      })
    ]
  }
}
