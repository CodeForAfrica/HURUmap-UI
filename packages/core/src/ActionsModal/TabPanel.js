import React from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@material-ui/core";

export function a11yProps(index, id = "") {
  return {
    id: `${id}-actions-tab-${index}`,
    "aria-controls": `${id}-actions-tabpanel-${index}`,
  };
}

function TabPanel({ id, children, value, index, ...props }) {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`${id}-actions-tabpanel-${index}`}
      aria-labelledby={`${id}-actions-tab-${index}`}
      {...props}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

TabPanel.defaultProps = {
  id: "",
};

export default TabPanel;
