module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jquery: true
  },
  parser: "@babel/eslint-parser",
  "requireConfigFile": false,
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      modules: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  settings: {
    react: {
      version: '999.999.999'
    }
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': [0, { skipUndeclared: 0 }],
    'no-unused-vars': 'warn'
  }
}
