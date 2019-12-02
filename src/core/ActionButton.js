import React from 'react';
import { PropTypes } from 'prop-types';

import { IconButton, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  actionButton: {
    borderRadius: '0',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    padding: '0.5rem'
  },
  iconGrid: {
    height: '2.1875rem'
  }
});

function ActionButton({
  children,
  onClick,
  gaEvents: { gaOn, gaEventAction, gaEventCategory, gaEventLabel },
  ...props
}) {
  const classes = useStyles(props);
  return (
    <IconButton
      className={classes.actionButton}
      onClick={onClick}
      ga-on={gaOn}
      ga-event-category={gaEventCategory}
      ga-event-action={gaEventAction}
      ga-event-label={gaEventLabel}
      {...props}
    >
      <Grid
        component="span"
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        className={classes.iconGrid}
      >
        {children}
      </Grid>
    </IconButton>
  );
}

ActionButton.propTypes = {
  onClick: PropTypes.func,
  classes: PropTypes.shape({
    actionButton: PropTypes.string,
    iconGrid: PropTypes.string
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  gaEvents: PropTypes.shape({
    gaOn: PropTypes.string,
    gaEventCategory: PropTypes.string,
    gaEventAction: PropTypes.string,
    gaEventLabel: PropTypes.string
  })
};

ActionButton.defaultProps = {
  classes: undefined,
  onClick: null,
  gaEvents: {
    gaOn: undefined,
    gaEventCategory: undefined,
    gaEventAction: undefined,
    gaEventLabel: undefined
  }
};

export default ActionButton;
