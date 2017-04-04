import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
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
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      }
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: 'index.html',
      chunks: ['main'],
      cache: false
    }),

    new ExtractTextPlugin('css/style.css'),

    new CopyWebpackPlugin([
      { from: 'manifest.json' },
      { from: 'img/*' }
    ])

  ]

};
