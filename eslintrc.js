
export default {
  env:{
    es2021: true,
    node: true,
    jest: true,
  },
  plugins:['jest'],
  extends: ['standart','prettier','plugin:jest/recommended'],
  
  overrides: [
    {
      "files": ["*.test.js"],
      "env": {
        "jest": true
      },
      "plugins": ["jest"],
      "extends": ["plugin:jest/recommended"]
    }    
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
}