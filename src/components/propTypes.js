import PropTypes from 'prop-types';

export default {
  ...PropTypes,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};
