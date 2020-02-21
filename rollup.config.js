import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy-glob';
import { terser } from 'rollup-plugin-terser';
import { uglify } from 'rollup-plugin-uglify';

import packageJSON from './package.json';

const input = './src/index.js';
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, '.min.js');

export default [
  // CommonJS
  {
    input,
    output: [
      {
        file: packageJSON.main,
        format: 'cjs'
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      postcss({
        modules: true,
        minimize: {
          safe: true
        }
      }),
      external(),
      resolve(),
      commonjs(),
      copy([
        { files: 'src/styles/**/*.*', dest: 'dist/styles' },
      ], { verbose: true }),
    ]
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.main),
      format: 'cjs'
    },
    plugins: [
      external(),
      postcss({
        modules: true,
        minimize: {
          safe: true
        }
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      resolve(),
      commonjs(),
      uglify()
    ]
  },
  {
    input,
    output: {
      file: packageJSON.module,
      format: 'es',
      exports: 'named'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      postcss({
        modules: true,
        minimize: {
          safe: true
        }
      }),
      external(),
      resolve(),
      commonjs(),
      terser()
    ]
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.module),
      format: 'es',
      exports: 'named'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      postcss({
        modules: true,
        minimize: {
          safe: true
        }
      }),
      external(),
      resolve(),
      commonjs(),
      terser()
    ]
  }
];
