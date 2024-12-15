const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  entry: "./src/app.ts", // Entry point for TypeScript
  target: "node", // Target Node.js
  externals: [nodeExternals()], // Exclude node_modules from bundling
  mode: "production", // Production mode
  module: {
    rules: [
      {
        test: /\.ts$/, // Look for TypeScript files
        use: "ts-loader", // Use ts-loader for TypeScript files
        exclude: /node_modules/,
      },
      {
        test: /\.js$/, // Use Babel for JavaScript files
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Use modern JavaScript
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve .ts and .js extensions
  },
  output: {
    filename: "bundle.js", // Output file
    path: path.resolve(__dirname, "build"), // Output directory
  },
  node: {
    __dirname: false, // Don't mess with __dirname
    __filename: false, // Don't mess with __filename
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.DB_HOST": JSON.stringify(process.env.DB_HOST),
      "process.env.DB_PORT": JSON.stringify(process.env.DB_PORT),
      "process.env.DB_USER": JSON.stringify(process.env.DB_USER),
      "process.env.DB_PASSWORD": JSON.stringify(process.env.DB_PASSWORD),
      "process.env.DB_NAME": JSON.stringify(process.env.DB_NAME),
    }),
  ],
};
