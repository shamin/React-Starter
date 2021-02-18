const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getVariables(mode) {
  let config = require('./dev.json');
  if (mode === 'production') {
    config = require('./prod.json');
  }

  const envVariables = {};
  Object.keys(config).forEach((key) => {
    envVariables[key] = JSON.stringify(config[key]);
  });

  return envVariables;
}

module.exports = (_, argv) => {
  const envVariables = getVariables(argv.mode);
  console.log('Environment variables used: ', envVariables);

  return {
    output: {
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
        favicon: 'src/assets/images/logo.svg',
      }),
      new webpack.DefinePlugin({
        'process.env': envVariables,
      }),
    ],
    devServer: {
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  };
};
