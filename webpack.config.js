var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: ["./src/com/cortex/core/net/LazyLoader.ts", "./src/com/cortex/core/browser/BrowserDetector.ts"],
  preLoaders: [
    {
      test: /\.ts$/,              
      loader: "tslint"
    }
  ],
  output: {
    libraryTarget: 'commonjs',
    library: true,
    path: path.resolve('dist'),
    filename: 'cortex-toolkit-js-net.js',
  },
  resolve: {
    extensions: ['', 'lib/', '.webpack.js', '.web.js', '.ts', '.js']
  },
  plugins: [
    new WebpackNotifierPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      }
    ]
  }
};
