import plugin from "eslint-plugin-jest";

export default {
  env:{
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  plugins:['jest'],
  extends: ['standart','prettier','plugin:jest/recommended'],
  overrides: [
    {
      env: {
        node: true,
        "jest/globals": true,
      },
      files:['.eslintrc.(js,cjs)'],
      parserOptions: {
        sourseType: 'scripts',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
}