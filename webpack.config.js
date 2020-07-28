const path = require('path');


module.exports = {
    mode: 'development',
    devtool: false,
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, './src/loader')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'jsx-js-loader'
                    }
                ]
            }
        ]
    }
}