const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const SveltePreprocess = require("svelte-preprocess")
const path = require("path")

const mode = process.env.NODE_ENV || "development"
const prod = mode === "production"

module.exports = {
    entry: {
        "build/bundle": ["./src/main.ts"],
    },
    resolve: {
        alias: {
            svelte: path.dirname(require.resolve("svelte/package.json")),
        },
        extensions: [".mjs", ".js", ".ts", ".svelte"],
        mainFields: ["svelte", "browser", "module", "main"],
    },
    output: {
        path: path.join(__dirname, "/public"),
        filename: "[name].js",
        chunkFilename: "[name].[id].js",
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: "svelte-loader",
                    options: {
                        compilerOptions: {
                            dev: !prod,
                        },
                        emitCss: prod,
                        hotReload: !prod,
                        preprocess: SveltePreprocess({
                            scss: true,
                            sass: true,
                        }),
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                // required to prevent errors from Svelte on Webpack 5+
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
    devtool: prod ? false : "source-map",
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
}
