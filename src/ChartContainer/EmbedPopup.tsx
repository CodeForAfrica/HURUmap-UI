import React from 'react';

import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import {
  ClickAwayListener,
  Fade,
  Paper,
  Theme,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import Popper, { PopperProps } from '@material-ui/core/Popper';

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: '1rem',
      [breakpoints.up('md')]: {
        width: '22rem'
      }
    },
    paper: {},
    code: {
      borderRadius: '0.25rem',
      border: '1px solid gray',
      overflow: 'auto'
    }
  });

interface Props extends WithStyles<typeof styles>, PopperProps {
  children: string;
  onClose: (event: React.MouseEvent<Document>) => void;
  open: boolean;
  subtitle?: string;
  title?: string;
}

function EmbedPopup({
  children,
  classes,
  onClose,
  open,
  subtitle,
  title,
  ...props
}: Props) {
  return (
    <Popper open={open} className={classes.root} transition {...props}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={onClose}>
              <div>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                  <DialogContentText>{subtitle}</DialogContentText>
                  <Typography variant="caption" component="code">
                    <pre className={classes.code}>{children}</pre>
                  </Typography>
                </DialogContent>
              </div>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}

export default withStyles(styles)(EmbedPopup);
