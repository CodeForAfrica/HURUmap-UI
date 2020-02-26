module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: [
    'inline-react-svg',
    [
      'module-resolver',
      {
        alias: {
          '@hurumap-ui/content': './packages/content/src',
          '@hurumap-ui/charts': './packages/charts/src',
          '@hurumap-ui/core': './packages/core/src',
          '@hurumap-ui/config': './packages/config/src'
        }
      }
    ]
  ]
};
