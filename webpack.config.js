var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: ["./src/com/cortex/core/browser/BrowserDetector.ts",
            "./src/com/cortex/core/net/LazyLoader.ts"
    ],
    output: {
        libraryTarget: 'commonjs',
        library: true,
        path: __dirname + "/dist",
        filename: 'cortex-toolkit-js-net.js'
    },
    //devtool: 'source-map',
    resolve: {
        extensions: ['', 'lib/', '.webpack.js', '.web.js', '.ts', '.js']
    },
    plugins: [
        new WebpackNotifierPlugin(),
    ],
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};
