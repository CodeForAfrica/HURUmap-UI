# HURUmap UI

![npm](https://img.shields.io/npm/v/@codeforafrica/hurumap-ui) [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

This library package React components that are used to visualize HURUmap data.

HURUmap is an interactive web platform that allows citizens and journalists to explore, visualise, and download census data. This gives them the power to give context to stories that was otherwise hard to spot. Accessible at <https://hurumap.org>

----

Hurumap-UI [Storybook](https://codeforafrica.github.io/hurumap-ui/).

## Style Guidelines

This project will be primarily using [airbnb react](https://github.com/airbnb/javascript/tree/master/react) and [material-ui](https://material-ui.com/) as our main style guides when implementing components.This is to create code consistency and readability.

## Contributing

If you'd like to contribute to sensors.AFRICA, check out the [CONTRIBUTING.md](./CONTRIBUTING.md) file on how to get started; or jump right into our [GitHub issues](issues).

### ✨ Contributors ✨

[TODO](https://www.npmjs.com/package/all-contributors-cli)


## Publish A New Release

To publish a new release, we use the excellent [yarn version](https://yarnpkg.com/lang/en/docs/cli/version/) cli command, configured to both publish to npm as well as deploy storybook to GitHub pages.

```
yarn version
```

# Storybook 

Storybook is an open-source tool that provides a sandbox to develop and visualize components in isolation. See the [Storybook site](https://storybook.js.org/) for more information about the tool. 

HURUmap uses Storybook to view and work with the UI components developed in the HURUmap packages.

View online at: https://codeforafrica.github.io/HURUmap-UI/

Run locally in your development environment running: `yarn start` from the top-level Gutenberg directory.

# Publishing

Run `yarn publish:packages` otherwise always publish using lerna `--contents` argument like so `yarn lerna publish --contents build`.

# Development

When adding a new package, be sure to add the alias to the babel.config.js and .eslintrc.js:

- babel.config.js

```
module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: ['inline-react-svg'],
  env: {
    development: {
      plugins: [
        [
          'module-resolver',
          {
            alias: {
              '@hurumap-ui/cms': './packages/cms/src',
              '@hurumap-ui/charts': './packages/charts/src',
              '@hurumap-ui/factory': './packages/factory/src',
              '@hurumap-ui/core': './packages/core/src',
              '@hurumap-ui/config': './packages/config/src',
              '@hurumap-ui/mapit': './packages/mapit/src'
            }
          }
        ]
      ]
    }
  }
};
```

- .eslintrc.js

```
module.exports = {
  ...,
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '@hurumap-ui/cms': './packages/cms/src',
          '@hurumap-ui/charts': './packages/charts/src',
          '@hurumap-ui/factory': './packages/factory/src',
          '@hurumap-ui/core': './packages/core/src',
          '@hurumap-ui/config': './packages/config/src',
          '@hurumap-ui/mapit': './packages/mapit/src'
        }
      }
    }
  }
};

```

---

## License

GNU GPLv3

Copyright (C) 2018 Code for Africa

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
