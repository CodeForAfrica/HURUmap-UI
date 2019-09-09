import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

export default function CustomContentLoader({
  id,
  children,
  height,
  width,
  ...props
}) {
  const [dimmension, setDimension] = useState({
    width: width === -1 ? 0 : width,
    height: height === -1 ? 0 : height
  });
  useEffect(() => {
    const rect = document
      .getElementById(id)
      .parentElement.getBoundingClientRect();
    setDimension({
      width: width === -1 ? rect.width : width,
      height: height === -1 ? rect.height : height
    });
  }, [id, width, height]);

  return (
    <ContentLoader
      id={id}
      primaryOpacity={0.01}
      secondaryOpacity={0.1}
      width={dimmension.width}
      height={dimmension.height}
      viewBox={`0 0 ${dimmension.width} ${dimmension.height}`}
      style={{ width, height }}
      {...props}
    >
      {children}
    </ContentLoader>
  );
}

CustomContentLoader.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

CustomContentLoader.defaultProps = {
  id:
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36),
  width: -1,
  height: -1
};
