import React from 'react';
import PropTypes from 'prop-types';

import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  content: {},
  code: {
    fontFamily: 'monospace',
    width: '100%'
  },
  codeContainer: {
    border: '1px solid #eaeaea',
    padding: '18.5px 14px',
    overflow: 'auto'
  },
  subtitle: {},
  title: {}
});

function EmbedPanel({ children, subtitle, title, ...props }) {
  const classes = useStyles(props);

  return (
    <>
      {title && <DialogTitle className={classes.title}>{title}</DialogTitle>}
      <DialogContent className={classes.content}>
        {subtitle && (
          <DialogContentText className={classes.subtitle}>
            {subtitle}
          </DialogContentText>
        )}
        <pre className={classes.codeContainer}>
          <Typography
            variant="caption"
            component="code"
            className={classes.code}
          >
            {children}
          </Typography>
        </pre>
      </DialogContent>
    </>
  );
}

EmbedPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

EmbedPanel.defaultProps = {
  subtitle: null,
  title: null
};

export default EmbedPanel;
