import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Button, Grid, Typography } from '@material-ui/core';

import BlockLoader from '../BlockLoader';

const useStyles = makeStyles(({ breakpoints, variant }) => ({
  root: {
    backgroundColor: '#eeebeb',
    // minWidth: '21.75rem',
    width: '100%',
    [breakpoints.up('md')]: {
      width: variant === 'data' ? '17,765625rem' : '18.890625rem' // .75 of lg
    },
    [breakpoints.up('lg')]: {
      width: variant === 'data' ? '23.6875rem' : '25.1875rem'
    }
  },
  insight: {
    padding: '0 1.25rem',
    [breakpoints.up('md')]: {
      width: variant === 'data' ? '14.8125rem' : '15.609375rem' // .75 of lg
    },
    [breakpoints.up('lg')]: {
      width: variant === 'data' ? '19.75rem' : '20.8125rem'
    }
  },
  title: {
    fontWeight: 'bold',
    marginTop: variant === 'data' ? '2.75rem' : '2.2125rem'
  },
  description: {
    backgroundColor: '#eeebeb',
    marginTop: variant === 'data' ? '0.8125rem' : '1.1875rem',
    marginBottom: '1rem'
  },
  analysisLink: {
    borderRadius: '0.75rem',
    fontWeight: 'bold',
    padding: '1rem 0',
    marginTop: '1rem',
    maxWidth: variant === 'data' ? '19.75rem' : '20.8125rem',
    textTransform: 'none',
    width: '100%',
    [breakpoints.up('md')]: {
      width: variant === 'data' ? '14.8125rem' : '15.609375rem' // .75 of lg
    },
    [breakpoints.up('lg')]: {
      width: variant === 'data' ? '19.75rem' : '20.8125rem'
    }
  },
  dataLink: {
    borderRadius: '0.75rem',
    borderWidth: '0.125rem',
    fontWeight: 'bold',
    padding: '1rem 0',
    margin: '1rem 0',
    maxWidth: variant === 'data' ? '19.75rem' : '20.8125rem',
    textTransform: 'none',
    width: '100%',
    [breakpoints.up('md')]: {
      width: variant === 'data' ? '14.8125rem' : '15.609375rem' // .75 of lg
    },
    [breakpoints.up('lg')]: {
      width: variant === 'data' ? '19.75rem' : '20.8125rem'
    },
    '&:hover': {
      borderWidth: '0.125rem'
    }
  }
}));

function Insight({
  analysisLink: analysisLinkProp,
  children,
  dataLink: dataLinkProp,
  description,
  loading,
  title,
  ...props
}) {
  const classes = useStyles(props);
  const hasInsight =
    analysisLinkProp || children || dataLinkProp || description || title;
  if (!hasInsight) {
    return null;
  }

  const analysisLink =
    analysisLinkProp && typeof analysisLinkProp === 'string'
      ? { href: analysisLinkProp }
      : analysisLinkProp;
  if (analysisLink) {
    analysisLink.variant = analysisLink.variant || 'contained';
    analysisLink.title =
      analysisLink.title || analysisLink.variant === 'contained'
        ? 'Read the full analysis'
        : 'Read the country analysis';
  }
  const dataLink =
    dataLinkProp && typeof dataLinkProp === 'string'
      ? { href: dataLinkProp, title: 'View more data by topic' }
      : dataLinkProp;
  if (dataLink) {
    dataLink.variant = dataLink.variant || 'outlined';
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      {children}

      <div className={classes.insight}>
        {title && (
          <BlockLoader loading={loading} height={20} width="100%">
            <Typography variant="subtitle2" className={classes.title}>
              {title}
            </Typography>
          </BlockLoader>
        )}
        {description && (
          <BlockLoader loading={loading} height={80} width="100%">
            <Typography
              variant="caption"
              className={classes.description}
              component="p"
            >
              {description}
            </Typography>
          </BlockLoader>
        )}
        {analysisLink && (
          <Grid item xs={12} container justify="center">
            <BlockLoader loading={loading} height={53} width="100%">
              <Button
                color="primary"
                variant={analysisLink.variant}
                className={classes.analysisLink}
                href={analysisLink.href}
              >
                {analysisLink.title}
              </Button>
            </BlockLoader>
          </Grid>
        )}
        {dataLink && (
          <Grid item xs={12} container justify="center">
            <BlockLoader loading={loading} height={53} width="100%">
              <Button
                color="primary"
                variant={dataLink.variant}
                className={classes.dataLink}
                href={dataLink.href}
              >
                {dataLink.title}
              </Button>
            </BlockLoader>
          </Grid>
        )}
      </div>
    </Grid>
  );
}

Insight.propTypes = {
  analysisLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
      variant: PropTypes.oneOf(['contained', 'outlined'])
    })
  ]),
  children: PropTypes.node,
  dataLink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
      variant: PropTypes.oneOf(['contained', 'outlined'])
    })
  ]),
  description: PropTypes.string,
  loading: PropTypes.bool,
  variant: PropTypes.oneOf(['data', 'analysis']),
  title: PropTypes.string
};

Insight.defaultProps = {
  analysisLink: undefined,
  children: undefined,
  dataLink: undefined,
  description: undefined,
  loading: false,
  title: undefined,
  variant: 'data'
};

export default Insight;
