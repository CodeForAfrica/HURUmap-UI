import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import { ButtonBase, Grid, Typography } from "@material-ui/core";

import classNames from "classnames";
import {
  domToPng,
  isDowloadHiddenElement,
  DOWNLOAD_HIDDEN_CLASSNAME,
} from "./utils";

import A from "./A";
import BlockLoader from "./BlockLoader";
import EmbedDropDown from "./EmbedDropDown";
import ShareDropDown from "./ShareDropDown";
import GroupActionsDropDown from "./GroupActionsDropDown";
import TypographyLoader from "./TypographyLoader";

import CompareIcon from "./assets/icons/compare.svg";
import DataIcon from "./assets/icons/tablet-reader.svg";
import DownloadIcon from "./assets/icons/download.svg";
import EmbedIcon from "./assets/icons/code.svg";
import ShareIcon from "./assets/icons/network-connection.svg";
import GroupActionsIcon from "./assets/icons/icon-share.svg";
import makeStyles from "./makeStyles";

const DOWNLOAD_ONLY_CLASSNAME = "Download--only";
const useStyles = makeStyles(({ breakpoints, palette }) => ({
  root: {
    backgroundColor: "transparent",
  },
  containerRoot: {
    backgroundColor: "#fff",
    width: "available",
  },
  chart: {
    margin: "1.5625rem 1.25rem",
  },
  content: {
    padding: "1.25rem 0",
    overflow: "hidden",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  actions: {},
  actionButton: {
    border: "0.0625rem solid #d8d8d8",
    marginLeft: "-0.0625rem",
    height: "2.5rem",
    width: "2.5rem",
  },
  title: (props) => ({
    textAlign: props.variant === "analysis" ? "center" : "inherit",
  }),
  subtitle: (props) => ({
    textAlign: props.variant === "analysis" ? "center" : "inherit",
  }),
  source: {
    width: "100%",
  },
  sourceLink: {
    width: "100%",
    marginLeft: "50px",
  },
  embedRoot: {},
  embedTitle: {},
  embedSubtitle: {},
  embedCode: {},
  embedDropDownRoot: {},
  embedDropDownPaper: {},
  shareRoot: {},
  groupActionsRoot: {
    left: '-15px !important',
    top: '15px !important',
  },
  shareTitle: {},
  shareSocial: {},
  shareUrl: {},
  shareUrlInput: {},
  shareDropDownRoot: {},
  shareDropDownPaper: {},
  attribution: {
    backgroundColor: palette.primary.main,
    padding: "1.5625rem 1.25rem",
  },
  attributionSource: {
    flex: "1 1 300px",
    "& span": {
      color: "#fff",
    },
  },
  attributionLogo: {
    "& img": {
      height: "auto",
      maxHeight: "2rem",
      maxWidth: "300px",
      width: "auto",
    },
  },
  descriptionWrapper: {
    marginTop: "1.75rem",
  },
  description: {
    [breakpoints.up("md")]: {
      display: "block",
      width: "62.36%", // golden-ratio
    },
  },
  [DOWNLOAD_ONLY_CLASSNAME]: {
    display: "none",
  },
}));

function ChartContainer({
  children,
  content,
  embed,
  groupActions,
  loading,
  logo,
  onClickCompare,
  onClickData,
  onClickDownload: onClickDownloadProp,
  onClickEmbed: onClickEmbedProp,
  onClickGroupActions: onClickGroupActionsProp,
  onClickShare: onClickShareProp,
  share,
  sourceLink,
  sourceTitle,
  title,
  subtitle,
  description,
  ...props
}) {
  const classes = useStyles(props);
  const { variant } = props;
  const getReferenceObject = (ref) => {
    const { current } = ref;
    if (current) {
      return {
        clientHeight: current.clientHeight,
        clientWidth: current.clientWidth,
        getBoundingClientRect: () => current.getBoundingClientRect(),
      };
    }
    return null;
  };

  const compareButtonRef = useRef(null);

  const dataButtonRef = useRef(null);

  const downloadButtonRef = useRef(null);
  const chartRef = useRef(null);
  const toPng = () => {
    return domToPng(chartRef.current, {
      filter: (node) => {
        const { classList } = node;
        if (classList) {
          if (
            typeof node.className === "string" &&
            node.className.includes(DOWNLOAD_ONLY_CLASSNAME)
          ) {
            const { style: nodeStyle } = node;
            nodeStyle.display = "flex";
          }

          return isDowloadHiddenElement(node);
        }
        return true;
      },
    });
  };

  const handleDownload = (anchorEl, dataUrl) => {
    if (dataUrl) {
      const link = document.createElement("a");
      link.download = `${title}.png`;
      link.href = dataUrl;

      document.body.appendChild(link); // Firefox requires this
      link.click();
      document.body.removeChild(link);
    }
  };

  const onClickDownload = onClickDownloadProp || handleDownload;

  const [embedAnchorEl, setEmbedAnchorEl] = useState(null);
  const embedButtonRef = useRef(null);
  const handleCloseEmbed = () => setEmbedAnchorEl(null);
  const renderEmbedDropDown = () => {
    return typeof onClickEmbedProp === "undefined" ? (
      <EmbedDropDown
        anchorEl={embedAnchorEl}
        onClose={handleCloseEmbed}
        open={embedAnchorEl === null}
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

  const groupActionsButtonRef = useRef(null);
  const [groupActionsAnchorEl, setGroupActionsAnchorEl] = useState(null);
  const handleCloseGroupActions = () => setGroupActionsAnchorEl(null);
  const renderGroupActionsDropDown = () => {
    return typeof onClickGroupActionsProp === "undefined" ? (
      <GroupActionsDropDown
        {...share}
        anchorEl={groupActionsAnchorEl}
        classes={{
          root: classes.groupActionsRoot,
          social: classes.shareSocial,
          url: classes.shareUrl,
          urlInput: classes.shareUrlInput,
          dropDownRoot: classes.shareDropDownRoot,
          dropDownPaper: classes.shareDropDownPaper,
        }}
        onClose={handleCloseGroupActions}
      >
        Explore Data
      </GroupActionsDropDown>
    ) : null;
  };

  const shareButtonRef = useRef(null);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const handleCloseShare = () => setShareAnchorEl(null);
  const renderShareDropDown = () => {
    return typeof onClickShareProp === "undefined" ? (
      <ShareDropDown
        {...share}
        anchorEl={shareAnchorEl}
        classes={{
          root: classes.shareRoot,
          title: classes.shareTitle,
          social: classes.shareSocial,
          url: classes.shareUrl,
          urlInput: classes.shareUrlInput,
          dropDownRoot: classes.shareDropDownRoot,
          dropDownPaper: classes.shareDropDownPaper,
        }}
        onClose={handleCloseShare}
      >
        Explore Data
      </ShareDropDown>
    ) : null;
  };

  
  const onClickEmbed =
  onClickEmbedProp ||
  (typeof onClickEmbedProp === "undefined" &&
  ((anchorEl) => {
    setShareAnchorEl(null);
    setEmbedAnchorEl(anchorEl);
  }));

  const onClickGroupActions = 
    onClickGroupActionsProp ||
    (typeof onClickGroupActionsProp === "undefined" && (
      (anchorEl) => {
        setGroupActionsAnchorEl(anchorEl);
      }
    ));

  const onClickShare =
    onClickShareProp ||
    (typeof onClickShareProp === "undefined" &&
      ((anchorEl) => {
        setEmbedAnchorEl(null);
        setShareAnchorEl(anchorEl);
      }));

  // eslint-disable-next-line react/prop-types
  const renderDescription = (c) =>
    description && (
      <Grid
        container
        wrap="nowrap"
        alignItems="flex-start"
        className={classNames([classes.descriptionWrapper, ...c])}
      >
        <Grid item>
          <Typography variant="caption" className={classes.description}>
            {description}
          </Typography>
        </Grid>
      </Grid>
    );

  const titleComponents = (
    <>
      <TypographyLoader
        loading={loading}
        loader={{
          primaryOpacity: 0.5,
          secondaryOpacity: 1,
        }}
        className={classes.title}
        variant="body1"
      >
        {title}
      </TypographyLoader>
      {subtitle && subtitle.length > 0 && (
        <TypographyLoader
          loading={loading}
          loader={{
            primaryOpacity: 0.5,
            secondaryOpacity: 1,
          }}
          className={classes.subtitle}
          variant="caption"
        >
          {subtitle}
        </TypographyLoader>
      )}
    </>
  );
  const groupActionsComponent = (
    <>
    <BlockLoader loading={loading} width={40} height={40}>
          <ButtonBase
            className={classes.groupActionsButton}
            onClick={() => onClickGroupActions(getReferenceObject(groupActionsButtonRef))}
            ref={groupActionsButtonRef}
          >
            <GroupActionsIcon />
          </ButtonBase>
    </BlockLoader>
    {renderGroupActionsDropDown()}
    </>
  );
  const actionComponents = (
    <>
      {onClickShare && (
        <BlockLoader loading={loading} width={40} height={40}>
          <ButtonBase
            className={classes.actionButton}
            onClick={() => onClickShare(getReferenceObject(shareButtonRef))}
            ref={shareButtonRef}
          >
            <ShareIcon />
          </ButtonBase>
        </BlockLoader>
      )}

      {onClickEmbed && (
        <BlockLoader loading={loading} width={40} height={40}>
          <ButtonBase
            className={classes.actionButton}
            onClick={() => onClickEmbed(getReferenceObject(embedButtonRef))}
            ref={embedButtonRef}
          >
            <EmbedIcon />
          </ButtonBase>
        </BlockLoader>
      )}

      {onClickDownload && (
        <BlockLoader loading={loading} width={40} height={40}>
          <ButtonBase
            className={classes.actionButton}
            onClick={() =>
              toPng().then(
                onClickDownload.bind(
                  null,
                  getReferenceObject(downloadButtonRef)
                )
              )
            }
            ref={downloadButtonRef}
          >
            <DownloadIcon />
          </ButtonBase>
        </BlockLoader>
      )}

      {onClickCompare && (
        <BlockLoader loading={loading} width={40} height={40}>
          <ButtonBase
            className={classes.actionButton}
            onClick={() => onClickCompare(getReferenceObject(compareButtonRef))}
            ref={compareButtonRef}
          >
            <CompareIcon />
          </ButtonBase>
        </BlockLoader>
      )}

      {onClickData && (
        <BlockLoader loading={loading} width={40} height={40}>
          <ButtonBase
            className={classes.actionButton}
            onClick={() => onClickData(getReferenceObject(dataButtonRef))}
            ref={dataButtonRef}
          >
            <DataIcon />
          </ButtonBase>
        </BlockLoader>
      )}

      {renderEmbedDropDown()}
      {renderShareDropDown()}
    </>
  );
  return (
    <div ref={chartRef} className={classes.root}>
      <Grid container className={classes.containerRoot}>
        <Grid item xs={12} container className={classes.chart}>
          {variant === "data" && (
            <Grid
              item
              xs={12}
              container
              wrap="nowrap"
              direction="row"
              alignItems="flex-start"
              justify="space-between"
            >
              <Grid item xs={8}>
                {titleComponents}
              </Grid>

              <Grid
                item
                xs={4}
                container
                wrap="nowrap"
                direction="row"
                justify="flex-end"
                className={`${DOWNLOAD_HIDDEN_CLASSNAME} ${classes.actions}`}
              >
                {groupActions ? groupActionsComponent: actionComponents}
              </Grid>
            </Grid>
          )}
          {variant === "analysis" && (
            <Grid
              item
              xs={12}
              container
              wrap="nowrap"
              direction="row"
              alignItems="center"
              justify="center"
              className={`${DOWNLOAD_HIDDEN_CLASSNAME} ${classes.actions}`}
            >
              <Grid item>{titleComponents}</Grid>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            container
            justify="center"
            className={classes.content}
            style={{ width: content.width, height: content.height }}
          >
            {/* Set width 100% only when loading to allow Chart to define its own width
            otherwise a chart with a small width will scale and look large. */}
            <div
              style={{ width: loading && "100%", height: "100%" }}
              className={classes.container}
            >
              <BlockLoader loading={loading}>{children}</BlockLoader>
              <TypographyLoader
                loading={loading}
                loader={{
                  primaryOpacity: 0.5,
                  secondaryOpacity: 1,
                }}
                component="div"
                className={`${DOWNLOAD_HIDDEN_CLASSNAME} ${classes.source}`}
              >
                {sourceLink && (
                  <A
                    variant="caption"
                    className={classes.sourceLink}
                    href={sourceLink}
                  >
                    {`Source: ${sourceTitle || sourceLink}`}
                  </A>
                )}
              </TypographyLoader>
            </div>
          </Grid>
          {variant === "analysis" && (
            <Grid
              item
              xs={12}
              container
              wrap="nowrap"
              direction="row"
              alignItems="center"
              justify="center"
              className={DOWNLOAD_HIDDEN_CLASSNAME}
            >
              <Grid item>{actionComponents}</Grid>
            </Grid>
          )}
          {renderDescription([classes[DOWNLOAD_ONLY_CLASSNAME]])}
        </Grid>
      </Grid>
      {renderDescription([DOWNLOAD_HIDDEN_CLASSNAME])}
      <Grid
        container
        wrap="wrap"
        alignItems="center"
        justify="space-between"
        className={classNames([
          classes.attribution,
          classes[DOWNLOAD_ONLY_CLASSNAME],
        ])}
      >
        <Grid item className={classes.attributionSource}>
          {sourceLink && (
            <Typography variant="caption">{`Source ${sourceLink}`}</Typography>
          )}
        </Grid>
        <Grid item className={classes.attributionLogo}>
          <img src={logo} alt="log" />
        </Grid>
      </Grid>
    </div>
  );
}

ChartContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  content: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  description: PropTypes.string,
  embed: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    code: PropTypes.string,
  }),
  groupActions: PropTypes.bool,
  loading: PropTypes.bool,
  logo: PropTypes.string,
  onClickCompare: PropTypes.func,
  onClickData: PropTypes.func,
  onClickDownload: PropTypes.func,
  onClickEmbed: PropTypes.func,
  onClickShare: PropTypes.func,
  share: PropTypes.shape({
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
    shareIcon: PropTypes.shape({
      round: PropTypes.bool,
      size: PropTypes.number,
    }),
    twitter: PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
      hashtags: PropTypes.string,
    }),
  }),
  sourceLink: PropTypes.string,
  sourceTitle: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["data", "analysis"]),
};

