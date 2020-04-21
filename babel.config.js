module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-env"],
  plugins: ["inline-react-svg"],
  env: {
    development: {
      plugins: [
        [
          "module-resolver",
          {
            alias: {
              "@hurumap-ui/content": "./packages/content/src",
              "@hurumap-ui/charts": "./packages/charts/src",
              "@hurumap-ui/core": "./packages/core/src",
            },
          },
        ],
      ],
    },
  },
};
