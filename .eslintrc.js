module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:import/typescript',
    'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules that would conflict with prettier
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }]
  },
};
