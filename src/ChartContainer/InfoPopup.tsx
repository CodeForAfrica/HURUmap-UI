import React from 'react';

import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  Link,
  Typography,
  ClickAwayListener,
  Paper,
  Fade,
  Theme
} from '@material-ui/core';
import Popper, { PopperProps } from '@material-ui/core/Popper';

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: '1rem',
      [breakpoints.up('sm')]: {
        width: '20rem'
      }
    },
    paper: {},
    source: {
      padding: '1.25rem',
      width: '100%',
      borderBottom: '1px solid #c4c4c4'
    },
    explore: {
      margin: '1.25rem'
    }
  });

interface Props extends WithStyles<typeof styles>, PopperProps {
  children: string;
  sourceLink: string;
  sourceTitle?: string;
  onClose: () => void;
  onExploreData?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  open: boolean;
}

function InfoPopper({
  children,
  classes,
  onClose,
  onExploreData,
  open,
  sourceLink,
  sourceTitle: sT,
  ...props
}: Props) {
  const sourceTitle = sT || sourceLink;
  return (
    <Popper open={open} className={classes.root} transition {...props}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={onClose}>
              <Grid container justify="center">
                <Typography className={classes.source}>
                  {'Sources: '}
                  <Link
                    href={sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sourceTitle}
                  </Link>
                </Typography>
                <Button
                  variant="outlined"
                  onClick={onExploreData}
                  className={classes.explore}
                >
                  {children}
                </Button>
              </Grid>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}

export default withStyles(styles)(InfoPopper);
