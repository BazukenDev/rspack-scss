// @ts-check

const path = require('path');
const rspack = require('@rspack/core');
const sass = require('sass-embedded');

/** @type {import('@rspack/cli').Configuration} */
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
    new rspack.CssExtractRspackPlugin({
      filename: 'app-[name]-styles.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        type: 'javascript/auto',
        loader: 'builtin:swc-loader',
        /** @type {import('@rspack/core').SwcLoaderOptions} */
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
        parser: {
          'css/auto': {
            // namedExports: false,
          },
        },
        use: [
          // {
          //   loader: 'builtin:lightningcss-loader',
          //   options: {
          //     browsers: "last 4 years",
          //     sourceMap: true,
          //   },
          // },
          {
            loader: rspack.CssExtractRspackPlugin.loader,
            options: {
              // sourceMap: true,
            }
          },
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
              api: 'modern-compiler',
              implementation: sass,
              // sourceMap: true,
              sassOptions: {
                // cache: false
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
    css: true,
  },
  optimization: {
    // emitOnErrors: true,
  },
  // externalsType: 'window',
  // externals: {
  //   jquery: '$',
  // },
  stats: {
    // preset: 'detailed',
    // errorDetails: true,
    // warnings: false
  }
}

module.exports = config;