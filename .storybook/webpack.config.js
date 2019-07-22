module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      }
    ],
  });
  
  config.module.rules.push({
    test: /\.(png|jpe?g|gif)$/,
    use: [
      {
        loader: 'file-loader',
        options: {},
      }
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
