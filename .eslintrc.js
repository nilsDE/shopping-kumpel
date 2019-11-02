module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jasmine: true,
    node: true
  },
  extends: [
    'airbnb', 'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: [
    'react', 'prettier',
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'no-console': 0 
  },
};
