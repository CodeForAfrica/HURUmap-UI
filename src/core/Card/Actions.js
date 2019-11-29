import React from 'react';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import EmbedIcon from '@material-ui/icons/Code';
import { makeStyles } from '@material-ui/core';
import propTypes from '../propTypes';

import ActionButton from '../ActionButton';

const useStyles = makeStyles({
  actionsContainer: {
    right: 20,
    color: 'white',
    backgroundColor: 'black',
    padding: '2px 5px',
    borderRadius: 5
  },
  actionButton: {
    color: 'white'
  },
  iconGrid: {
    height: 'unset'
  }
});

function CardActions({ onShare, onEmbed }) {
  const classes = useStyles();
  return (
    <Grid className={classes.actionsContainer} container spacing={1}>
      <Grid item>
        <ActionButton classes={classes} onClick={onShare}>
          <ShareIcon style={{ fontSize: 15 }} />
        </ActionButton>
      </Grid>
      <Grid item>
        <ActionButton classes={classes} onClick={onEmbed}>
          <EmbedIcon style={{ fontSize: 15 }} />
        </ActionButton>
      </Grid>
    </Grid>
  );
}

CardActions.propTypes = {
  onShare: propTypes.func,
  onEmbed: propTypes.func
};

CardActions.defaultProps = {
  onShare: undefined,
  onEmbed: undefined
};

export default CardActions;
