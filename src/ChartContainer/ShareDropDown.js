import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share';

import DropDown from './DropDown';

const useStyles = makeStyles(() => ({
  root: {},
  social: {},
  title: {
    padding: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
    borderBottom: '0.0625rem solid #c4c4c4'
  },
  dropDownRoot: {},
  dropDownPaper: {}
}));

function ShareDropDown({
  anchorEl,
  children,
  email,
  facebook,
  onClose,
  open: openProp,
  shareIcon,
  twitter,
  title,
  ...props
}) {
  const classes = useStyles(props);
  const open = typeof openProps === 'undefined' ? anchorEl !== null : openProp;
  const currentUrl = window.location.href;
  const { url: twitterShareUrlProp, ...twitterProps } = twitter || {};
  const twitterShareUrl = twitter && (twitterShareUrlProp || currentUrl);
  const { url: facebookShareUrlProp, ...facebookProps } = twitter || {};
  const facebookShareUrl = facebook && (facebookShareUrlProp || currentUrl);
  const { url: emailShareUrlProp, ...emailProps } = email || {};
  const emailShareUrl = email && (emailShareUrlProp || currentUrl);
  return (
    <DropDown
      anchorEl={anchorEl}
      onClose={onClose}
      open={open}
      classes={{ root: classes.dropDownRoot, paper: classes.dropDownPaper }}
    >
      <Grid className={classes.root} container justify="center" {...props}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" component="h1">
            {title}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          className={classes.social}
          container
          justify="center"
        >
          {twitter && (
            <TwitterShareButton url={twitterShareUrl} {...twitterProps}>
              <TwitterIcon {...shareIcon} />
            </TwitterShareButton>
          )}
          {facebook && (
            <FacebookShareButton url={facebookShareUrl} {...facebookProps}>
              <FacebookIcon {...shareIcon} />
            </FacebookShareButton>
          )}
          {email && (
            <EmailShareButton url={emailShareUrl} {...emailProps}>
              <EmailIcon {...shareIcon} />
            </EmailShareButton>
          )}
        </Grid>
      </Grid>
    </DropDown>
  );
}

ShareDropDown.propTypes = {
  anchorEl: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  email: PropTypes.shape({
    subject: PropTypes.string,
    body: PropTypes.string,
    separator: PropTypes.string
  }),
  facebook: PropTypes.shape({
    url: PropTypes.string,
    quote: PropTypes.string,
    hashtag: PropTypes.string
  }),
  forwardedRef: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  shareIcon: PropTypes.shape({
    round: PropTypes.bool,
    size: PropTypes.number
  }),
  twitter: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    hashtags: PropTypes.string
  }),
  title: PropTypes.string
};

ShareDropDown.defaultProps = {
  open: undefined,
  email: null,
  facebook: null,
  shareIcon: {
    round: false
  },
  title: 'Share',
  twitter: null
};

export default ShareDropDown;
