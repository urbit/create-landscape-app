const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const urbitrc = require('./.urbitrc');
const fs = require('fs-extra');

function copy(src,dest) {
  return new Promise((res,rej) =>
    fs.copy(src,dest, err => err ? rej(err) : res()));
}

class UrbitShipPlugin {
  constructor(urbitrc) {
    this.piers = urbitrc.URBIT_PIERS;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise(
      'UrbitShipPlugin',
      async (compilation) => {
        const src = './urbit/app'

        return Promise.all(this.piers.map(pier => {
          const dst = path.resolve(pier, 'app');
          copy(src, dst).then(() => {
            pier = pier.split('/');
          });
        }));
      }
    );
  }
}

let devServer = {
  contentBase: path.resolve('./urbit/app/%APPNAME%/js'),
  hot: true,
  port: 9000,
  historyApiFallback: true,
  writeToDisk: (filePath) => {
    return /index.js$/.test(filePath);
  }
};

if(urbitrc.URL) {
  devServer = {
    ...devServer,
    index: '',
    proxy: {
      '/~%APPNAME%/js/index.js': {
        target: 'http://localhost:9000',
        pathRewrite: (req, path) => '/index.js'
      },
      '**': {
        target: urbitrc.URL,
        // ensure proxy doesn't timeout channels
        proxyTimeout: 0
      }
    }
  };
}

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/transform-runtime',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-class-properties',
              'react-hot-loader/babel'
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'inline-source-map',
  devServer: devServer,
  plugins: [
    new UrbitShipPlugin(urbitrc)
  ],
  watch: true,
  output: {
    filename: 'index.js',
    chunkFilename: 'index.js',
    path: path.resolve('./urbit/app/%APPNAME%/js'),
    publicPath: '/'
  },
  optimization: {
    minimize: false,
    usedExports: true
  }
};
