/* eslint-disable */

const path = require('path')
const webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'development'

const getEntry = () => {
  const baseEntryPoints = ['./js/ClientApp.jsx']
  if (NODE_ENV === 'development') {
    return baseEntryPoints.concat([
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server'
    ])
  } else {
    return baseEntryPoints
  }
}

const getPlugins = () => {
  const basePlugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || '')
      }
    })
  ]

  if (NODE_ENV === 'development') {
    return basePlugins.concat([new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()])
  } else {
    return basePlugins
  }
}

const getDevtool = () => {
  if (NODE_ENV === 'development') {
    return 'cheap-eval-source-map'
  } else {
    return false
  }
}

const getDevServer = () => {
  if (NODE_ENV === 'development') {
    return {
      hot: true,
      historyApiFallback: true,
      contentBase: './public'
    }
  } else {
    return undefined
  }
}

const config = {
  context: __dirname,
  entry: getEntry(),
  devtool: getDevtool(),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: getDevServer(),
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['js', 'node_modules']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: getPlugins(),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}

module.exports = config
