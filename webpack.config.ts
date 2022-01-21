import * as path from 'path'
import * as webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import 'webpack-dev-server'

const config: webpack.Configuration = {
  entry: './src/index.ts',
  output: {
    hashFunction: 'xxhash64',
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    compress: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{from: path.resolve(__dirname, 'public')}],
    }),
    new HtmlWebpackPlugin({
      title: 'Three JS Journey',
      favicon: 'public/favicon.ico',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.glsl$/,
        use: 'webpack-glsl-loader',
      },
      {
        test: /\.s?[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\module.s?[ac]ss$/i,
      },
      {
        test: /\module.s?[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext]',
        },
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      assets: path.resolve(__dirname, 'public'),
    },
  },
}
export default config