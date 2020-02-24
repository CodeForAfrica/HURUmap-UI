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
    'react/jsx-props-no-spreading': 'off', // We use HOC, etc. & this will wreck havoc
    'react/jsx-curly-newline': 'off', // Clashes with prettier => prettier wins
    'react/jsx-wrap-multilines': [
      1,
      {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore'
      }
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'no-unused-vars': 'error'
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '@hurumap/cms': './packages/cms/src',
          '@hurumap/charts': './packages/charts/src',
          '@hurumap/factory': './packages/factory/src',
          '@hurumap/components': './packages/components/src',
          '@hurumap/config': './packages/config/src',
          '@hurumap/mapit': './packages/mapit/src'
        }
      }
    }
  }
};
