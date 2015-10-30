var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var entries = {}
fs.readdirSync(__dirname).map(function (dir) {
  if (fs.statSync(path.join(__dirname, dir)).isDirectory() && dir !== '__build__'){
    entries[dir] = path.join(__dirname, dir, 'app.js')
  }
})
console.log(entries)
module.exports = {

  devtool: 'inline-source-map',

  entry: entries,

  output: {
    path: path.resolve(__dirname, '../__build__'),
    filename: '[name].js'
    // chunkFilename: '[id].chunk.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {stage: 0}}
    ]
  },
  // resolve: {
  //   alias: {
  //     'react-router': path.join(__dirname, '..', 'modules')
  //   }
  // },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]

}