/**
 * Material UI complains when you pass undefined class names to useStyles
 * We do alot of overriding and we want less warnings on console
 * Pick the defined classes to avoid warnings
 */

import _ from 'lodash';
import { makeStyles } from '@material-ui/core';

export default classes => {
  const useStyles = makeStyles(classes);
  return props => {
    if (props && props.classes) {
      const defaultClasses = useStyles();
      return useStyles({
        ...props,
        classes: _.pick(props.classes, _.keys(defaultClasses))
      });
    }
    return useStyles(props);
  };
};
