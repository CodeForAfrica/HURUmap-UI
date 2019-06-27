import { configure } from '@storybook/react';

// Automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
  // Here we can require as many stories as we need.
  // By default this project is setup to detect and pickup any story file
  // with the name ending in .stories.tsx
}

configure(loadStories, module);
