const path = require('path');

const mode = process.env.NODE_ENV || "development"

module.exports = {
    mode,
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
};