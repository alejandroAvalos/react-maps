const webpack = require('webpack')
var path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const featureFlags = require('./featureFlags.json')
let features_env = 'development'
const date = new Date().toString()
process.env.NODE_ENV = 'development'

console.log(
  'Features flags set: ',
  features_env,
  JSON.stringify(featureFlags[features_env], null, 2)
)

module.exports = env => {
  let template = path.join(__dirname, './public/index.html')

  return {
    mode: "none",
    entry: ['whatwg-fetch', '@babel/polyfill', './src/index.js'],

    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'react-map-bundle.js'
    },

    target: 'web',
    devtool: 'cheap-module-source-map',
    devServer: {
      static: path.join(__dirname, './public')
    },
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
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
                //modules: true
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
                modules: true
              }
            },
            { loader: 'postcss-loader' },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: () => {
          return `==* BuildDate: ${date} ==*\n ` + '\n\n'
        }
      }),

      new HtmlWebpackPlugin({
        template: template,
        inject: true
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer()]
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          ...featureFlags[features_env],
          __mode__: JSON.stringify('development'),
          NODE_ENV: '"development"'
        }
      })
    ]
  }
}
