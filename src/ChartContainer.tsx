import React from 'react';
import { Typography, ButtonBase, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { GridProps } from '@material-ui/core/Grid';

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
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.86px',
    color: '#2c2c2a'
  },
  subtitle: {
    fontSize: '12px',
    opacity: 0.4,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    color: '#2c2c2a'
  }
});

interface Props extends GridProps {
  title: string;
  subtitle: string;
  // default: false
  // Set `true` if your chart is vertical
  // On overflow maxChartWidth, it will scroll x direction
  scrollX?: boolean;
  // default: false
  // Set `true` if your chart is horizontal
  // On overflow maxChartHeight, it will scroll y direction
  scrollY?: boolean;
  maxChartWidth?: string | number;
  maxChartHeight?: string | number;
  onClickInfo?: () => {};
  onClickShare?: () => {};
}

function ChartContainer({
  title,
  subtitle,
  children,
  onClickInfo,
  onClickShare,
  scrollX,
  scrollY,
  maxChartWidth,
  maxChartHeight,
  className,
  ...props
}: Props) {
  const classes = useStyles();
  return (
    <Grid container className={`${classes.root} ${className}`} {...props}>
      <Grid
        container
        wrap="nowrap"
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item xs={8}>
          <Typography className={classes.title} variant="h2">
            {title}
          </Typography>
          <Typography className={classes.subtitle} variant="h3">
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
            onClick={() => onClickInfo && onClickInfo()}
          >
            Info
          </ButtonBase>
          <ButtonBase
            className={classes.button}
            onClick={() => onClickShare && onClickShare()}
          >
            Share
          </ButtonBase>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <div
          className={classes.content}
          style={{
            overflowX: scrollX ? 'scroll' : 'hidden',
            overflowY: scrollY ? 'scroll' : 'hidden',
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

export default ChartContainer;
