import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { ButtonBase, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import infoIcon from '../assets/info.png';
import shareIcon from '../assets/share.png';

const useStyles = makeStyles({
  root: {
    width: 'available',
    height: 'auto',
    backgroundColor: '#fff',
    padding: '1.5625rem 1.25rem'
  },
  content: {
    padding: '1.25rem'
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
  subtitle: {}
});

function ChartContainer({
  title,
  subtitle,
  children,
  onClickInfo,
  onClickShare,
  overflowX,
  overflowY,
  maxChartWidth,
  maxChartHeight
}) {
  const classes = useStyles();
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
        alignItems="center"
        justify="space-between"
      >
        <Grid item xs={8}>
          <Typography className={classes.title} variant="h5">
            {title}
          </Typography>
          <Typography className={classes.subtitle} variant="h6">
            {subtitle}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          container
          wrap="nowrap"
          direction="row"
          justify="flex-end"
        >
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
        </Grid>
      </Grid>
      <Grid container justify="center">
        <div
          className={classes.content}
          style={{
            overflowX,
            overflowY,
            maxHeight: maxChartHeight,
            maxWidth: maxChartWidth
          }}
        >
          {children}
        </div>
      </Grid>
    </Grid>
  );
}

ChartContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  maxChartHeight: PropTypes.oneOf(PropTypes.number, PropTypes.string),
  maxChartWidth: PropTypes.oneOf(PropTypes.number, PropTypes.string),
  onClickInfo: PropTypes.func,
  onClickShare: PropTypes.func,
  overflowX: PropTypes.oneOf('hidden', 'auto', 'scroll'),
  overflowY: PropTypes.oneOf('hidden', 'auto', 'scroll'),
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

ChartContainer.defaultProps = {
  maxChartHeight: undefined,
  maxChartWidth: undefined,
  onClickInfo: undefined,
  onClickShare: undefined,
  overflowX: 'hidden',
  overflowY: 'hidden'
};

export default ChartContainer;
