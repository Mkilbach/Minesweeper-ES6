const path = require('path');

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            {
                                plugins: [
                                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                                    "@babel/plugin-proposal-function-sent",
                                    "@babel/plugin-proposal-export-namespace-from",
                                    "@babel/plugin-proposal-numeric-separator",
                                    "@babel/plugin-proposal-throw-expressions",
                                    '@babel/plugin-proposal-class-properties'
                                ]
                            }
                        ],
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};