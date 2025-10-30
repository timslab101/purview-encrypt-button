const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

module.exports = {
  mode: "development",
  entry: {
    taskpane: "./src/taskpane/index.tsx",
    commands: "./src/commands/commands.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/taskpane/taskpane.html",
      filename: "taskpane.html",
      chunks: ["taskpane"],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
      watch: true,
    },
    compress: true,
    port: 3000,
    host: "127.0.0.1",
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    server: {
      type: "https",
      options: {
        key: fs.readFileSync(path.join(__dirname, "certs/localhost.key")),
        cert: fs.readFileSync(path.join(__dirname, "certs/localhost.crt")),
      },
    },
  },
};
