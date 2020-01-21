import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import propTypes from '../propTypes';

import ActionButton from '../ActionButton';
import EmbedIcon from '../assets/icons/code.svg';
import ShareIcon from '../assets/icons/network-connection.svg';

const useStyles = makeStyles({
  actionsContainer: {
    right: 20,
    color: 'white',
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

function SnippetActions({ onShare, onEmbed }) {
  const classes = useStyles();
  return (
    <Grid className={classes.actionsContainer} container spacing={0}>
      <Grid item>
        <ActionButton
          classes={{
            actionButton: classes.actionButton,
            iconGrid: classes.iconGrid
          }}
          onClick={onShare}
        >
          <ShareIcon />
        </ActionButton>
      </Grid>
      <Grid item>
        <ActionButton
          classes={{
            actionButton: classes.actionButton,
            iconGrid: classes.iconGrid
          }}
          onClick={onEmbed}
        >
          <EmbedIcon />
        </ActionButton>
      </Grid>
    </Grid>
  );
}

SnippetActions.propTypes = {
  onShare: propTypes.func,
  onEmbed: propTypes.func
};

SnippetActions.defaultProps = {
  onShare: undefined,
  onEmbed: undefined
};

export default SnippetActions;
