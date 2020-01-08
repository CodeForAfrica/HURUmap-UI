import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  content: {},
  downloadButton: {
    textTransform: 'uppercase'
  },
  subtitle: {},
  title: {}
});

function DownloadPanel({ children, subtitle, title, onDownload, ...props }) {
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
        >
          Download
        </Button>
      </DialogContent>
    </>
  );
}

DownloadPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onDownload: PropTypes.func.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

DownloadPanel.defaultProps = {
  subtitle: null,
  title: 'Download this as an image'
};

export default DownloadPanel;
