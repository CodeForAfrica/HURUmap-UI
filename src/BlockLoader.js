import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from './ContentLoader';

export default function BlockLoader({ loading, children, ...props }) {
  return loading ? (
    <ContentLoader primaryOpacity={0.5} secondaryOpacity={1} {...props}>
      <rect x="0" y="0" width="100%" height="100%" />
    </ContentLoader>
  ) : (
    children
  );
}

BlockLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.shape().isRequired,
  width: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOf([PropTypes.string, PropTypes.number])
};

BlockLoader.defaultProps = {
  width: '100%',
  height: '100%'
};
