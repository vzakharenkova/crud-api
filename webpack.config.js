import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  context: resolve(__dirname, 'src'),
  entry: './main.ts',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.cjs',
  },
  target: 'node',
  mode: 'production',
  resolve: {
    extensionAlias: {
      '.js': ['.js', '.ts'],
    },
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
