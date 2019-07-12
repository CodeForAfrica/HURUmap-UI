import React from 'react';
import { WithStyles, Typography, ButtonBase, Grid } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';

const styles = createStyles({
  root: {
    width: 'available',
    height: 'auto',
    backgroundColor: '#fff',
    padding: '1.5625rem 1.25rem'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'available',
    padding: '0 1.25rem',
    minHeight: '200px'
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

export interface ChartContainerProps {
  title?: string;
  subtitle?: string;
  onShare?: () => void;
  onInfo?: () => void;
}

interface Props extends WithStyles<typeof styles>, ChartContainerProps {
  children: any;
}

function ChartContainer({
  title,
  subtitle,
  onShare,
  onInfo,
  classes,
  children
}: Props) {
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        wrap="nowrap"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={9}>
          <Typography className={classes.title} variant="h2">
            {title}
          </Typography>
          <Typography className={classes.subtitle} variant="h3">
            {subtitle}
          </Typography>
        </Grid>
        <Grid item container xs={3} justify="flex-end">
          <ButtonBase
            className={classes.button}
            onClick={() => onInfo && onInfo()}
          >
            Info
          </ButtonBase>
          <ButtonBase
            className={classes.button}
            onClick={() => onShare && onShare()}
          >
            Share
          </ButtonBase>
        </Grid>
      </Grid>
      <div className={classes.content}>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default withStyles(styles)(ChartContainer);