ChartContainer.defaultProps = {
  embed: {
    title: "Embed code for this chart",
    subtitle:
      "Copy the code below, then paste into your own CMS or HTML. Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge.",
    code: `<iframe
id="cr-embed-region-11-literacy_and_numeracy_tests-english_test_dist"
className="census-reporter-embed"
src="https://tanzania.hurumap.org/embed/iframe.html?geoID=region-11&geoVersion=2009&chartDataID=literacy_and_numeracy_tests-english_test_dist&dataYear=2015&chartType=pie&chartHeight=200&chartQualifier=&chartRelease=Uwezo+Annual+Assessment+Report+2015&chartSourceTitle=&chartSourceLink=&chartTitle=Percentage+of+children+aged+6-16+passing+English+literacy+tests&chartSubtitle=&initialSort=-value&statType=percentage"
frameBorder="0"
width="100%"
height="300"
style="margin: 1em; max-width: 18.75rem;"
/>
<script src="https://tanzania.hurumap.org/static/js/embed.chart.make.js" />`,
  },
  description: undefined,
  logo: undefined,
  onClickCompare: undefined,
  onClickData: undefined,
  onClickDownload: undefined,
  onClickEmbed: undefined,
  onClickGroupActions: undefined,
  onClickShare: undefined,
  groupActions: false,
  share: {
    // Default to twitter and facebook, sharing window.location.url
    facebook: {},
    twitter: {},
  },
  sourceLink: undefined,
  sourceTitle: undefined,
  loading: false,
  content: {
    width: "100%",
    height: "100%",
  },
  subtitle: undefined,
  variant: "data",
};

export default ChartContainer;
