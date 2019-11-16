const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/web/index.tsx",
  output: {
    path: path.resolve("./public/dist"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: path.resolve(__dirname, "src/web"),
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      { test: /\.jsx$/, loader: 'jsx-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    new LiveReloadPlugin()
  ]
};
