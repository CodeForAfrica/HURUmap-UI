import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  Container,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography
} from '@material-ui/core';

import DropDown from './DropDown';

const useStyles = makeStyles({
  root: {},
  title: {},
  subtitle: {},
  code: {
    width: '100%',
    overflow: 'auto'
  },
  dropDownRoot: {},
  dropDownPaper: {}
});

function EmbedDropDown({
  anchorEl,
  children,
  onClose,
  open: openProp,
  subtitle,
  title,
  ...props
}) {
  const classes = useStyles(props);
  const open = typeof openProps === 'undefined' ? anchorEl !== null : openProp;

  return (
    <DropDown
      anchorEl={anchorEl}
      onClose={onClose}
      open={open}
      classes={{ root: classes.dropDownRoot, paper: classes.dropDownPaper }}
    >
      <Container className={classes.root}>
        {title && <DialogTitle className={classes.title}>{title}</DialogTitle>}
        <DialogContent>
          {subtitle && (
            <DialogContentText className={classes.subtitle}>
              {subtitle}
            </DialogContentText>
          )}
          <Typography variant="caption" component="code">
            <pre className={classes.code}>{children}</pre>
          </Typography>
        </DialogContent>
      </Container>
    </DropDown>
  );
}

EmbedDropDown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  anchorEl: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

EmbedDropDown.defaultProps = {
  open: undefined,
  subtitle: null,
  title: null
};

export default EmbedDropDown;
