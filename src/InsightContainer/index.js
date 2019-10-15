import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import domToImage from 'dom-to-image';

import { makeStyles, Grid } from '@material-ui/core';

import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';

import A from '../A';
import Actions from './Actions';
import Insight from './Insight';
import propTypes from '../propTypes';

const useStyles = makeStyles(({ breakpoints, variant }) => ({
  root: {
    height: 'auto',
    backgroundColor: '#f6f6f6'
  },
  content: {
    height: '100%',
    padding: '0 1.25rem',
    width: '100%',
    [breakpoints.up('md')]: {
      padding: 0,
      width: variant === 'data' ? '28.975rem' : '25.03125rem' // .75 of lg
    },
    [breakpoints.up('lg')]: {
      width: variant === 'data' ? '38.5rem' : '33.375rem'
    }
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginTop: '1rem'
  },
  highlight: {
    width: '100%',
    overflow: 'hidden',
    [breakpoints.up('md')]: {
      width: '11.71875rem' // .75 of lg
    },
    [breakpoints.up('lg')]: {
      width: '15.625rem'
    }
  },
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
}));

function InsightContainer({
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
  const highlightChild = variant === 'data' && children[0];
  const contentChild = variant === 'data' ? children[1] : children;
  const {
    handleShare,
    handleCompare,
    handleDownload: handleDownloadProp,
    handleShowData
  } = actions;
  const chartRef = useRef(null);

  const toPng = () => {
    if (chartRef.current) {
      // We need to remove `md` classes to make sure we screenshot the chart
      // at it's natural/maximum size
      chartRef.current.classList.remove('MuiGrid-grid-md-5');
      return domToImage.toPng(chartRef.current).then(dataUrl => {
        chartRef.current.classList.add('MuiGrid-grid-md-5');

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
        <Grid
          item
          container
          alignContent="space-between"
          alignItems="stretch"
          className={classes.highlight}
        >
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
      )}

      <Grid item ref={chartRef}>
        <Grid container justify="center" className={classes.content}>
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
            {contentChild}
          </BlockLoader>
          {variant === 'analysis' ? actionsChildren : null}
        </Grid>
      </Grid>

      <Grid item>
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
          {variant === 'data' ? actionsChildren : null}
        </Insight>
      </Grid>
    </Grid>
  );
}

InsightContainer.propTypes = {
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
