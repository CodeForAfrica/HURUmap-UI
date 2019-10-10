import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import shortid from 'shortid';

export default function CustomContentLoader({
  id,
  children,
  height,
  width,
  ...props
}) {
  const [dimension, setDimension] = useState({
    width: width === undefined ? 0 : width,
    height: height === undefined ? 0 : height
  });
  useEffect(() => {
    const rect = document
      .getElementById(id)
      .parentElement.getBoundingClientRect();
    setDimension({
      width: width === undefined ? rect.width : width,
      height: height === undefined ? rect.height : height
    });
  }, [id, width, height]);

  return (
    <ContentLoader
      id={id}
      primaryOpacity={0.01}
      secondaryOpacity={0.1}
      width={dimension.width}
      height={dimension.height}
      viewBox={`0 0 ${dimension.width} ${dimension.height}`}
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
  id: shortid.generate(),
  width: undefined,
  height: undefined
};
