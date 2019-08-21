import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  Link,
  Typography,
  ClickAwayListener,
  Paper,
  Popper,
  Fade
} from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    marginTop: '1rem',
    [breakpoints.up('sm')]: {
      width: '20rem'
    }
  },
  paper: {},
  source: {
    padding: '1.25rem',
    width: '100%',
    borderBottom: '1px solid #c4c4c4'
  },
  explore: {
    margin: '1.25rem'
  }
}));

function InfoDropDown({
  children,
  onClose,
  onExploreData,
  open,
  sourceLink,
  sourceTitle: sT,
  ...props
}) {
  const classes = useStyles();
  const sourceTitle = sT || sourceLink;
  return (
    <Popper open={open} className={classes.root} transition {...props}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={onClose}>
              <Grid container justify="center">
                <Typography className={classes.source}>
                  {'Sources: '}
                  <Link
                    href={sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}

InfoDropDown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
  onExploreData: PropTypes.func,
  open: PropTypes.bool.isRequired,
  sourceLink: PropTypes.string.isRequired,
  sourceTitle: PropTypes.string
};

InfoDropDown.defaultProps = {
  onExploreData: undefined,
  sourceTitle: undefined
};

export default InfoDropDown;
