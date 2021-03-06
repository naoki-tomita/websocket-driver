"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var config = {
    entry: [
        "babel-polyfill",
        "html2canvas",
        "./src/scripts/client/index.ts"
    ],
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist/client")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    mode: "production",
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ],
    }
};
exports.default = config;
//# sourceMappingURL=webpack.config.js.map