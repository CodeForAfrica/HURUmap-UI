module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: ['inline-react-svg'],
  env: {
    development: {
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            alias: {
              '@hurumap/cms': './packages/cms/src',
              '@hurumap/charts': './packages/charts/src',
              '@hurumap/factory': './packages/factory/src',
              '@hurumap/components': './packages/components/src',
              '@hurumap/config': './packages/config/src',
              '@hurumap/mapit': './packages/mapit/src'
            }
          }
        ]
      ]
    }
  }
};
