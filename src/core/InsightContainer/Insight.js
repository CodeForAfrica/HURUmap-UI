import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Button, Grid, Box } from '@material-ui/core';

import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#eeebeb'
  },
  insight: {
    padding: '0 1.25rem'
  },
  title: ({ variant }) => ({
    fontWeight: 'bold',
    marginTop: variant === 'data' ? '2.75rem' : '2.2125rem'
  }),
  description: ({ variant }) => ({
    backgroundColor: '#eeebeb',
    marginTop: variant === 'data' ? '0.8125rem' : '1.1875rem',
    marginBottom: '1rem'
  }),
  analysisLink: {
    borderRadius: '0.75rem',
    fontWeight: 'bold',
    padding: '1rem 0',
    marginBottom: '1rem',
    maxWidth: '20.8125rem',
    textTransform: 'none'
  },
  dataLink: {
    borderRadius: '0.75rem',
    borderWidth: '0.125rem',
    fontWeight: 'bold',
    padding: '1rem 0',
    marginBottom: '1rem',
    maxWidth: '20.8125rem',
    textTransform: 'none',
    '&:hover': {
      borderWidth: '0.125rem'
    }
  }
});

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
      <Box display="flex" width="100%" justifyContent="center">
        {children}
      </Box>
      <Box
        display="flex"
        width="100%"
        flexGrow={1}
        alignItems={!description ? 'center' : 'flex-start'}
      >
        <Grid container spacing={1} className={classes.insight}>
          <Grid item xs={12}>
            {title && description && (
              <TypographyLoader
                variant="subtitle2"
                loading={loading}
                loader={{ width: 150 }}
                className={classes.title}
              >
                {title}
              </TypographyLoader>
            )}
            {description && (
              <TypographyLoader
                component="p"
                variant="caption"
                loading={loading}
                loader={{ height: 80 }}
                className={classes.description}
              >
                {description}
              </TypographyLoader>
            )}
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1} justify="center">
              {analysisLink && (
                <BlockLoader loading={loading} height={40}>
                  <Grid item component={Box} flexGrow={1} flexBasis={333}>
                    <Grid container justify="center">
                      <Button
                        fullWidth
                        color="primary"
                        variant={analysisLink.variant}
                        className={classes.analysisLink}
                        href={analysisLink.href}
                      >
                        {analysisLink.title}
                      </Button>
                    </Grid>
                  </Grid>
                </BlockLoader>
              )}
              {dataLink && (
                <BlockLoader loading={loading} height={40}>
                  <Grid item component={Box} flexGrow={1} flexBasis={333}>
                    <Grid container justify="center">
                      <Button
                        fullWidth
                        color="primary"
                        variant={dataLink.variant}
                        className={classes.dataLink}
                        href={dataLink.href}
                      >
                        {dataLink.title}
                      </Button>
                    </Grid>
                  </Grid>
                </BlockLoader>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
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
