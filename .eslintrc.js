const path = require("path");

module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb",
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ["react-hooks", "json", "markdown", "jest"],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: [".storybook/**", "stories/**"] },
    ],
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "react/jsx-props-no-spreading": "off", // We use HOC, etc. & this will wreck havoc
    "react/jsx-curly-newline": "off", // Clashes with prettier => prettier wins
    "react/jsx-wrap-multilines": [
      1,
      {
        declaration: "parens",
        assignment: "parens",
        return: "parens",
        arrow: "parens",
        condition: "ignore",
        logical: "ignore",
        prop: "ignore",
      },
    ],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "no-unused-vars": "error",
  },
  settings: {
    "import/resolver": {
      "babel-module": {
        alias: {
          "@hurumap-ui/content": "./packages/content/src",
          "@hurumap-ui/charts": "./packages/charts/src",
          "@hurumap-ui/core": "./packages/core/src",
        },
      },
      "eslint-import-resolver-lerna": {
        packages: path.resolve(__dirname, "packages"),
      },
    },
  },
};
