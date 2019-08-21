import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  ClickAwayListener,
  Fade,
  Paper,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Popper
} from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    marginTop: '1rem',
    [breakpoints.up('md')]: {
      width: '22rem'
    }
  },
  paper: {},
  code: {
    borderRadius: '0.25rem',
    border: '1px solid gray',
    overflow: 'auto'
  }
}));

function ShareDropDown({ children, onClose, open, subtitle, title, ...props }) {
  const classes = useStyles();

  return (
    <Popper open={open} className={classes.root} transition {...props}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={onClose}>
              <div>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                  <DialogContentText>{subtitle}</DialogContentText>
                  <Typography variant="caption" component="code">
                    <pre className={classes.code}>{children}</pre>
                  </Typography>
                </DialogContent>
              </div>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}

ShareDropDown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

ShareDropDown.defaultProps = {
  subtitle: undefined,
  title: undefined
};

export default ShareDropDown;
