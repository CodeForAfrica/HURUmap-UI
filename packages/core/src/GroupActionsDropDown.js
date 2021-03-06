import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import {
  ButtonBase,
  DialogContent,
  Grid,
  useMediaQuery,
  useTheme,
  TextField,
} from "@material-ui/core";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import LinkIcon from "@material-ui/icons/Link";
import CodeIcon from "@material-ui/icons/Code";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import EmbedDropDown from "./EmbedDropDown";

import DropDown from "./DropDown";
import makeStyles from "./makeStyles";

const useStyles = makeStyles(() => ({
  arrow: {
    position: "absolute",
    fontSize: 14,
    right: 0,
    marginRight: "-1.3rem",
    height: "3rem",
    width: "3rem",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "0 0 1rem 1rem",
      transform: "rotate(45deg)",
      borderColor: "transparent transparent transparent #fff",
      boxShadow: " 3px -3px 3px -3px rgba(0, 0, 0, 0.75)",
    },
  },
  embedRoot: {},
  embedTitle: {},
  embedSubtitle: {},
  embedCode: {},
  embedDropDownRoot: {},
  embedDropDownPaper: {},
  root: {},
  groupActions: {},
  groupActionsSocialIcon: {
    padding: "0 0.5rem 1.5rem 0.5rem",
  },
  groupActionsButton: {},
  groupActionsUrl: {
    width: "100%",
  },
  groupActionsUrlInput: {
    fontFamily: "monospace",
  },
  dropDownRoot: {},
  dropDownPaper: {},
}));

function GroupActionsDropDown({
  anchorEl,
  arrow,
  download,
  embed,
  facebook,
  getReferenceObject,
  handleDownload,
  instagram,
  link,
  linkedin,
  loading,
  onClickGroupActionsDownload: onClickGroupActionsDownloadProp,
  onClickGroupActionsEmbed: onClickGroupActionsEmbedProp,
  onClose,
  open: openProp,
  placement,
  toPng,
  twitter,
  url: urlProp,
  ...props
}) {
  const classes = useStyles(props);
  const theme = useTheme();
  const [showLinkText, setShowLinkText] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const url =
    urlProp || (typeof window !== "undefined" && window.location.href);

  const { url: linkedinShareUrlProp, ...linkedinProps } = linkedin || {};
  const linkedinShareUrl = linkedin && (linkedinShareUrlProp || url);

  const { url: twitterShareUrlProp, ...twitterProps } = twitter || {};
  const twitterShareUrl = twitter && (twitterShareUrlProp || url);

  const { url: facebookShareUrlProp, ...facebookProps } = twitter || {};
  const facebookShareUrl = facebook && (facebookShareUrlProp || url);

  const onClickGroupActionsDownload =
    onClickGroupActionsDownloadProp || handleDownload;
  const downloadGroupButtonRef = useRef(null);

  const embedGroupButtonRef = useRef(null);
  const [embedGroupAnchorEl, setEmbedGroupAnchorEl] = useState(null);
  const handleCloseEmbed = () => setEmbedGroupAnchorEl(null);
  const renderEmbedDropDown = () => {
    return typeof onClickGroupActionsEmbedProp === "undefined" ? (
      <EmbedDropDown
        anchorEl={embedGroupAnchorEl}
        onClose={handleCloseEmbed}
        title={embed.title}
        subtitle={embed.subtitle}
        classes={{
          root: classes.embedRoot,
          title: classes.embedTitle,
          subtitle: classes.embedSubtitle,
          code: classes.embedCode,
          dropDownRoot: classes.embedDropDownRoot,
          dropDownPaper: classes.embedDropDownPaper,
        }}
      >
        {embed.code}
      </EmbedDropDown>
    ) : null;
  };

  const onClickGroupActionsEmbed =
    onClickGroupActionsEmbedProp ||
    (typeof onClickGroupActionsEmbedProp === "undefined" &&
      ((el) => {
        setEmbedGroupAnchorEl(el);
      }));

  const [arrowRef, setArrowRef] = useState(null);
  const open = typeof openProp === "undefined" ? anchorEl !== null : openProp;

  if (
    !twitter &&
    !facebook &&
    !link &&
    !linkedin &&
    !instagram &&
    !embed &&
    !download
  ) {
    return null;
  }
  return (
    <DropDown
      anchorEl={anchorEl}
      onClose={onClose}
      open={open}
      classes={{ root: classes.dropDownRoot, paper: classes.dropDownPaper }}
      placement={placement}
      modifiers={{
        arrow: {
          enabled: true,
          element: arrowRef,
        },
      }}
      {...props}
    >
      <div>
        <Grid className={classes.root} container justify="center">
          {arrow ? (
            <span className={classes.arrow} ref={(node) => setArrowRef(node)} />
          ) : null}
          <DialogContent>
            <Grid
              item
              container
              xs={12}
              className={classes.groupActions}
              spacing={2}
            >
              {linkedin && (
                <Grid item>
                  <LinkedinShareButton
                    url={linkedinShareUrl}
                    {...linkedinProps}
                    className={classes.groupActionsSocialIcon}
                  >
                    {linkedin.icon ? (
                      <>{linkedin.icon}</>
                    ) : (
                      <LinkedInIcon
                        fontSize={isDesktop ? "large" : "default"}
                      />
                    )}
                  </LinkedinShareButton>
                </Grid>
              )}
              {instagram && (
                <Grid item>
                  <ButtonBase
                    className={classes.groupActionsButton}
                    {...instagram}
                  >
                    {instagram.icon ? (
                      <>{instagram.icon}</>
                    ) : (
                      <InstagramIcon
                        fontSize={isDesktop ? "large" : "default"}
                      />
                    )}
                  </ButtonBase>
                </Grid>
              )}
              {twitter && (
                <Grid item>
                  <TwitterShareButton
                    url={twitterShareUrl}
                    {...twitterProps}
                    className={classes.groupActionsSocialIcon}
                  >
                    {twitter.icon ? (
                      <>{twitter.icon}</>
                    ) : (
                      <TwitterIcon fontSize={isDesktop ? "large" : "default"} />
                    )}
                  </TwitterShareButton>
                </Grid>
              )}
              {facebook && (
                <Grid item>
                  <FacebookShareButton
                    url={facebookShareUrl}
                    {...facebookProps}
                    className={classes.groupActionsSocialIcon}
                  >
                    {facebook.icon ? (
                      <>{facebook.icon}</>
                    ) : (
                      <FacebookIcon
                        fontSize={isDesktop ? "large" : "default"}
                      />
                    )}
                  </FacebookShareButton>
                </Grid>
              )}
              {link && (
                <Grid item>
                  <ButtonBase
                    className={classes.groupActionsButton}
                    onClick={
                      link.onClick
                        ? link.onClick
                        : () => setShowLinkText(!showLinkText)
                    }
                    {...link}
                  >
                    {link.icon ? (
                      <>{link.icon}</>
                    ) : (
                      <LinkIcon fontSize={isDesktop ? "large" : "default"} />
                    )}
                  </ButtonBase>
                </Grid>
              )}
              {onClickGroupActionsDownload && download && (
                <Grid item>
                  <ButtonBase
                    className={classes.groupActionsButton}
                    onClick={() =>
                      toPng().then(
                        onClickGroupActionsDownload.bind(
                          null,
                          getReferenceObject(downloadGroupButtonRef)
                        )
                      )
                    }
                    ref={downloadGroupButtonRef}
                  >
                    {download.icon ? (
                      <>{download.icon}</>
                    ) : (
                      <SaveAltIcon fontSize={isDesktop ? "large" : "default"} />
                    )}
                  </ButtonBase>
                </Grid>
              )}
              {onClickGroupActionsEmbed && embed && (
                <Grid item>
                  <ButtonBase
                    className={classes.groupActionsButton}
                    onClick={() =>
                      onClickGroupActionsEmbed(
                        getReferenceObject(embedGroupButtonRef)
                      )
                    }
                    ref={embedGroupButtonRef}
                  >
                    {embed.icon ? (
                      <>{embed.icon}</>
                    ) : (
                      <CodeIcon fontSize={isDesktop ? "large" : "default"} />
                    )}
                  </ButtonBase>
                </Grid>
              )}
              {renderEmbedDropDown()}
              {showLinkText && (
                <TextField
                  defaultValue={url}
                  className={classes.groupActionsUrl}
                  InputProps={{
                    readOnly: true,
                    classes: { root: classes.groupActionsUrlInput },
                  }}
                  variant="outlined"
                />
              )}
            </Grid>
          </DialogContent>
        </Grid>
      </div>
    </DropDown>
  );
}

