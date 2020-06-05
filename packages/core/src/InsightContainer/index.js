import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { Box, Grid, Typography } from "@material-ui/core";

import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import {
  domToPng,
  isDowloadHiddenElement,
  DOWNLOAD_HIDDEN_CLASSNAME,
} from "../utils";

import BlockLoader from "../BlockLoader";
import TypographyLoader from "../TypographyLoader";

import DataTable from "../DataTable";

import A from "../A";
import Actions from "./Action";
import Insight from "./Insight";
import propTypes from "../propTypes";

import makeStyles from "../makeStyles";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    backgroundColor: "#fff",
  },
  containerRoot: {
    height: "auto",
    position: "relative",
    backgroundColor: "#f6f6f6",
  },
  title: ({ variant, rootWidth }) => ({
    fontSize: "1.25rem",
    fontWeight: "bold",
    textAlign: (variant === "analysis" || rootWidth < 628) && "center",
    marginBottom: (variant === "analysis" || rootWidth < 628) && "1.25rem",
  }),
  highlightGrid: ({ variant, rootWidth }) => ({
    display: (variant !== "data" || rootWidth < 628) && "none",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "11.71875rem",
  }),
  highlightContentChild: ({ variant, rootWidth }) => ({
    display: variant === "data" && rootWidth >= 628 && "none",
  }),
  contentGrid: {
    flexGrow: 1,
    flexShrink: 1,
    width: "100%",
    height: "available",
    flexBasis: "25.03125rem",
  },
  insightGrid: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "17rem",
    minWidth: "17rem",
  },
  sourceLink: {
    wordBreak: "break-all",
    whiteSpace: "normal",
  },
  sourceGrid: {
    display: "flex",
    alignItems: "flex-end",
  },
  insight: {
    height: "100%",
  },
  insightAnalysisLink: {},
  insightDataLink: {},
  insightDescription: {},
  insightTitle: {},
  actionsRoot: {},
  actionsShareButton: {},
  actionsCompareButton: {},
  actionsEmbedButton: {},
  actionsShowDataButton: {},
  actionsDownloadButton: {},
  actionsActionButtonIconGrid: {},
  actionsActionButtonVerticalDivider: {},
  actionsActionButtonText: {},
  dataTableRoot: {},
  dataTableActionButton: {},
  dataTableActionButtons: {},
  attribution: {
    display: "none",
    backgroundColor: palette.primary.main,
    padding: "1.5625rem 1.25rem",
  },
  attributionSource: {
    flex: "1 1 300px",
    "& div": {
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
    marginTop: "1.25rem",
    padding: "0 5%",
  },
  description: {
    display: "flex",
    marginLeft: "1.25rem",
  },
}));

