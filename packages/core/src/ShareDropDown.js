import React from "react";
import PropTypes from "prop-types";

import { DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import DropDown from "./DropDown";
import makeStyles from "./makeStyles";

const useStyles = makeStyles(() => ({
  root: {},
  social: {},
  socialIcon: {
    padding: "0 0.5rem 1.5rem 0.5rem",
  },
  title: {},
  url: {
    width: "100%",
  },
  urlInput: {
    fontFamily: "monospace",
  },
  dropDownRoot: {},
  dropDownPaper: {},
}));

function ShareDropDown({
  anchorEl,
  email,
  facebook,
  onClose,
  open: openProp,
  shareIcon,
  twitter,
  title,
  url: urlProp,
  ...props
}) {
  const classes = useStyles(props);
  const open = typeof openProps === "undefined" ? anchorEl !== null : openProp;
  const url = urlProp || window.location.href;
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
    <DropDown
      anchorEl={anchorEl}
      onClose={onClose}
      open={open}
      classes={{ root: classes.dropDownRoot, paper: classes.dropDownPaper }}
      {...props}
    >
      <Grid className={classes.root} container justify="center">
        {title && <DialogTitle className={classes.title}>{title}</DialogTitle>}
        <DialogContent>
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
                classes: { root: classes.urlInput },
              }}
              variant="outlined"
            />
          )}
        </DialogContent>
      </Grid>
    </DropDown>
  );
}

ShareDropDown.propTypes = {
  anchorEl: PropTypes.shape({}),
  email: PropTypes.shape({
    subject: PropTypes.string,
    body: PropTypes.string,
    separator: PropTypes.string,
  }),
  facebook: PropTypes.shape({
    url: PropTypes.string,
    quote: PropTypes.string,
    hashtag: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  shareIcon: PropTypes.shape({
    round: PropTypes.bool,
    size: PropTypes.number,
  }),
  twitter: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    hashtags: PropTypes.string,
  }),
  title: PropTypes.string,
  url: PropTypes.string,
};

ShareDropDown.defaultProps = {
  anchorEl: null,
  email: null,
  facebook: null,
  open: undefined,
  shareIcon: {
    round: false,
    size: 40,
  },
  title: "Share",
  twitter: null,
  url: null,
};

export default ShareDropDown;
