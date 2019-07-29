import React from 'react';

import { withStyles, WithStyles } from '@material-ui/styles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Link,
  Typography
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
  source: {},
  explore: {}
};

interface Props extends WithStyles<typeof styles> {
  sourceLink: string;
  sourceTitle?: string;
  onClose?: () => void;
  onExploreData?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  open: boolean;
}

function InfoDialog({
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
    <Dialog onClose={onClose} open={open} className={classes.root} {...props}>
      <DialogContent>
        <DialogContentText className={classes.source}>
          <Typography>
            Sources:
            <Link href={sourceLink} target="_blank" rel="noopener noreferrer">
              {sourceTitle}
            </Link>
          </Typography>
        </DialogContentText>
        <Button
          variant="outlined"
          className={classes.explore}
          onClick={onExploreData}
        >
          Explore Data
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(InfoDialog);
