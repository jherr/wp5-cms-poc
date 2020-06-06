const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  devServer: {
    port: 8081,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|gif|woff|ttf|woff2|eot)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "home",
      library: { type: "var", name: "home" },
      filename: "remoteEntry.js",
      remotes: {
        admin: "admin",
      },
      exposes: {},
      shared: ["react", "react-query", "semantic-ui-react"],
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
