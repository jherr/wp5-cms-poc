const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Datastore = require("nedb");

const db = new Datastore({ filename: "pages.db" });
db.loadDatabase();

module.exports = (env, argv) => ({
  devServer: {
    setup: function (app, server) {
      const bodyParser = require("body-parser");
      app.use(bodyParser.json());
      app.use(require("cors")());

      app.post("/api/:page", function (req, res) {
        const page = req.params.page;

        db.find({ _id: page }, (_, docs) => {
          if (docs.length > 0) {
            db.update({ _id: page }, { $set: req.body }, {}, (err) => {
              res.json({ record: "updated" });
            });
          } else {
            db.insert(
              {
                _id: page,
                ...req.body,
              },
              (err) => {
                res.json({ record: "inserted" });
              }
            );
          }
        });
      });
      app.get("/api/:page", function (req, res) {
        const page = req.params.page;
        db.find({ _id: page }, (err, docs) => {
          if (!err || docs.length) {
            res.json(docs[0] || {});
          } else {
            res.json({ custom: req.params });
          }
        });
      });
    },
    historyApiFallback: true,
  },

  entry: "./src/index",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: "http://localhost:8080/",
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
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "admin",
      library: { type: "var", name: "admin" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        Page: "./src/Page",
        EmbedPage: "./src/EmbedPage",
      },
      shared: ["react", "antd", "react-query"],
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
