import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share';

const useStyles = makeStyles(() => ({
  content: {},
  social: {},
  socialIcon: {
    padding: '0 0.5rem 1.5rem 0.5rem'
  },
  title: {},
  url: {
    width: '100%'
  },
  urlInput: {
    fontFamily: 'monospace'
  }
}));

function SharePanel({
  email,
  facebook,
  shareIcon,
  twitter,
  title,
  url,
  ...props
}) {
  const classes = useStyles(props);
  const { url: twitterShareUrlProp, ...twitterProps } = twitter || {};
  const twitterShareUrl = twitter && (twitterShareUrlProp || url);
  const { url: facebookShareUrlProp, ...facebookProps } = twitter || {};
  const facebookShareUrl = facebook && (facebookShareUrlProp || url);
  const { url: emailShareUrlProp, ...emailProps } = email || {};
  const emailShareUrl = email && (emailShareUrlProp || url);

  if (!twitter && !facebook && !email) {
    return null;
  }
  return (
    <>
      {title && <DialogTitle className={classes.title}>{title}</DialogTitle>}
      <DialogContent className={classes.content}>
        <Grid
          item
          xs={12}
          className={classes.social}
          container
          justify="center"
        >
          {twitter && (
            <TwitterShareButton
              url={twitterShareUrl}
              {...twitterProps}
              className={classes.socialIcon}
            >
              <TwitterIcon {...shareIcon} />
            </TwitterShareButton>
          )}
          {facebook && (
            <FacebookShareButton
              url={facebookShareUrl}
              {...facebookProps}
              className={classes.socialIcon}
            >
              <FacebookIcon {...shareIcon} />
            </FacebookShareButton>
          )}
          {email && (
            <EmailShareButton
              url={emailShareUrl}
              {...emailProps}
              className={classes.socialIcon}
            >
              <EmailIcon {...shareIcon} />
            </EmailShareButton>
          )}
        </Grid>
        {url && (
          <TextField
            defaultValue={url}
            className={classes.url}
            InputProps={{
              readOnly: true,
              classes: { root: classes.urlInput }
            }}
            variant="outlined"
          />
        )}
      </DialogContent>
    </>
  );
}

SharePanel.propTypes = {
  email: PropTypes.shape({
    subject: PropTypes.string,
    body: PropTypes.string,
    separator: PropTypes.string,
    url: PropTypes.string
  }),
  facebook: PropTypes.shape({
    url: PropTypes.string,
    quote: PropTypes.string,
    hashtag: PropTypes.string
  }),
  shareIcon: PropTypes.shape({
    round: PropTypes.bool,
    size: PropTypes.number
  }),
  twitter: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    hashtags: PropTypes.string
  }),
  title: PropTypes.string,
  url: PropTypes.string
};

SharePanel.defaultProps = {
  email: null,
  facebook: null,
  shareIcon: {
    round: false,
    size: 40
  },
  title: 'Share this with',
  twitter: null,
  url: null
};

export default SharePanel;
