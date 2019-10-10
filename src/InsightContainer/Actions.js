import React, { createRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import { IconButton, Typography, Grid, Popover } from '@material-ui/core';

import shareIcon from '../assets/icons/network-connection.svg';
import embedIcon from '../assets/icons/code.svg';
import downloadIcon from '../assets/icons/download.svg';
import compareIcon from '../assets/icons/compare.svg';
import showIcon from '../assets/icons/tablet-reader.svg';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: 'white',
    borderRadius: '0.625rem',
    width: 'fit-content',
    clear: 'both',
    display: 'flex',
    height: '3.563rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0.6rem'
  },
  button: {
    height: '100%',
    borderRadius: '0',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    [breakpoints.up('md')]: {
      padding: '0.25rem'
    },
    [breakpoints.up('lg')]: {
      padding: '0.625rem'
    }
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
    width: '0.07rem',
    height: '1.913rem',
    backgroundColor: '#eaeaea'
  },
  iconGrid: {
    height: '2.1875rem'
  },
  shareButton: {},
  compareButton: {},
  embedButton: {},
  showDataButton: {},
  downloadButton: {}
}));

function ActionButton({
  children,
  onClick,
  gaEvents: { gaOn, gaEventAction, gaEventCategory, gaEventLabel },
  ...props
}) {
  const classes = useStyles(props);
  return (
    <IconButton
      className={classes.button}
      onClick={onClick}
      ga-on={gaOn}
      ga-event-category={gaEventCategory}
      ga-event-action={gaEventAction}
      ga-event-label={gaEventLabel}
      {...props}
    >
      <Grid
        component="span"
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        className={classes.iconGrid}
      >
        {children}
      </Grid>
    </IconButton>
  );
}

ActionButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  gaEvents: PropTypes.shape({
    gaOn: PropTypes.string,
    gaEventCategory: PropTypes.string,
    gaEventAction: PropTypes.string,
    gaEventLabel: PropTypes.string
  })
};

ActionButton.defaultProps = {
  onClick: null,
  gaEvents: {
    gaOn: undefined,
    gaEventCategory: undefined,
    gaEventAction: undefined,
    gaEventLabel: undefined
  }
};

const EmbedCodeTextArea = ({ code }) => {
  const ref = createRef();
  useEffect(() => {
    if (ref.current) {
      const { current: textArea } = ref;

      textArea.style.height = 'inherit';
      const computed = window.getComputedStyle(textArea);
      const height =
        parseInt(computed.getPropertyValue('border-top-width'), 10) +
        parseInt(computed.getPropertyValue('padding-top'), 10) +
        textArea.scrollHeight +
        parseInt(computed.getPropertyValue('border-bottom-width'), 10) +
        parseInt(computed.getPropertyValue('padding-bottom'), 10);

      textArea.style.height = `${height}px`;
    }
  }, [ref]);
  return (
    <textarea
      ref={ref}
      readOnly
      style={{
        resize: 'none',
        width: '25rem',
        margin: '1.25rem',
        border: 'none',
        outline: 'none'
      }}
      value={code}
    />
  );
};

EmbedCodeTextArea.propTypes = {
  code: PropTypes.string.isRequired
};

function Actions({
  onShare,
  onDownload,
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
    <div container className={classes.root}>
      {onShare && (
        <ActionButton
          gaEvents={share}
          onClick={onShare}
          classes={{
            button: classes.shareButton,
            iconGrid: classes.actionButtonIconGrid
          }}
        >
          <img alt="" src={shareIcon} />
          <Typography className={classes.actionButtonText}>Share</Typography>
        </ActionButton>
      )}

      {onDownload && (
        <>
          <div className={classes.verticalDivider} />
          <ActionButton
            gaEvents={download}
            onClick={onDownload}
            classes={{
              button: classes.downloadButton,
              iconGrid: classes.actionButtonIconGrid
            }}
          >
            <img alt="" src={downloadIcon} />
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
              button: classes.embedButton,
              iconGrid: classes.actionButtonIconGrid
            }}
          >
            <img alt="" src={embedIcon} />
            <Typography className={classes.actionButtonText}>Embed</Typography>
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
              button: classes.compareButton,
              iconGrid: classes.actionButtonIconGrid
            }}
          >
            <img alt="" src={compareIcon} />
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
              button: classes.showDataButton,
              iconGrid: classes.actionButtonIconGrid
            }}
          >
            <img alt="" src={showIcon} />
            <Typography className={classes.actionButtonText}>
              Show Data
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
    </div>
  );
}

Actions.propTypes = {
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
