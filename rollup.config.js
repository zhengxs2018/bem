import path from 'path'

import { mergeWith } from 'lodash'

import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'

import externals from 'rollup-plugin-node-externals'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} @${pkg.author.name}.
 * Released under the ${pkg.license} License
 */`

const baseConfig = {
  input: resolve('src/index.ts'),
  output: {
    banner,
    exports: 'named',
  },
  plugins: [
    externals({
      deps: true, // 剔除生产依赖
    }),
    nodeResolve(),
    commonjs(),
    replace({
      preventAssignment: true,
      __VERSION__: pkg.version,
    }),
  ],
}

const umdConfig = merge(baseConfig, {
  output: {
    format: 'umd',
    name: 'BEM',
    globals: {
      tslib: 'tslib'
    },
  },
})

export default [
  // CommonJS
  merge(baseConfig, {
    output: [
      // CommonJS
      {
        format: 'cjs',
        file: resolve('dist/bem.common.js'),
      },
      // ES Module
      {
        format: 'esm',
        file: resolve('dist/bem.esm.js'),
      },
    ],
    plugins: [
      typescript({
        tsconfig: resolve('tsconfig.build.json'),
      }),
    ],
  }),

  // UMD
  merge(umdConfig, {
    output: [
      {
        file: resolve('dist/bem.js'),
      },
      {
        sourcemap: true,
        file: resolve('dist/bem.min.js'),
        plugins: [terser()],
      },
    ],
    plugins: [
      typescript({
        tsconfig: resolve('tsconfig.build.json'),
        target: 'es5',
        // importHelpers: true
      }),
    ],
  }),
]

function resolve(filename) {
  return path.join(__dirname, filename)
}

function merge(object, sources) {
  return mergeWith({ ...object }, sources, function (objValue, srcValue, key) {
    switch (key) {
      case 'output':
        if (Array.isArray(srcValue)) {
          if (Array.isArray(objValue)) {
            return srcValue.concat(objValue || [])
          }
          return srcValue.map((out) => Object.assign({}, objValue, out))
        }
        return Object.assign({}, objValue, srcValue)
      case 'plugins':
        return objValue.concat(srcValue || [])
      default:
        return srcValue || objValue
    }
  })
}
