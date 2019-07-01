import { withTheme, WithTheme } from '@material-ui/core';
import { ConsistentWith } from '@material-ui/types';

import Theme from './Theme';

export default (C: React.ComponentType<ConsistentWith<{}, WithTheme>>) => {
  const wrapped = withTheme(C);

  wrapped.defaultProps = {
    theme: Theme
  };

  return wrapped;
};
