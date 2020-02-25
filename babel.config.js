module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: [
    'inline-react-svg',
    [
      'module-resolver',
      {
        alias: {
          '@hurumaptest/cms': './packages/cms/src',
          '@hurumaptest/charts': './packages/charts/src',
          '@hurumaptest/factory': './packages/factory/src',
          '@hurumaptest/components': './packages/components/src',
          '@hurumaptest/config': './packages/config/src',
          '@hurumaptest/mapit': './packages/mapit/src'
        }
      }
    ]
  ]
};
