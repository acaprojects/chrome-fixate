import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {

  context: path.join(__dirname, 'src'),

  entry: {
    background: './js/background.js',
    main: './js/main.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      title: 'Fixate',
      filename: 'main.html',
      chunks: ['main'],
      cache: false
    }),

    new CopyWebpackPlugin([
      { from: 'manifest.json' },
      { from: 'img/*' }
    ])

  ]

};
