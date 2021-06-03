module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
      rules: {
        'tsdoc/syntax': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
      },
      parser: '@typescript-eslint/parser',
    },
    {
      files: ['cypress/**/*.test.js', 'cypress/**/*.test.ts'],
      env: {
        'cypress/globals': true,
      },
      plugins: ['cypress'],
    },
  ],
}
