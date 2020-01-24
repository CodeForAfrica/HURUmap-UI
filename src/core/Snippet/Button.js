import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

import propTypes from '../propTypes';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    color: 'white',
    backgroundColor: palette.primary.main,
    padding: '5px 10px',
    paddingLeft: '5px',
    borderRadius: 5
  }
}));

function SnippetButton({ children, ...props }) {
  const classes = useStyles(props);

  return (
    <ButtonBase {...props} className={classes.root}>
      {children}
    </ButtonBase>
  );
}

SnippetButton.propTypes = {
  children: propTypes.children.isRequired
};

export default SnippetButton;
