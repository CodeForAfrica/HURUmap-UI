import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import { Typography, Grid, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ActionButton from '../../ActionButton';
import EmbedCodeTextArea from './EmbedCodeTextArea';

import CompareIcon from '../../assets/icons/compare.svg';
import DataIcon from '../../assets/icons/tablet-reader.svg';
import DownloadIcon from '../../assets/icons/download.svg';
import EmbedIcon from '../../assets/icons/code.svg';
import ShareIcon from '../../assets/icons/network-connection.svg';
import BlockLoader from '../../BlockLoader';

const useStyles = makeStyles({
  root: {
    width: 'auto',
    maxWidth: '21.75rem',
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: '0.625rem',
    marginTop: '0.6rem',
    marginLeft: '10px',
    marginRight: '10px'
  },
  actionButton: {
    borderRadius: '0',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    padding: '0.625rem'
  },
  actionButtonText: {
    fontSize: '0.6rem',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.019rem'
  },
  verticalDivider: {
    '&:not(:first-of-type)': {
      margin: 'auto 0',
      width: '0.07rem',
      height: '1.913rem',
      backgroundColor: '#eaeaea'
    }
  },
  iconGrid: {
    height: '2.1875rem'
  },
  shareButton: {},
  compareButton: {},
  embedButton: {},
  showDataButton: {},
  downloadButton: {}
});

function Actions({
  loading,
  onShare,
  onDownload,
  showingData,
  onShowData,
  onCompare,
  embedCode,
  gaEvents: { share, embed, showData, download, compare },
  ...props
}) {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleEmbed = event => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Grid container justify="space-evenly" className={classes.root}>
      <BlockLoader loading={loading} height={40}>
        {onShare && (
          <>
            <div className={classes.verticalDivider} />
            <ActionButton
              gaEvents={share}
              onClick={onShare}
              classes={{
                actionButton: classes.shareButton,
                iconGrid: classes.actionButtonIconGrid
              }}
            >
              <ShareIcon />
              <Typography className={classes.actionButtonText}>
                Share
              </Typography>
            </ActionButton>
          </>
        )}

        {onDownload && (
          <>
            <div className={classes.verticalDivider} />
            <ActionButton
              gaEvents={download}
              onClick={onDownload}
              classes={{
                actionButton: classes.downloadButton,
                iconGrid: classes.actionButtonIconGrid
              }}
            >
              <DownloadIcon />
              <Typography className={classes.actionButtonText}>
                Download
              </Typography>
            </ActionButton>
          </>
        )}

        {embedCode && (
          <>
            <div className={classes.verticalDivider} />
            <ActionButton
              gaEvents={embed}
              onClick={handleEmbed}
              classes={{
                actionButton: classes.embedButton,
                iconGrid: classes.actionButtonIconGrid
              }}
            >
              <EmbedIcon />
              <Typography className={classes.actionButtonText}>
                Embed
              </Typography>
            </ActionButton>
          </>
        )}

        {onCompare && (
          <>
            <div className={classes.verticalDivider} />

            <ActionButton
              gaEvents={compare}
              onClick={onCompare}
              classes={{
                actionButton: classes.compareButton,
                iconGrid: classes.actionButtonIconGrid
              }}
            >
              <CompareIcon />
              <Typography className={classes.actionButtonText}>
                Compare
              </Typography>
            </ActionButton>
          </>
        )}

        {onShowData && (
          <>
            <div className={classes.verticalDivider} />
            <ActionButton
              gaEvents={showData}
              onClick={onShowData}
              classes={{
                actionButton: classes.showDataButton,
                iconGrid: classes.actionButtonIconGrid
              }}
            >
              <DataIcon />
              <Typography className={classes.actionButtonText}>
                {showingData ? 'Hide Data' : 'Show Data'}
              </Typography>
            </ActionButton>
          </>
        )}

        <Popover
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <EmbedCodeTextArea code={embedCode} />
        </Popover>
      </BlockLoader>
    </Grid>
  );
}

Actions.propTypes = {
  showingData: PropTypes.bool,
  loading: PropTypes.bool,
  onDownload: PropTypes.func,
  onShare: PropTypes.func,
  onShowData: PropTypes.func,
  embedCode: PropTypes.string,
  onCompare: PropTypes.func,
  gaEvents: PropTypes.shape({
    share: PropTypes.shape({}),
    download: PropTypes.shape({}),
    compare: PropTypes.shape({}),
    showData: PropTypes.shape({}),
    embed: PropTypes.shape({})
  })
};

Actions.defaultProps = {
  showingData: false,
  loading: false,
  onDownload: null,
  onShare: null,
  onShowData: null,
  embedCode: undefined,
  onCompare: null,
  gaEvents: {
    share: undefined,
    download: undefined,
    compare: undefined,
    showData: undefined,
    embed: undefined
  }
};

export default Actions;
