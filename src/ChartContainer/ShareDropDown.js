import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Button, Grid, Link, Typography } from '@material-ui/core';

import DropDown from './DropDown';

const useStyles = makeStyles(() => ({
  root: {},
  source: {
    padding: '20px',
    width: '100%',
    borderBottom: '0.0625rem solid #c4c4c4'
  },
  explore: {
    margin: '20px'
  }
}));

function InfoPanel({
  anchorEl,
  children,
  onClose,
  onExploreData,
  open: openProp,
  sourceLink,
  sourceTitle,
  ...props
}) {
  const classes = useStyles(props);
  const open = typeof openProps === 'undefined' ? anchorEl !== null : openProp;

  return (
    <DropDown anchorEl={anchorEl} onClose={onClose} open={open} {...props}>
      <Grid className={classes.root} container justify="center" {...props}>
        <Typography className={classes.source}>
          {'Sources: '}
          <Link href={sourceLink} target="_blank" rel="noopener noreferrer">
            {sourceLink || sourceTitle}
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
    </DropDown>
  );
}

InfoPanel.propTypes = {
  anchorEl: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  forwardedRef: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onExploreData: PropTypes.func,
  sourceLink: PropTypes.string.isRequired,
  sourceTitle: PropTypes.string
};

InfoPanel.defaultProps = {
  onExploreData: undefined,
  open: undefined,
  sourceTitle: undefined
};

export default InfoPanel;
