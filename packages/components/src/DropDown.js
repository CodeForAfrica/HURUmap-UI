import React from 'react';
import PropTypes from 'prop-types';

import { ClickAwayListener, Fade, Paper, Popper } from '@material-ui/core';
import makeStyles from '../../common/src/makeStyles';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    marginTop: '1rem',
    [breakpoints.up('sm')]: {
      width: '20rem'
    }
  },
  paper: {}
}));

function DropDown({ children, onClose, open, transition, ...props }) {
  const classes = useStyles(props);

  return (
    <Popper open={open} className={classes.root} transition {...props}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} {...transition}>
          <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={onClose}>
              {children}
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}

DropDown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  transition: PropTypes.shape({})
};

DropDown.defaultProps = {
  transition: {
    timeout: 350
  }
};

export default DropDown;
