module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: [
    'inline-react-svg',
    [
      'module-resolver',
      {
        alias: {
          '@hurumap/content': './packages/content/src',
          '@hurumap/charts': './packages/charts/src',
          '@hurumap/core': './packages/core/src',
          '@hurumap/config': './packages/config/src'
        }
      }
    ]
  ]
};
