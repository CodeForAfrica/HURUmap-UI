import React from "react";
import PropTypes from "prop-types";

import {
  Container,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";

import DropDown from "./DropDown";
import makeStyles from "./makeStyles";

const useStyles = makeStyles({
  root: {},
  title: {},
  subtitle: {},
  code: {
    width: "100%",
    overflow: "auto",
  },
  dropDownRoot: {},
  dropDownPaper: {},
});

function EmbedDropDown({
  anchorEl,
  children,
  onClose,
  open: openProp,
  subtitle,
  title,
  ...props
}) {
  const classes = useStyles(props);
  const open = typeof openProp === "undefined" ? anchorEl !== null : openProp;

  return (
    <DropDown
      anchorEl={anchorEl}
      onClose={onClose}
      open={open}
      classes={{ root: classes.dropDownRoot, paper: classes.dropDownPaper }}
      {...props}
    >
      <Container className={classes.root}>
        {title && <DialogTitle className={classes.title}>{title}</DialogTitle>}
        <DialogContent>
          {subtitle && (
            <DialogContentText className={classes.subtitle}>
              {subtitle}
            </DialogContentText>
          )}
          <Typography
            variant="caption"
            component="code"
            className={classes.code}
          >
            {children}
          </Typography>
        </DialogContent>
      </Container>
    </DropDown>
  );
}

EmbedDropDown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  anchorEl: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

EmbedDropDown.defaultProps = {
  anchorEl: null,
  open: undefined,
  subtitle: null,
  title: null,
};

export default EmbedDropDown;
