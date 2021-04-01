import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

import logo from '../stories/assets/cfa.png';

addons.setConfig({
  theme: create({
    base: 'light',
    brandImage: logo,
    brandTitle: 'HURUmap UI',
  }),
  panelPosition: 'bottom',
  selectedPanel: 'storybook/roundtrip',
});
