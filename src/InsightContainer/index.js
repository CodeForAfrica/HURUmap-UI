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
  contextGrid: {
    padding: '0 1.25rem'
  },
  contextHead: {
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  contextBrief: {
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
  insightActions,
  insightContext,
  insightLink
}) {
  const classes = useStyles();
  const {
    handleShare,
    handleComapre,
    handleDownload,
    handleShowData
  } = insightActions;

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
        {insightContext && (
          <Grid container item className={classes.contextGrid}>
            <BlockLoader loading={loading}>
              <Typography className={classes.contextHead}>
                {insightContext.head}
              </Typography>
              <Typography className={classes.contextBrief}>
                {insightContext.brief}
              </Typography>
            </BlockLoader>
          </Grid>
        )}
        {insightLink && (
          <Grid container item>
            <BlockLoader loading={loading}>
              <div style={{ width: '100%', padding: '0 1.2rem' }}>
                <A className={classes.analysisLink} href={insightLink.href}>
                  {insightLink.title}
                </A>
              </div>
            </BlockLoader>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

const childrenNodes = {
  children: PropTypes.arrayOf(PropTypes.node)
};

// This is a factory function (also called a higher-order function)
const createCustomPropType = isRequired => {
  // The factory returns a custom prop type
  return (props, propName, componentName) => {
    const { [propName]: prop } = props;
    if (prop == null && isRequired) {
      // Prop is required but wasn't specified. Throw an error.
      return new Error(`${propName} in ${componentName} isRequired`);
    }
    // check types and length
    const isNode = !PropTypes.checkPropTypes(
      childrenNodes,
      props,
      propName,
      componentName
    );
    if (!Array.isArray(prop) || prop.length !== 2 || isNode) {
      return new Error(
        `${propName} in ${componentName} needs to be an array of two node`
      );
    }
    return null;
  };
};

// Using the factory, create two different versions of your prop type
const customPropType = createCustomPropType(false);
customPropType.isRequired = createCustomPropType(true);

InsightContainer.propTypes = {
  children: customPropType.isRequired,
  title: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string,
  loading: PropTypes.bool,
  content: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  insightLink: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string
  }),
  insightContext: PropTypes.shape({
    head: PropTypes.string,
    brief: PropTypes.string
  }),
  insightActions: PropTypes.shape({
    handleShare: PropTypes.func,
    handleDownload: PropTypes.func,
    handleShowData: PropTypes.func,
    handleComapre: PropTypes.func
  })
};

InsightContainer.defaultProps = {
  sourceUrl: undefined,
  loading: false,
  insightLink: {
    href: '/profiles/nigeria',
    title: 'Read the country analysis'
  },
  insightContext: undefined,
  insightActions: {
    handleShare: () => {},
    handleDownload: () => {},
    handleShowData: () => {},
    handleComapre: () => {}
  },
  content: {
    width: '100%',
    height: '100%'
  }
};

export default InsightContainer;