function InsightContainer({
  attribution: attributionProp,
  actions,
  children,
  description,
  dataTable = {},
  embedCode,
  gaEvents,
  hideInsight,
  insight: insightProp,
  loading,
  logo,
  source,
  title,
  ...props
}) {
  const { variant } = props;
  const highlightChild = variant === "data" && children[0];
  const contentChild = children[1] || children[0];
  const {
    handleShare,
    handleCompare,
    handleDownload: handleDownloadProp,
    handleShowData,
  } = actions || {};

  const rootRef = useRef();
  const [showData, setShowData] = useState(false);

  const classes = useStyles({
    ...props,
    rootWidth: rootRef.current
      ? rootRef.current.getBoundingClientRect().width
      : 300,
  });

  const toPng = () => {
    return domToPng(rootRef.current, {
      filter: (n) => {
        const { classList } = n;
        if (!classList) {
          return true;
        }
        if (classList.contains(classes.attribution)) {
          const { style: nodeStyle } = n;
          nodeStyle.display = "flex";
        }
        return isDowloadHiddenElement(n);
      },
    });
  };

  const defaultHandleDownload = (e, dataUrl) => {
    if (dataUrl) {
      const link = document.createElement("a");
      link.download = `${title}.png`;
      link.href = dataUrl;

      document.body.appendChild(link); // Firefox requires this
      link.click();
      document.body.removeChild(link);
    }
  };
  // null should disable action
  const handleDownload =
    handleDownloadProp ||
    (handleDownloadProp === undefined ? defaultHandleDownload : undefined);

  const actionsChildren = (
    <Actions
      loading={loading}
      onShare={handleShare && ((e) => toPng().then(handleShare.bind(null, e)))}
      onDownload={
        handleDownload && ((e) => toPng().then(handleDownload.bind(null, e)))
      }
      showingData={showData}
      onShowData={
        dataTable &&
        dataTable.rawData &&
        (handleShowData || (() => setShowData(!showData)))
      }
      onCompare={handleCompare}
      gaEvents={gaEvents}
      embedCode={embedCode}
      classes={{
        root: classes.actionsRoot,
        shareButton: classes.actionsShareButton,
        embedButton: classes.actionsEmbedButton,
        showDataButton: classes.actionsShowDataButton,
        compareButton: classes.actionsCompareButton,
        downloadButton: classes.actionsDownloadButton,
        actionButtonIconGrid: classes.actionsButtonIconGrid,
        actionButtonText: classes.actionsActionButtonText,
        verticalDivider: classes.actionsActionButtonVerticalDivider,
      }}
    />
  );
  const insight = insightProp || {};
  // We're checking for undefined because if it's set to null or empty, we
  // assume that we're not suppose to show source attribution
  const attribution =
    attributionProp === undefined
      ? source && `Source ${source.href}`
      : attributionProp;

  return (
    <div ref={rootRef} className={classes.root}>
      <Grid container className={classes.containerRoot}>
        <Box
          display="flex"
          flexGrow={1}
          flexShrink={1}
          flexWrap="wrap"
          flexBasis={hideInsight ? "100%" : "35rem"}
          padding="1.25rem"
        >
          {variant === "data" && (
            <Grid item className={classes.highlightGrid}>
              <Grid container alignItems="stretch" alignContent="space-between">
                <Grid item xs={12}>
                  <BlockLoader loading={loading} height={300}>
                    {highlightChild}
                  </BlockLoader>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item className={classes.contentGrid}>
            <Box
              display="flex"
              height="100%"
              alignItems="flex-start"
              flexDirection="column"
            >
              <TypographyLoader
                variant="h5"
                loading={loading}
                className={classes.title}
              >
                {title}
              </TypographyLoader>
              <BlockLoader loading={loading} height={300}>
                {highlightChild && (
                  <Box className={classes.highlightContentChild}>
                    {highlightChild}
                  </Box>
                )}
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight={300}
                  flexGrow={1}
                >
                  {contentChild}
                </Box>
              </BlockLoader>
            </Box>
          </Grid>

          <Box width="100%" marginTop="1.25rem">
            <TypographyLoader
              loading={loading}
              loader={{
                height: 20,
              }}
              component="span"
              className={`${classes.sourceGrid} ${DOWNLOAD_HIDDEN_CLASSNAME}`}
            >
              {source && (
                <A className={classes.sourceLink} href={source.href}>
                  {`Source: ${source.title || source.href}`}
                </A>
              )}
            </TypographyLoader>
          </Box>

          {(variant === "analysis" || hideInsight) && (
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              marginTop="1.25rem"
              className={DOWNLOAD_HIDDEN_CLASSNAME}
            >
              {actionsChildren}
            </Box>
          )}
        </Box>

        {!hideInsight && (
          <Grid item className={classes.insightGrid}>
            <Insight
              analysisLink={insight.analysisLink}
              classes={{
                root: classes.insight,
                actions: DOWNLOAD_HIDDEN_CLASSNAME,
                analysisLink: classes.insightAnalysis,
                dataLink: classes.insightDataLink,
                description: classes.insightDescription,
                insight: classes.insightContent,
                links: DOWNLOAD_HIDDEN_CLASSNAME,
                title: classes.insightTitle,
              }}
              dataLink={insight.dataLink}
              description={insight.description}
              title={insight.title}
              variant={variant}
              loading={loading}
            >
              {variant === "data" && actionsChildren}
            </Insight>
          </Grid>
        )}

        {dataTable && dataTable.rawData && showData && (
          <DataTable
            classes={classes}
            data={dataTable}
            onHide={() => setShowData(false)}
          />
        )}
      </Grid>
      {description && (
        <Grid
          container
          alignItems="flex-start"
          wrap="nowrap"
          className={classes.descriptionWrapper}
        >
          <Grid item>
            <ArrowDropUp color="primary" />
          </Grid>
          <Grid item>
            <Typography variant="caption" className={classes.description}>
              {description}
            </Typography>
          </Grid>
        </Grid>
      )}
      {(attribution || logo) && (
        <div className={classes.attribution}>
          <Grid
            container
            wrap="wrap"
            alignItems="center"
            justify="space-between"
          >
            {attribution && (
              <Grid item className={classes.attributionSource}>
                <Typography
                  variant="caption"
                  component="div"
                  dangerouslySetInnerHTML={{ __html: attribution }}
                />
              </Grid>
            )}
            {logo && (
              <Grid item className={classes.attributionLogo}>
                <img src={logo} alt="log" />
              </Grid>
            )}
          </Grid>
        </div>
      )}
    </div>
  );
}

InsightContainer.propTypes = {
  attribution: PropTypes.string,
  dataTable: PropTypes.shape({
    rawData: propTypes.arrayOf(propTypes.shape({})),
  }),
  hideInsight: propTypes.bool,
  actions: PropTypes.shape({
    handleShare: PropTypes.func,
    handleDownload: PropTypes.func,
    handleShowData: PropTypes.func,
    handleCompare: PropTypes.func,
  }),
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.twoNodeArrayType),
  ]).isRequired,
  embedCode: PropTypes.string,
  gaEvents: PropTypes.shape({}),
  insight: PropTypes.shape({
    analysisLink: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        href: PropTypes.string,
        title: PropTypes.string,
        variant: PropTypes.oneOf(["contained", "outlined"]),
      }),
    ]),
    dataLink: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        href: PropTypes.string,
        title: PropTypes.string,
        variant: PropTypes.oneOf(["contained", "outlined"]),
      }),
    ]),
    description: PropTypes.string,
    title: PropTypes.string,
  }),
  logo: PropTypes.string,
  description: PropTypes.string,
  loading: PropTypes.bool,
  source: PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["data", "analysis"]),
};

InsightContainer.defaultProps = {
  attribution: undefined,
  dataTable: undefined,
  hideInsight: false,
  actions: undefined,
  embedCode: undefined,
  gaEvents: undefined,
  description: undefined,
  insight: undefined,
  logo: undefined,
  loading: false,
  source: undefined,
  variant: "data",
};

export default InsightContainer;
