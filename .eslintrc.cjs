'use strict';

module.exports = {
  env: { browser: true, es2021: true },
  extends: ['standard', 'eslint:recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  rules: {
    "@typescript-eslint/ban-ts-comment": "off"
  },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
    },
  ],
  ignorePatterns: ['.eslintrc.cjs'],
};
