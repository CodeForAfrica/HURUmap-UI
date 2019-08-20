import { configure, addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

// In the action logger panel
// Receive all console messages, warnings, errors
// Including HMR logs
addDecorator((storyFn, context) =>
  withConsole({
    panelExclude: []
  })(storyFn)(context)
);

// Automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(req);
  // Here we can require as many stories as we need.
  // By default this project is setup to detect and pickup any story file
  // with the name ending in .stories.js
}

configure(loadStories, module);
