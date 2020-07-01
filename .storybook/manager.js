import '@storybook/addon-knobs/register';
import '@storybook/addon-parameter/register';
import '@storybook/addon-preview-wrapper/register';
import '@storybook/addon-roundtrip/register';

import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

import logo from '../stories/assets/cfa.png';

addons.setConfig({
  theme: {
    brandImage: logo,
    brandTitle: 'HURUmap UI',
    ...themes.light,
  },
  panelPosition: 'bottom',
  selectedPanel: 'storybook/roundtrip',
});
