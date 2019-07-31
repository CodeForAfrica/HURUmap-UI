import React from 'react';

import { withStyles, CSSProperties, WithStyles } from '@material-ui/styles';
import { ButtonBase, Typography } from '@material-ui/core';
import Grid, { GridProps } from '@material-ui/core/Grid';
import { PopperProps } from '@material-ui/core/Popper';

import infoIcon from '../assets/info.png';
import shareIcon from '../assets/share.png';

const styles = {
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
};

interface Props extends GridProps, WithStyles<typeof styles> {
  classes: GridProps['classes'] & WithStyles<typeof styles>['classes'];
  title: string;
  subtitle: string;
  /**
   * default: `hidden`
   * Set `scroll/auto` if your chart is vertical
   * On overflow maxChartWidth, it will scroll x direction
   */
  overflowX?: CSSProperties['overflowX'];
  /**
   * default: `hidden`
   * Set `scroll/auto` if your chart is horizontal
   * On overflow maxChartHeight, it will scroll y direction
   */
  overflowY?: CSSProperties['overflowY'];
  maxChartWidth?: string | number;
  maxChartHeight?: string | number;
  onClickInfo?: (anchorEl: PopperProps['anchorEl']) => void;
  onClickShare?: (anchorEl: PopperProps['anchorEl']) => void;
}

function ChartContainer({
  classes,
  title,
  subtitle,
  children,
  onClickInfo,
  onClickShare,
  overflowX = 'hidden',
  overflowY = 'hidden',
  maxChartWidth,
  maxChartHeight,
  className,
  ...props
}: Props) {
  const infoRef = React.useRef<HTMLButtonElement>(null);
  const shareRef = React.useRef<HTMLButtonElement>(null);
  const getReferenceObject = (
    ref: React.RefObject<HTMLButtonElement>
  ): PopperProps['anchorEl'] => {
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
    <Grid
      container
      className={`${classes.root} ${className}`}
      classes={classes}
      {...props}
    >
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

export default withStyles(styles)(ChartContainer);
