module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ['react-hooks', 'json', 'markdown'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['.storybook/**', 'stories/**'] }
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/jsx-props-no-spreading':'ignore', // We use HOC, etc. & this will wreck havoc
    'react/jsx-curly-newline': 'ignore', // Clashes with prettier => prettier wins
    'react/jsx-wrap-multilines': [1, {
      "declaration": "parens",
      "assignment": "parens",
      "return": "parens",
      "arrow": "parens",
      "condition": "ignore",
      "logical": "ignore",
      "prop": "ignore"
    }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'no-unused-vars': 'error'
  }
};
