const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            }
        ]
    },
}