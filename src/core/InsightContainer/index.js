import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Box, Grid, Typography } from '@material-ui/core';

import { domToPng } from '../utils';

import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';

import A from '../A';
import Actions from './Action';
import Insight from './Insight';
import propTypes from '../propTypes';

import defaultLogo from '../assets/logo.png';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    height: 'auto',
    position: 'relative',
    backgroundColor: '#f6f6f6'
  },
  title: ({ variant, rootWidth }) => ({
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textAlign: (variant === 'analysis' || rootWidth < 628) && 'center',
    marginBottom: (variant === 'analysis' || rootWidth < 628) && '1.25rem'
  }),
  highlightGrid: ({ variant, rootWidth }) => ({
    display: (variant !== 'data' || rootWidth < 628) && 'none',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '11.71875rem'
  }),
  highlightContentChild: ({ variant, rootWidth }) => ({
    display: variant === 'data' && rootWidth >= 628 && 'none'
  }),
  contentGrid: {
    flexGrow: 1,
    flexShrink: 1,
    width: '100%',
    height: 'available',
    flexBasis: '25.03125rem'
  },
  insightGrid: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '17rem',
    minWidth: '17rem'
  },
  sourceLink: {
    wordBreak: 'break-all',
    whiteSpace: 'normal'
  },
  sourceGrid: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  insight: {
    height: '100%'
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
  attribution: {
    display: 'none',
    backgroundColor: palette.primary.main,
    padding: '1.5625rem 1.25rem'
  },
  attributionSource: {
    flex: '1 1 300px',
    '& span': {
      color: '#fff'
    }
  },
  attributionLogo: {
    '& img': {
      maxHeight: '2rem',
      maxWidth: '300px'
    }
  }
}));

function InsightContainer({
  hideInsight,
  actions,
  children,
  embedCode,
  gaEvents,
  insight: insightProp,
  logo: logoProp,
  loading,
  source,
  title,
  ...props
}) {
  const { variant } = props;
  const highlightChild = children[0];
  const contentChild = children[1];
  const {
    handleShare,
    handleCompare,
    handleDownload: handleDownloadProp,
    handleShowData
  } = actions;

  const [rootNode, setRootNode] = useState();

  const classes = useStyles({
    ...props,
    rootWidth: rootNode ? rootNode.getBoundingClientRect().width : 300
  });

  const hideInImageClassName = 'Download--hidden';
  const toPng = () => {
    const filter = n => {
      const { classList } = n;
      if (!classList) {
        return true;
      }

      if (classList.contains(classes.attribution)) {
        const { style: nodeStyle } = n;
        nodeStyle.display = 'flex';
      }
      return !classList.contains(hideInImageClassName);
    };

    return domToPng(rootNode, { filter });
  };

  const defaultHandleDownload = (e, dataUrl) => {
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `${title}.png`;
      link.href = dataUrl;

      document.body.appendChild(link); // Firefox requires this
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownload = handleDownloadProp || defaultHandleDownload;
  const actionsChildren = (
    <Actions
      loading={loading}
      onShare={handleShare && (e => toPng().then(handleShare.bind(null, e)))}
      onDownload={
        handleDownload && (e => toPng().then(handleDownload.bind(null, e)))
      }
      onShowData={handleShowData}
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
        verticalDivider: classes.actionsActionButtonVerticalDivider
      }}
    />
  );
  const insight = insightProp || {};
  const logo = logoProp || defaultLogo;

  return (
    <Grid ref={setRootNode} container className={classes.root}>
      <Box
        display="flex"
        flexGrow={1}
        flexShrink={1}
        flexWrap="wrap"
        flexBasis="35rem"
        padding="1.25rem"
      >
        <Grid item className={classes.highlightGrid}>
          <Grid container alignItems="stretch" alignContent="space-between">
            <Grid item xs={12}>
              <BlockLoader loading={loading} height={300}>
                {highlightChild}
              </BlockLoader>
            </Grid>
          </Grid>
        </Grid>

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
              <Box className={classes.highlightContentChild}>
                {highlightChild}
              </Box>
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
              height: 20
            }}
            component="span"
            className={`${classes.sourceGrid} ${hideInImageClassName}`}
          >
            {source && (
              <A className={classes.sourceLink} href={source.href}>
                {`Source: ${source.title || source.href}`}
              </A>
            )}
          </TypographyLoader>
        </Box>

        {(variant === 'analysis' || hideInsight) && (
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            marginTop="1.25rem"
            className={hideInImageClassName}
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
              actions: `Download--hidden`,
              analysisLink: classes.insightAnalysis,
              dataLink: classes.insightDataLink,
              description: classes.insightDescription,
              insight: classes.insightContent,
              links: hideInImageClassName,
              title: classes.insightTitle
            }}
            dataLink={insight.dataLink}
            description={insight.description}
            title={insight.title}
            variant={variant}
            loading={loading}
          >
            {variant === 'data' && actionsChildren}
          </Insight>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        container
        alignItems="center"
        justify="space-between"
        wrap="wrap"
        className={classes.attribution}
      >
        <Grid item className={classes.attributionSource}>
          <Typography variant="caption">{`Source ${source.href}`}</Typography>
        </Grid>
        {logo && (
          <Grid item className={classes.attributionLogo}>
            <img src={logo} alt="log" />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

InsightContainer.propTypes = {
  hideInsight: propTypes.bool,
  actions: PropTypes.shape({
    handleShare: PropTypes.func,
    handleDownload: PropTypes.func,
    handleShowData: PropTypes.func,
    handleCompare: PropTypes.func
  }),
  children: propTypes.twoNodeArrayType.isRequired,
  embedCode: PropTypes.string,
  gaEvents: PropTypes.shape({}),
  insight: PropTypes.shape({
    analysisLink: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        href: PropTypes.string,
        title: PropTypes.string,
        variant: PropTypes.oneOf(['contained', 'outlined'])
      })
    ]),
    dataLink: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        href: PropTypes.string,
        title: PropTypes.string,
        variant: PropTypes.oneOf(['contained', 'outlined'])
      })
    ]),
    description: PropTypes.string,
    title: PropTypes.string
  }),
  logo: PropTypes.string,
  loading: PropTypes.bool,
  source: PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string
  }),
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['data', 'analysis'])
};

InsightContainer.defaultProps = {
  hideInsight: false,
  actions: {
    handleShare: () => {},
    handleDownload: undefined,
    handleShowData: () => {},
    handleCompare: () => {}
  },
  embedCode: undefined,
  gaEvents: undefined,
  insight: undefined,
  logo: undefined,
  loading: false,
  source: undefined,
  variant: 'data'
};

export default InsightContainer;
