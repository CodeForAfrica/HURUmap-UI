import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';

import DownloadIcon from '../assets/icons/download.svg';
import makeStyles from '../makeStyles';

const useStyles = makeStyles(theme => ({
  content: {
    fontSize: theme.typography.caption.fontSize
  },
  downloadButton: {
    paddingLeft: 0,
    textTransform: 'none',

    '&:hover': {
      background: 'inherit'
    }
  },
  downloadIcon: {
    '& path:first-of-type': {
      stroke: theme.palette.primary.main
    },
    '& path:last-of-type': {
      fill: theme.palette.primary.main
    }
  },
  subtitle: {
    fontSize: theme.typography.body2.fontSize
  },
  title: {
    '& h2': {
      fontSize: theme.typography.body1.fontSize
    }
  }
}));

function DownloadPanel({ subtitle, title, onDownload, ...props }) {
  const classes = useStyles(props);

  return (
    <>
      {title && <DialogTitle className={classes.title}>{title}</DialogTitle>}
      <DialogContent className={classes.content}>
        {subtitle && (
          <DialogContentText className={classes.subtitle}>
            {subtitle}
          </DialogContentText>
        )}
        <Button
          className={classes.downloadButton}
          color="primary"
          onClick={onDownload}
          startIcon={<DownloadIcon className={classes.downloadIcon} />}
        >
          Download
        </Button>
      </DialogContent>
    </>
  );
}

DownloadPanel.propTypes = {
  onDownload: PropTypes.func.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

DownloadPanel.defaultProps = {
  subtitle: undefined,
  title: undefined
};

export default DownloadPanel;
