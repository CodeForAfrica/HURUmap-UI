import PropTypes from "prop-types";

export default {
  ...PropTypes,
  theme: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
