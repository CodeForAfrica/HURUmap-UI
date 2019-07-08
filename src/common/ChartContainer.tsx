import React from 'react';
import { WithStyles, Typography, ButtonBase, Grid } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';

const styles = createStyles({
  root: {
    backgroundColor: '#fff',
    padding: '1.5625rem 1.25rem'
  },
  content: {
    padding: '0 1.25rem'
  },
  button: {
    border: '0.0625rem solid #d8d8d8',
    height: '2.5rem',
    width: '2.5rem',
    '&:first-child': {
      borderRight: 'none'
    }
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
  children,
  ...props
}: Props) {
  return (
    <div className={classes.root} {...props}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="h3">{subtitle}</Typography>
        </Grid>
        <Grid item>
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
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default withStyles(styles)(ChartContainer);
