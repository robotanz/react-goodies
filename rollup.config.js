import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import sass from 'rollup-plugin-sass'

const env = process.env.NODE_ENV

const config = {
  input: 'src/index.js',
  output: {
    format: 'cjs'
  },
  external: ['react', 'styled-components', 'react-bootstrap'],
  // output: {
  //   format: 'umd',
  //   name: 'ReactLib',
  //   globals: {
  //     react: 'React',
  //     'styled-components': 'styled'
  //   }
  // },
  plugins: [
    nodeResolve({
      extensions: [ '.js', '.jsx' ],
    }),
    sass({
      output: 'dist/styles.css'
    }),
    babel({
      exclude: '**/node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    commonjs()
  ]
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config
