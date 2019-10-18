import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import domToImage from 'dom-to-image';

import { makeStyles, Grid } from '@material-ui/core';

import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';

import A from '../A';
import Actions from './Action';
import Insight from './Insight';
import propTypes from '../propTypes';

const useStyles = makeStyles({
  root: {
    height: 'auto',
    backgroundColor: '#f6f6f6'
  },
  title: ({ variant }) => ({
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    textAlign: variant === 'analysis' && 'center'
  }),
  highlightGrid: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '11.71875rem'
  },
  contentGrid: ({ variant }) => ({
    flexGrow: 1,
    flexShrink: 1,
    height: '100%',
    padding: '0 1.25rem',
    width: '100%',
    flexBasis: variant === 'data' ? '28.975rem' : '25.03125rem'
  }),
  insightGrid: ({ variant }) => ({
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: variant === 'data' ? '17.765625rem' : '18.890625rem'
  }),
  sourceLink: {},
  sourceGrid: {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: '1.25rem'
  },
  insight: {
    height: '100%'
  },
  insightAnalysisLink: {},
  insightDataLink: {},
  insightDescription: {},
  insightTitle: {},
  actions: {
    margin: '1rem 0'
  },
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
  const classes = useStyles(props);
  const { variant } = props;
  const highlightChild = children[0];
  const contentChild = children[1];
  const {
    handleShare,
    handleCompare,
    handleDownload: handleDownloadProp,
    handleShowData
  } = actions;
  const chartRef = useRef(null);

  const toPng = () => {
    if (chartRef.current) {
      return domToImage.toPng(chartRef.current).then(dataUrl => {
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
        root: classes.actions,
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
    <Grid container className={classes.root}>
      {variant === 'data' && (
        <Grid item className={classes.highlightGrid}>
          <Grid container alignItems="stretch" alignContent="space-between">
            <Grid item xs={12}>
              <BlockLoader loading={loading} height={300}>
                {highlightChild}
              </BlockLoader>
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid item ref={chartRef} className={classes.contentGrid}>
        <Grid container>
          <Grid item xs={12}>
            <TypographyLoader
              variant="h5"
              loading={loading}
              className={classes.title}
              loader={{
                height: 20
              }}
            >
              {title}
            </TypographyLoader>
          </Grid>
          <BlockLoader loading={loading} height={300}>
            {variant === 'analysis' && <Grid item>{highlightChild}</Grid>}
            <Grid item xs={12}>
              <Grid container justify="center">
                {contentChild}
              </Grid>
            </Grid>
          </BlockLoader>

          <Grid item xs={12}>
            <Grid container justify="center">
              {variant === 'analysis' ? actionsChildren : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

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
