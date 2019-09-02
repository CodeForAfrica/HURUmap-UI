import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Button, Grid, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  source: {
    padding: '1.25rem',
    width: '100%',
    borderBottom: '1px solid #c4c4c4'
  },
  explore: {
    margin: '1.25rem'
  }
}));

function InfoPanel({
  forwardedRef,
  children,
  onExploreData,
  sourceLink,
  sourceTitle: sT,
  ...props
}) {
  const classes = useStyles();
  const sourceTitle = sT || sourceLink;
  return (
    <Grid
      ref={forwardedRef}
      className={classes.root}
      container
      justify="center"
      {...props}
    >
      <Typography className={classes.source}>
        {'Sources: '}
        <Link href={sourceLink} target="_blank" rel="noopener noreferrer">
          {sourceTitle}
        </Link>
      </Typography>
      <Button
        variant="outlined"
        onClick={onExploreData}
        className={classes.explore}
      >
        {children}
      </Button>
    </Grid>
  );
}

InfoPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  forwardedRef: PropTypes.func.isRequired,
  onExploreData: PropTypes.func,
  sourceLink: PropTypes.string.isRequired,
  sourceTitle: PropTypes.string
};

InfoPanel.defaultProps = {
  onExploreData: undefined,
  sourceTitle: undefined
};

export default InfoPanel;
