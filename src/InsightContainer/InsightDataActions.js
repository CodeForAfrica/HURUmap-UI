import React, { createRef, useEffect, Fragment, useState } from 'react';
import { PropTypes } from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import {
  IconButton,
  Typography,
  Grid,
  Popover,
  ClickAwayListener
} from '@material-ui/core';

import shareIcon from '../assets/icons/network-connection.svg';
import embedIcon from '../assets/icons/code.svg';
import downloadIcon from '../assets/icons/download.svg';
import compareIcon from '../assets/icons/compare.svg';
import showIcon from '../assets/icons/tablet-reader.svg';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    borderRadius: '0.625rem',
    width: 'fit-content',
    clear: 'both',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '3.5625rem',
    marginTop: '0.6rem'
  },
  button: {
    height: '100%',
    borderRadius: '0',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  actionText: {
    fontFamily: 'Muli',
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
  }
}));

function ActionButtonComponent({ children, onClick, ...props }) {
  const classes = useStyles();
  return (
    <IconButton className={classes.button} onClick={onClick} {...props}>
      <Grid
        component="span"
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {children}
      </Grid>
    </IconButton>
  );
}

ActionButtonComponent.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

ActionButtonComponent.defaultProps = {
  onClick: null
};

const ActionButton = ActionButtonComponent;

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

function InsightDataActions({
  title,
  onShare,
  onDownload,
  onShowData,
  onCompare,
  embedCode
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleEmbed = event => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div className={classes.root}>
      {onShare && (
        <ActionButton
          ga-on="click"
          ga-event-category="Data"
          ga-event-action="Share"
          ga-event-label={title}
          onClick={onShare}
        >
          <img alt="" src={shareIcon} />
          <Typography className={classes.actionText}>Share</Typography>
        </ActionButton>
      )}

      {onDownload && (
        <Fragment>
          <div className={classes.verticalDivider} />
          <ActionButton
            ga-on="click"
            ga-event-category="Data"
            ga-event-action="Download"
            ga-event-label={title}
            onClick={onDownload}
          >
            <img alt="" src={downloadIcon} />
            <Typography className={classes.actionText}>Download</Typography>
          </ActionButton>
        </Fragment>
      )}

      {embedCode && (
        <Fragment>
          <div className={classes.verticalDivider} />
          <ActionButton
            ga-on="click"
            ga-event-category="Data"
            ga-event-action="Embed"
            ga-event-label={title}
            onClick={handleEmbed}
          >
            <img alt="" src={embedIcon} />
            <Typography className={classes.actionText}>Embed</Typography>
          </ActionButton>
        </Fragment>
      )}

      {onCompare && (
        <Fragment>
          <div className={classes.verticalDivider} />

          <ActionButton
            ga-on="click"
            ga-event-category="Data"
            ga-event-action="Compare"
            ga-event-label={title}
            onClick={onCompare}
          >
            <img alt="" src={compareIcon} />
            <Typography className={classes.actionText}>Compare</Typography>
          </ActionButton>
        </Fragment>
      )}

      {onShowData && (
        <Fragment>
          <div className={classes.verticalDivider} />
          <ActionButton
            ga-on="click"
            ga-event-category="Data"
            ga-event-action="ShowData"
            ga-event-label={title}
            onClick={onShowData}
          >
            <img alt="" src={showIcon} />
            <Typography className={classes.actionText}>Show Data</Typography>
          </ActionButton>
        </Fragment>
      )}

      <Popover
        open={Boolean(anchorEl)}
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
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <EmbedCodeTextArea code={embedCode} />
        </ClickAwayListener>
      </Popover>
    </div>
  );
}

InsightDataActions.propTypes = {
  title: PropTypes.string.isRequired,
  onDownload: PropTypes.func,
  onShare: PropTypes.func,
  onShowData: PropTypes.func,
  embedCode: PropTypes.string,
  onCompare: PropTypes.func
};

InsightDataActions.defaultProps = {
  onDownload: null,
  onShare: null,
  onShowData: null,
  embedCode: 'null',
  onCompare: null
};

export default InsightDataActions;