GroupActionsDropDown.propTypes = {
  anchorEl: PropTypes.shape({}),
  arrow: PropTypes.bool,
  download: PropTypes.shape({
    url: PropTypes.string,
    quote: PropTypes.string,
    hashtag: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }),
  embed: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    code: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }),
  facebook: PropTypes.shape({
    url: PropTypes.string,
    quote: PropTypes.string,
    hashtag: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }),
  getReferenceObject: PropTypes.func.isRequired,
  instagram: PropTypes.shape({
    url: PropTypes.string,
    quote: PropTypes.string,
    hashtag: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }),
  handleDownload: PropTypes.func.isRequired,
  link: PropTypes.shape({
    url: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }),
  linkedin: PropTypes.shape({
    url: PropTypes.string,
    quote: PropTypes.string,
    hashtag: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }),
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClickGroupActionsDownload: PropTypes.func,
  onClickGroupActionsEmbed: PropTypes.func,
  open: PropTypes.bool,
  placement: PropTypes.string,
  toPng: PropTypes.func.isRequired,
  twitter: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    hashtags: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }),
  url: PropTypes.string,
};

GroupActionsDropDown.defaultProps = {
  anchorEl: null,
  arrow: true,
  download: null,
  embed: null,
  facebook: null,
  instagram: null,
  link: null,
  linkedin: null,
  onClickGroupActionsDownload: undefined,
  onClickGroupActionsEmbed: undefined,
  open: undefined,
  placement: "left",
  twitter: null,
  url: undefined,
};

export default GroupActionsDropDown;
