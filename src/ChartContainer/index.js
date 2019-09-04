import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import { ButtonBase } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';

import infoIcon from '../assets/info.png';
import shareIcon from '../assets/share.png';
import A from '../A';

const styles = {
  root: {
    width: 'available',
    height: 'auto',
    backgroundColor: '#fff',
    padding: '1.5625rem 1.25rem'
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
  title: {},
  subtitle: {},
  sourceLink: {}
};

function ChartContainer({
  classes,
  loading,
  content,
  sourceUrl,
  title,
  subtitle,
  children,
  onClickInfo,
  onClickShare
}) {
  const infoRef = React.useRef(null);
  const shareRef = React.useRef(null);
  const getReferenceObject = ref => {
    const { current } = ref;
    if (current) {
      return {
        clientHeight: current.clientHeight,
        clientWidth: current.clientWidth,
        getBoundingClientRect: () => current.getBoundingClientRect()
      };
    }
    return null;
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        wrap="nowrap"
        direction="row"
        alignItems="flex-start"
        justify="space-between"
      >
        <Grid item xs={8}>
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
          <TypographyLoader
            loading={loading}
            loader={{
              primaryOpacity: 0.5,
              secondaryOpacity: 1
            }}
            className={classes.subtitle}
            variant="h6"
          >
            {subtitle}
          </TypographyLoader>
        </Grid>

        <Grid
          item
          xs={4}
          container
          wrap="nowrap"
          direction="row"
          justify="flex-end"
        >
          <BlockLoader loading={loading} width="5rem" height="2.5rem">
            <ButtonBase
              className={classes.button}
              onClick={() =>
                onClickInfo && onClickInfo(getReferenceObject(infoRef))
              }
              ref={infoRef}
            >
              <img alt="Info" src={infoIcon} />
            </ButtonBase>
            <ButtonBase
              className={classes.button}
              onClick={() =>
                onClickShare && onClickShare(getReferenceObject(shareRef))
              }
              ref={shareRef}
            >
              <img alt="Share" src={shareIcon} />
            </ButtonBase>
          </BlockLoader>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        className={classes.content}
        style={{ width: content.width, height: content.height }}
      >
        <BlockLoader loading={loading}>{children}</BlockLoader>
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
  );
}

ChartContainer.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    button: PropTypes.string,
    content: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    sourceLink: PropTypes.string
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClickInfo: PropTypes.func,
  onClickShare: PropTypes.func,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string,
  loading: PropTypes.bool,
  content: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};

ChartContainer.defaultProps = {
  sourceUrl: undefined,
  onClickInfo: undefined,
  onClickShare: undefined,
  loading: false,
  content: {
    width: '100%',
    height: '100%'
  }
};

export default withStyles(styles)(ChartContainer);
