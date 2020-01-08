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
    width: '100%',
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
        <Typography variant="caption" component="pre" className={classes.code}>
          <code>{children}</code>
        </Typography>
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
