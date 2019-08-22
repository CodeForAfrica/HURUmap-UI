import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

export default function CustomContentLoader({
  children,
  height,
  width,
  ...props
}) {
  return (
    <ContentLoader
      primaryOpacity={0.01}
      secondaryOpacity={0.1}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ width, height }}
      {...props}
    >
      {children}
    </ContentLoader>
  );
}

CustomContentLoader.propTypes = {
  children: PropTypes.shape().isRequired,
  width: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOf([PropTypes.string, PropTypes.number])
};

CustomContentLoader.defaultProps = {
  width: '100%',
  height: '100%'
};
