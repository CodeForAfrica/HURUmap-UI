import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

function SharePanel({ children, forwardedRef, subtitle, title, ...props }) {
  const classes = useStyles();

  return (
    <div ref={forwardedRef} {...props} className={classes.root}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {subtitle && <DialogContentText>{subtitle}</DialogContentText>}
        <Typography variant="caption" component="code">
          <pre className={classes.code}>{children}</pre>
        </Typography>
      </DialogContent>
    </div>
  );
}

SharePanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  forwardedRef: PropTypes.shape({}).isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

SharePanel.defaultProps = {
  subtitle: null,
  title: null
};

export default SharePanel;
