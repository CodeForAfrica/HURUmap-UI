import React from 'react';

import { withStyles, WithStyles } from '@material-ui/styles';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core';

const styles = {
  root: {},
  content: {
    border: '1px solid #ced4da'
  },
  contentInput: {
    fontFamily: 'monospace',
    scroll: 'auto'
  },
  title: {},
  subtitle: {}
};

interface Props extends WithStyles<typeof styles> {
  children: string;
  subtitle: string;
  title: string;
  onClose: () => void;
  open: boolean;
}

function EmbedDialog({
  children,
  classes,
  onClose,
  open,
  subtitle,
  title,
  ...props
}: Props) {
  return (
    <Dialog onClose={onClose} open={open} className={classes.root} {...props}>
      <DialogTitle className={classes.title}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.subtitle}>
          {subtitle}
        </DialogContentText>
        <TextField
          value={children}
          multiline
          fullWidth
          className={classes.content}
          InputProps={{
            readOnly: true,
            classes: { input: classes.contentInput }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(EmbedDialog);
