import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import domToImage from 'dom-to-image';

import { makeStyles, Grid, Box } from '@material-ui/core';

import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';

import A from '../A';
import Actions from './Action';
import Insight from './Insight';
import propTypes from '../propTypes';

const useStyles = makeStyles({
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
  actionsActionButtonText: {}
});

function InsightContainer({
  hideInsight,
  actions,
  children,
  embedCode,
  gaEvents,
  insight: insightProp,
  loading,
  source,
  title,
  ...props
}) {
  const { variant } = props;
  const highlightChild = variant === 'data' && children[0];
  const contentChild = children[1] || children[0];
  const {
    handleShare,
    handleCompare,
    handleDownload: handleDownloadProp,
    handleShowData
  } = actions;

  const [rootNode, setRootNode] = useState();
  const chartRef = useRef(null);

  const classes = useStyles({
    ...props,
    rootWidth: rootNode ? rootNode.getBoundingClientRect().width : 300
  });

  const toPng = () => {
    if (chartRef.current) {
      return domToImage
        .toPng(chartRef.current, {
          filter: n => {
            if (typeof n.className !== 'string') {
              return true;
            }
            return !n.className.includes('Download--hidden');
          }
        })
        .then(dataUrl => {
          return dataUrl;
        });
    }
    return Promise.resolve(undefined);
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

  return (
    <Grid ref={setRootNode} container className={classes.root}>
      <Box
        display="flex"
        flexGrow={1}
        flexShrink={1}
        flexWrap="wrap"
        flexBasis={hideInsight ? '100%' : '35rem'}
        padding="1.25rem"
      >
        {variant === 'data' && (
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

        <Grid item ref={chartRef} className={classes.contentGrid}>
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
              height: 20
            }}
            component="span"
            className={classes.sourceGrid}
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
              analysisLink: classes.insightAnalysis,
              dataLink: classes.insightDataLink,
              description: classes.insightDescription,
              insight: classes.insightContent,
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
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.twoNodeArrayType)
  ]).isRequired,
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
  loading: false,
  source: undefined,
  variant: 'data'
};

export default InsightContainer;
