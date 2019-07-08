import React from 'react';
import { WithStyles, Typography, ButtonBase, Grid } from '@material-ui/core';
import { createStyles, withStyles, CSSProperties } from '@material-ui/styles';

const styles = createStyles({
  root: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#fff',
    padding: '1.5625rem 1.25rem'
  },
  content: {
    width: 'available',
    height: '100%',
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
  contentRef?: React.RefObject<HTMLDivElement>;
  style?: CSSProperties;
}

function ChartContainer({
  contentRef,
  style,
  title,
  subtitle,
  onShare,
  onInfo,
  classes,
  children
}: Props) {
  return (
    <div className={classes.root} style={style}>
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
      <div ref={contentRef} className={classes.content}>
        {children}
      </div>
    </div>
  );
}

export default withStyles(styles)(ChartContainer);
