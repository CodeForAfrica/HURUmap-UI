import React from "react";
import Grid from "@material-ui/core/Grid";
import propTypes from "../propTypes";

import ActionButton from "../ActionButton";
import EmbedIcon from "../assets/icons/code.svg";
import ShareIcon from "../assets/icons/network-connection.svg";
import makeStyles from "../makeStyles";

const useStyles = makeStyles({
  root: {
    right: 20,
    color: "white",
    padding: "2px 0 2px 5px",
    borderRadius: 5,
  },
  actionButton: {
    color: "white",
  },
  iconGrid: {
    height: "unset",
  },
});

function SnippetActions({ onShare, onEmbed, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid item>
        <ActionButton
          classes={{
            actionButton: classes.actionButton,
            iconGrid: classes.iconGrid,
          }}
          onClick={onShare}
        >
          <ShareIcon />
        </ActionButton>
      </Grid>
      <Grid item>
        <ActionButton
          classes={{
            actionButton: classes.actionButton,
            iconGrid: classes.iconGrid,
          }}
          onClick={onEmbed}
        >
          <EmbedIcon />
        </ActionButton>
      </Grid>
    </Grid>
  );
}

SnippetActions.propTypes = {
  onShare: propTypes.func,
  onEmbed: propTypes.func,
};

SnippetActions.defaultProps = {
  onShare: undefined,
  onEmbed: undefined,
};

export default SnippetActions;
