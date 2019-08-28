import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';

import A from '../A';
import InsightDataActions from './InsightDataActions';

const useStyles = makeStyles({
  root: {
    width: 'available',
    height: 'auto',
    backgroundColor: '#fff'
  },
  content: {
    padding: '1.25rem 0',
    overflow: 'hidden'
  },
  button: {
    border: '0.0625rem solid #d8d8d8',
    height: '2.5rem',
    width: '2.5rem',
    '&:first-child': {
      borderRight: 'none'
    }
  },
  actionsGrid: {
    backgroundColor: '#eeebeb'
  },
  title: {
    marginTop: '1rem',
    fontWeight: 'bold',
    fontSize: '1.25rem'
  },
  subtitle: {},
  sourceLink: {},
  analysisLink: {
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '1.125rem 0',
    textDecoration: 'none',
    outline: 'none',
    borderRadius: '0.75rem',
    color: '#29a87c',
    border: 'solid 2px #29a87c',
    backgroundColor: '#fff'
  },
  summaryGrid: {
    padding: '0 1.25rem'
  },
  summaryHead: {
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  summaryBrief: {
    fontSize: '0.8125rem',
    lineHeight: 2
  }
});

function InsightContainer({
  loading,
  content,
  sourceUrl,
  title,
  children,
  analysis,
  analysisUrl,
  summaryBrief,
  summaryHead
}) {
  const classes = useStyles();

  const handleShare = () => {};

  const handleDownload = () => {};

  const handleShowData = () => {};

  const handleComapre = () => {};

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid container item md={3}>
        <BlockLoader loading={loading}>{children[0]}</BlockLoader>
      </Grid>
      <Grid container item md={5}>
        <Grid item>
          <TypographyLoader
            loading={loading}
            loader={{
              primaryOpacity: 0.5,
              secondaryOpacity: 1
            }}
            className={classes.title}
            variant="h5"
          >
            {title}
          </TypographyLoader>
        </Grid>
        <Grid
          container
          justify="center"
          className={classes.content}
          style={{ width: content.width, height: content.height }}
        >
          <BlockLoader loading={loading}>{children[1]}</BlockLoader>
        </Grid>
        <TypographyLoader
          loading={loading}
          loader={{
            primaryOpacity: 0.5,
            secondaryOpacity: 1
          }}
          component="span"
        >
          <A className={classes.sourceLink} href={sourceUrl}>
            {sourceUrl}
          </A>
        </TypographyLoader>
      </Grid>
      <Grid container item md={4} className={classes.actionsGrid}>
        <Grid
          container
          item
          direction="row"
          alignItems="flex-start"
          justify="center"
        >
          <BlockLoader loading={loading} height="2.5rem">
            <InsightDataActions
              title={title}
              onShare={handleShare}
              onDownload={handleDownload}
              onShowData={handleShowData}
              onCompare={handleComapre}
            />
          </BlockLoader>
        </Grid>
        <Grid container item className={classes.summaryGrid}>
          <BlockLoader loading={loading}>
            <Typography className={classes.summaryHead}>
              {summaryHead}
            </Typography>
            <Typography className={classes.summaryBrief}>
              {summaryBrief}
            </Typography>
          </BlockLoader>
        </Grid>
        <Grid container item>
          <BlockLoader loading={loading}>
            <div style={{ width: '100%', padding: '0 1.2rem' }}>
              <A className={classes.analysisLink} href={analysisUrl}>
                {analysis}
              </A>
            </div>
          </BlockLoader>
        </Grid>
      </Grid>
    </Grid>
  );
}

InsightContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  title: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string,
  loading: PropTypes.bool,
  analysis: PropTypes.string,
  analysisUrl: PropTypes.string,
  summaryHead: PropTypes.string,
  summaryBrief: PropTypes.string,
  content: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};

InsightContainer.defaultProps = {
  sourceUrl: undefined,
  loading: false,
  analysisUrl: '/profiles/nigeria',
  analysis: 'Read the country analysis',
  summaryHead: 'Summary',
  summaryBrief:
    'Lorem ipsum dolor sit amec, the related demographic analysis for South Africa',
  content: {
    width: '100%',
    height: '100%'
  }
};

export default InsightContainer;
