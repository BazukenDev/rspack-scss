// @ts-check

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('sass');
const globSASS = require('./globSass').default;
// import { globSASS } from './globSass';

/** @type {import('webpack').Configuration} */
let config = {
  name: 'sass-watch-test',
  mode: "development",
  watchOptions: {
    // ignored: /node_modules/,
    // followSymlinks: true,
    // aggregateTimeout: 200,
    // poll: true,
    // stdin: false,
  },
  // devtool: 'source-map',
  cache: false,
  // target: ['web', 'es5'],
  entry: {
    main: path.resolve('./app/src/index.js')
  },
  output: {
    filename: 'app-[name].js',
    path: path.resolve('./app/public'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app-[name]-styles.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'swc-loader',
        options: {
          // sourceMaps: true,
          // jsc: {
          //   parser: {
          //     syntax: "ecmascript",
          //   },
          //   target: "es5",
          // },
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // url: false,
              // import: false,
              // modules: false,
              // sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // implementation: sass,
              // sourceMap: true,
              sassOptions: {
                // importer: globSASS(),
                importers: [{
                  canonicalize(url) {
                    console.log(`Url`, url);
                    console.log(`Canonicalize url`, new URL(url));
                    // if (!url.startsWith('@use')) return null;
                    return new URL(url);
                  },
                  load(canonicalUrl) {
                    return {
                      contents: `body {background-color: ${canonicalUrl.pathname}}`,
                      syntax: 'scss'
                    };
                  }
                }],
                cache: false
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // modules: ['node_modules', 'js_modules'],
    // extensions: ['.js', '.css', '.scss']
  },
  experiments: {
    // css: true,
  },
  optimization: {
    // emitOnErrors: true,
  },
  externals: {
    jquery: '$',
  },
  stats: {
    // preset: 'detailed',
    // errorDetails: true,
    warnings: false
  }
}

module.exports = config;
