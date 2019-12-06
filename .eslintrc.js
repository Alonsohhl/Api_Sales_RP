module.exports = {
  env: {
    // "es6": true,
    node: true
  },
  extends: [
    'standard',
    // https://github.com/prettier/eslint-config-prettier
    'prettier',
    'prettier/standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    // "ecmaVersion": 2018,
    // "sourceType": "module"
  },
  rules: {
    semi: 0
  }
}
