const path = require("path");

module.exports = {
    entry: "./src/main.ts",
    devtool: "inline-source-map",
    resolve: {
        extensions: [".js", ".ts"]
    },
    output: {
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                options: {
                    transpileOnly: true
                }
            }
        ]
    }
};