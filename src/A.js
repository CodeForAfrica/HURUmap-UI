import React from 'react';
import PropTypes from 'prop-types';

import { Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({});

function A({ ref, children, className, href, variant, ...props }) {
  return (
    <Link
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      variant={variant}
      underline="always"
      {...props}
    >
      {children}
    </Link>
  );
}
A.propTypes = {
  ref: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string
};

A.defaultProps = {
  ref: undefined,
  className: null,
  variant: 'inherit'
};

export default withStyles(styles)(A);
