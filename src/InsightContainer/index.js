import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';

import A from '../A';
import Actions from './Actions';

const useStyles = makeStyles(({ breakpoints }) => ({
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
  sourceGrid: {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: '1rem'
  },
  analysisLink: {
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.125rem 3rem',
    textDecoration: 'none',
    outline: 'none',
    borderRadius: '0.75rem',
    color: '#29a87c',
    border: 'solid 2px #29a87c',
    backgroundColor: '#fff',
    [breakpoints.up('md')]: {
      padding: '1.125rem 0.8rem'
    },
    [breakpoints.up('lg')]: {
      padding: '1.125rem 2.5rem'
    }
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
  },
  linkGrid: {
    margin: '3rem 0',
    [breakpoints.up('md')]: {
      margin: 0
    }
  }
}));

function InsightContainer({
  loading,
  content,
  source,
  title,
  children,
  insightActions,
  insightContext,
  insightLink,
  gaEvents,
  ...props
}) {
  const classes = useStyles(props);
  const {
    handleShare,
    handleCompare,
    handleDownload,
    handleShowData
  } = insightActions;

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid container item md={3} sm={12}>
        <BlockLoader loading={loading}>{children[0]}</BlockLoader>
        <TypographyLoader
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
              {`Source: ${source.title || source.href} `}
            </A>
          )}
        </TypographyLoader>
      </Grid>
      <Grid container item md={5} sm={12}>
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
      </Grid>
      <Grid container item md={4} sm={12} className={classes.actionsGrid}>
        <Grid
          container
          item
          direction="row"
          alignItems="flex-start"
          justify="center"
        >
          <BlockLoader loading={loading} height="2.5rem">
            <Actions
              onShare={handleShare}
              onDownload={handleDownload}
              onShowData={handleShowData}
              onCompare={handleCompare}
              gaEvents={gaEvents}
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
          <Grid
            container
            item
            alignItems="flex-start"
            justify="center"
            className={classes.linkGrid}
          >
            <BlockLoader loading={loading}>
              <A className={classes.analysisLink} href={insightLink.href}>
                {insightLink.title}
              </A>
            </BlockLoader>
          </Grid>
        )}
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
  children: twoNodeArrayType.isRequired,
  title: PropTypes.string.isRequired,
  source: PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string
  }),
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
    handleCompare: PropTypes.func
  }),
  gaEvents: PropTypes.shape({})
};

InsightContainer.defaultProps = {
  source: undefined,
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
    handleCompare: () => {}
  },
  content: {
    width: '100%',
    height: '100%'
  },
  gaEvents: undefined
};

export default InsightContainer;
