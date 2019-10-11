import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import domToImage from 'dom-to-image';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';

import A from '../A';
import Actions from './Actions';
import Insight from './Insight';

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
    height: '100%',
    width: '100%',
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
    <BlockLoader loading={loading} height={40} width="100%">
      <Actions
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
    </BlockLoader>
  );
  const insight = insightProp || {};

  return (
    <Grid container className={classes.root}>
      {variant === 'data' && (
        <Grid item>
          <Grid
            container
            alignItems="space-between"
            className={classes.highlight}
          >
            <BlockLoader loading={loading}>{highlightChild}</BlockLoader>
            <TypographyLoader
              height={20}
              loading={loading}
              loader={{
                primaryOpacity: 0.5,
                secondaryOpacity: 1
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
            <BlockLoader loading={loading} height={20} width="80%">
              <Typography variant="h5" className={classes.title}>
                {title}
              </Typography>
            </BlockLoader>
          </Grid>
          <BlockLoader loading={loading} height={300} width="100%">
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

// This is a factory function (also called a higher-order function)
const createTwoNodeArrayType = isRequired => {
  // The factory returns a custom prop type
  return (props, propName, componentName) => {
    const childrenNodes = {
      children: PropTypes.arrayOf(PropTypes.node)
    };
    const { [propName]: prop } = props;
    if (prop == null && isRequired) {
      // Prop is required but wasn't specified. Throw an error.
      return new Error(`${propName} in ${componentName} isRequired`);
    }
    // check if not node types or not length == 2 return error
    const notNode = !PropTypes.checkPropTypes(
      childrenNodes,
      props,
      propName,
      componentName
    );
    if (prop.length !== 2 || notNode) {
      return new Error(
        `${propName} in ${componentName} needs to be an array of two node`
      );
    }
    return null;
  };
};

// Using the factory, create two different versions of your prop type
const twoNodeArrayType = createTwoNodeArrayType(false);
twoNodeArrayType.isRequired = createTwoNodeArrayType(true);

InsightContainer.propTypes = {
  actions: PropTypes.shape({
    handleShare: PropTypes.func,
    handleDownload: PropTypes.func,
    handleShowData: PropTypes.func,
    handleCompare: PropTypes.func
  }),
  children: twoNodeArrayType.isRequired,
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
