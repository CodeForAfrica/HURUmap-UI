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

const useStyles = makeStyles({
  content: {},
  downloadButton: {},
  subtitle: {},
  title: {}
});

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
          variant="outlined"
          onClick={onDownload}
          startIcon={<DownloadIcon />}
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
